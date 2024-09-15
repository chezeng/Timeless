from flask import Flask, request
from flask_pymongo import PyMongo

from BLTCY import BLTCY
from Groq import GroqAPI
from login import LoginManagement
from result import Result
from Cohere import Cohere
from OpenAI import DallE3
from Suno import Suno
from flask_cors import CORS, cross_origin
import configparser
import requests


from user import CurrentUser

app = Flask(__name__)
cors = CORS(app)
config = configparser.ConfigParser(interpolation=None)
config.read('config.ini')
app.config["MONGO_URI"] = "mongodb+srv://{}:{}@{}/Timeless?retryWrites=true&w=majority&appName=Timeless".format(
    config['DATABASE']['username'], config['DATABASE']['password'], config['DATABASE']['host'])
mongo = PyMongo(app)


def verify_token(token: str):
    if not token:
        return Result.failure(401, 'Token is missing')
    return Result.success('Token is valid')


@app.route('/')
@cross_origin()
def api_greeting():
    return Result.success('The Timeless API is online!').get_response('API Ping')


@app.route('/generate_image', methods=['POST'])
def generate_image():
    #token_verification = verify_token(request.headers.get('token'))
    #if not token_verification.success:
    #    return token_verification.get_response('Image Generation')
    if 'location' in request.json:
        location = request.json['location']
    else:
        return Result.failure(400, 'Location is missing').get_response('Image Generation')
    if 'time' in request.json:
        time = request.json['time']
    else:
        return Result.failure(400, 'Time is missing').get_response('Image Generation')
    if 'description' in request.json:
        description = request.json['description']
    else:
        description = ''
    if 'token' in request.json:
        username = request.json['token']
    else:
        return Result.failure(400, 'Creator is missing').get_response('Image Generation')
    image_prompt = 'Location: ' + location + ', Time: ' + time
    if description:
        image_prompt += ', Description: ' + description

    print('[Timeless] Try to get the AI cook on image prompt: ', image_prompt)
    elaborated_image_prompt = Cohere().elaborate_image_prompt(image_prompt)
    summarized_image_prompt = GroqAPI().summarize_prompt(image_prompt)
    image_url = DallE3().generate_image(elaborated_image_prompt)

    mongo.db.image.insert_one({
        'user_id': username,
        'location': location,
        'time': time,
        'url': image_url
    })

    result = mongo.db.time_count.find_one({
        'user_id': username,
        'time': time
    })
    if not result:
        mongo.db.time_count.insert_one({
            'user_id': username,
            'time': time,
            'count': 1
        })
    else:
        mongo.db.time_count.update_one({
            'user_id': username,
            'time': time
        }, {'$set': {'count': 1 + result.get('count')}})

    result = mongo.db.location_count.find_one({
        'user_id': username,
        'location': location
    })
    if not result:
        mongo.db.location_count.insert_one({
            'user_id': username,
            'location': location,
            'count': 1
        })
    else:
        mongo.db.location_count.update_one({
            'user_id': username,
            'location': location
        }, {'$set': {'count': 1 + result.get('count')}})

    return Result.success({
        'originalPrompt': image_prompt,
        'elaboratedPrompt': elaborated_image_prompt,
        'summarizedPrompt': summarized_image_prompt,
        'imageUrl': image_url
    }).get_response('Image Generation')


@app.route('/generate_audio', methods=['POST'])
def generate_audio():
    if 'location' in request.json:
        location = request.json['location']
    else:
        return Result.failure(400, 'Location is missing').get_response('Image Generation')
    if 'time' in request.json:
        time = request.json['time']
    else:
        return Result.failure(400, 'Time is missing').get_response('Image Generation')
    if 'description' in request.json:
        description = request.json['description']
    else:
        description = ''
    audio_prompt = 'Location: ' + location + ', Time: ' + time
    if description:
        audio_prompt += ', Description: ' + description

    print('[Timeless] Try to get the AI cook on audio prompt: ', audio_prompt)

    elaborated_audio_prompt = GroqAPI().generate_audio_prompt(audio_prompt)
    audios = Suno().generate_audio(elaborated_audio_prompt)

    mongo.db.audio.insert_one({
        'user_id': request.headers.get('token'),
        'location': location,
        'time': time,
        'url': audios[0].get('audioUrl')
    })

    mongo.db.audio.insert_one({
        'user_id': request.headers.get('token'),
        'location': location,
        'time': time,
        'url': audios[1].get('audioUrl')
    })

    return Result.success(audios).get_response('Audio Generation')


