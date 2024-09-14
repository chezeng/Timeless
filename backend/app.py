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
    token_verification = verify_token(request.headers.get('token'))
    if not token_verification.success:
        return token_verification.get_response('Image Generation')
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
    image_prompt = 'Location: ' + location + ', Time: ' + time
    if description:
        image_prompt += ', Description: ' + description

    print('[Timeless] Try to get the AI cook on image prompt: ', image_prompt)
    elaborated_image_prompt = Cohere().elaborate_image_prompt(image_prompt)
    summarized_image_prompt = GroqAPI().summarize_prompt(image_prompt)
    image_url = DallE3().generate_image(elaborated_image_prompt)

    mongo.db.image.insert_one({
        'user_id': request.headers.get('token'),
        'location': location,
        'time': time,
        'url': image_url
    })

    result = mongo.db.time_count.find_one({
        'user_id': request.headers.get('token'),
        'time': time
    })
    if not result:
        mongo.db.time_count.insert_one({
            'user_id': request.headers.get('token'),
            'time': time,
            'count': 1
        })
    else:
        mongo.db.time_count.update_one({
            'user_id': request.headers.get('token'),
            'time': time
        }, {'$set': {'count': 1 + result.get('count')}})

    result = mongo.db.location_count.find_one({
        'user_id': request.headers.get('token'),
        'location': location
    })
    if not result:
        mongo.db.location_count.insert_one({
            'user_id': request.headers.get('token'),
            'location': location,
            'count': 1
        })
    else:
        mongo.db.location_count.update_one({
            'user_id': request.headers.get('token'),
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
        current_user = CurrentUser(request.json['email'], request.json['password'], request.json['username'])
        login_management = LoginManagement()
        result = login_management.signup()
        if result.success:
            mongo.db.user.insert_one({
                'email': current_user.email,
                'username': current_user.username,
                'picture' : current_user.profile_picture
            })
        return result.get_response('Signup')


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

@app.route('/userprofile', methods=['GET'])
def searchProfile():
    token = request.headers['token']
    response = requests.post(
        url="https://dev-uepv8601rzfynqzi.us.auth0.com/userinfo",
        params={
            "access_token": token
        }
    )
    print(response)