@app.route('/generate_video', methods=['POST'])
def generate_video():
    if 'prompt' in request.json:
        prompt = request.json['prompt']
    else:
        return Result.failure(400, 'Prompt is missing').get_response('Video Generation')
    if 'imageUrl' in request.json:
        image_url = request.json['imageUrl']
    else:
        return Result.failure(400, 'Image URL is missing').get_response('Video Generation')

    print('[Timeless] Try to get the AI cook the image to video')

    video_url = BLTCY().image_to_video(image_url, prompt)

    mongo.db.image.insert_one({
        'user_id': request.headers.get('token'),
        'url': video_url
    })

    return Result.success(video_url).get_response('Video Generation')


@app.route('/signup', methods=['POST'])
def signup():
    if 'username' in request.json and 'email' in request.json and 'password' in request.json:
        result = mongo.db.user.find_one({
            'username' : request.json.get('username')
        })
        if result:
            return Result.failure(404, 'Username already exists').get_response('Login')
        mongo.db.user.insert_one({
            'email': request.json.get('email'),
            'username': request.json.get('username'),
            'picture': 'https://static.vecteezy.com/system/resources/previews/033/882/148/original/transparent-background-person-icon-free-png.png',
            'password': request.json.get('password')
        })
        return Result.success('User signed up successfully').get_response('User Profile')


@app.route('/login', methods=['POST'])
def login():
    if 'username' in request.json and 'password' in request.json:
        result = mongo.db.user.find_one({
            'username': request.json.get('username'),
            'password': request.json.get('password')
        })
        print(result)
        if not result:
            return Result.failure(404, 'Username and password does not match').get_response('Login')
        return Result.success({
            'userId': str(result.get('_id')),
            'username': result.get('username'),
            'email': result.get('email'),
        }).get_response('Login')


@app.route('/community_feed', methods=['GET'])
def fetch_community_feed():
    user_id = request.headers['token']
    result = mongo.db.time_count.find({
        'user_id': user_id
    }, sort=[('count', 1)])
    if not result:
        top_time = []
    else:
        top_time = [item.get('time') for item in list(result)[:3]]

    result = mongo.db.location_count.find({
        'user_id': user_id
    }, sort=[('count', 1)])
    if not result:
        top_location = []
    else:
        top_location = [item.get('location') for item in list(result)[:3]]

    feed = []

    for time in top_time:
        top_time_result = mongo.db.image.find({
            'time': time
        })
        for item in top_time_result:
            if item.get('url') not in feed:
                feed.append(item.get('url'))

    for location in top_location:
        top_location_result = mongo.db.image.find({
            'location': location
        })
        for item in top_location_result:
            if item.get('url') not in feed:
                feed.append(item.get('url'))

    return Result.success(feed).get_response('Fetch Community Feed')


@app.route('/profile', methods=['GET'])
def get_user_profile():
    token = request.headers['token']
    response = requests.post(
        url="https://dev-uepv8601rzfynqzi.us.auth0.com/userinfo",
        params={
            "access_token": token
        }
    )
    if response.status_code == 200:
        return Result.success(response.json()).get_response('User Profile')
    return Result.failure(response.status_code, response.text).get_response('User Profile')

@app.route('/portfolio_images', methods=['GET'])
def get_user_portfolio():
    token = request.headers['token']
    images = []
    result = mongo.db.image.find({
        'user_id': token
    })
    for item in result:
        images.append(item.get('url'))
    return images

@app.route('/title', method = ['GET'])
def get_picture_title():
    url = request.headers['token']
    result = mongo.db.image.find({
        'url': url
    })
    title = result.get('time') + " " + result.get('location')
    return title


@app.route('/user_email', methods=['GET'])
def get_user_email():
    token = request.headers['token']
    result = mongo.db.users.find_one({
        'user_id' : token
    })
    return result.get('email')

@app.route('/user_password', methods=['GET'])
def get_user_password():
    token = request.headers['token']
    result = mongo.db.users.find_one({
        'user_id' : token
    })
    return result.get('password')



