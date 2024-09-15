from flask import Flask, request
from flask_pymongo import PyMongo, ObjectId

from BLTCY import BLTCY
from Groq import GroqAPI
from result import Result
from Cohere import Cohere
from OpenAI import DallE3
from Suno import Suno
from flask_cors import CORS, cross_origin
import configparser


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
    username = request.headers['token']
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
    token_verification = verify_token(request.headers.get('token'))
    if not token_verification.success:
        return token_verification.get_response('Audio Generation')
    if 'location' in request.json:
        location = request.json['location']
    else:
        return Result.failure(400, 'Location is missing').get_response('Audio Generation')
    if 'time' in request.json:
        time = request.json['time']
    else:
        return Result.failure(400, 'Time is missing').get_response('Audio Generation')
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
    token_verification = verify_token(request.headers.get('token'))
    if not token_verification.success:
        return token_verification.get_response('Video Generation')
    if 'prompt' in request.json:
        prompt = request.json['prompt']
    else:
        return Result.failure(400, 'Prompt is missing').get_response('Video Generation')
    if 'title' in request.json:
        title = request.json['title']
    else:
        return Result.failure(400, 'Title is missing').get_response('Video Generation')
    if 'imageUrl' in request.json:
        image_url = request.json['imageUrl']
    else:
        return Result.failure(400, 'Image URL is missing').get_response('Video Generation')
    if 'musicUrl' in request.json:
        music_url = request.json['musicUrl']
    else:
        music_url = ""

    print('[Timeless] Try to get the AI cook the image to video')

    video_url = BLTCY().image_to_video(image_url, prompt)

    mongo.db.video.insert_one({
        'user_id': request.headers.get('token'),
        'url': video_url,
        'image_url': image_url,
        'music_url': music_url,
        'prompt': prompt,
        'title': title,
        'liked': 0
    })

    return Result.success(video_url).get_response('Video Generation')


@app.route('/signup', methods=['POST'])
def signup():
    if 'username' in request.json and 'email' in request.json and 'password' in request.json:
        result = mongo.db.user.find_one({
            'username': request.json.get('username')
        })
        if result:
            return Result.failure(404, 'Username already exists').get_response('Login')
        mongo.db.user.insert_one({
            'email': request.json.get('email'),
            'username': request.json.get('username'),
            'picture': 'https://static.vecteezy.com/system/resources/previews/033/882/148/original/transparent'
                       '-background-person-icon-free-png.png',
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
    token_verification = verify_token(request.headers.get('token'))
    if not token_verification.success:
        return token_verification.get_response('Fetch Community Feed')
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


@app.route('/portfolio_images', methods=['GET'])
def get_user_portfolio():
    token_verification = verify_token(request.headers.get('token'))
    if not token_verification.success:
        return token_verification.get_response('Get Portfolio Images')
    token = request.headers['token']
    videos = []
    result = mongo.db.video.find({
        'user_id': token
    })
    for item in result:
        videos.append({
            'url': item.get('url'),
            'imageUrl': item.get('image_url'),
            'musicUrl': item.get('music_url'),
            'prompt': item.get('prompt'),
            'title': item.get('title'),
            'id': str(item.get('_id')),
            'liked': item.get('liked')
        })
    return Result.success({"videos": videos}).get_response('Get Portfolio Images')


@app.route('/user_profile', methods=['GET'])
def get_user_profile():
    token_verification = verify_token(request.headers.get('token'))
    if not token_verification.success:
        return token_verification.get_response('Get User Profile')
    token = request.headers['token']
    result = mongo.db.user.find_one({
        'username': token
    })
    if not result:
        return Result.failure(404, 'User not found').get_response('Get User Profile')
    profile = {
        'username': result.get('username'),
        'email': result.get('email'),
        'picture': result.get('picture'),
        'password': result.get('password')
    }
    return Result.success(profile).get_response('Get User Profile')


@app.route('/user_password', methods=['GET'])
def get_user_password():
    token_verification = verify_token(request.headers.get('token'))
    if not token_verification.success:
        return token_verification.get_response('Get User Password')
    token = request.headers['token']
    result = mongo.db.users.find_one({
        'username': token
    })
    return Result.success({"password": result.get('password')}).get_response('Get User Password')


@app.route('/change_password', methods=['POST'])
def change_password():
    token_verification = verify_token(request.headers.get('token'))
    if not token_verification.success:
        return token_verification.get_response('Change The Password')
    token = request.headers['token']
    if 'password' in request.json:
        new_password = request.json['password']
        mongo.db.user.update_one({
            'username': token
        }, {'$set': {'password': new_password}})
    else:
        return Result.failure(400, 'Password is missing').get_response('Change The Password')
    return Result.success().get_response('Change The Password')


@app.route('/change_email', methods=['POST'])
def change_email():
    token_verification = verify_token(request.headers.get('token'))
    if not token_verification.success:
        return token_verification.get_response('Change The Email')
    token = request.headers['token']
    if 'email' in request.json:
        new_email = request.json['email']
        mongo.db.user.update_one({
            'username': token
        }, {'$set': {'email': new_email}})
    else:
        return Result.failure(400, 'Email is missing').get_response('Change The Email')
    return Result.success().get_response('Change The Email')


@app.route('/delete_picture', methods=['POST'])
def delete_picture():
    token_verification = verify_token(request.headers.get('token'))
    if not token_verification.success:
        return token_verification.get_response('Delete Picture')
    token = request.headers['token']
    if 'video' in request.json:
        video_url = request.json['video']
        response = mongo.db.video.find_one({
            'user_id': token,
            'url': video_url
        })
        if not response:
            return Result.failure(404, 'Video not found').get_response('Delete Picture')
        image_url = response.get('image_url')
        music_url = response.get('music_url')
        mongo.db.video.delete_one({
            'user_id': token,
            'url': video_url
        })
        mongo.db.image.delete_one({
            'url': image_url
        })
    return Result.success().get_response('Removed The Picture From Portfolio')


@app.route('/like_video', methods=['POST'])
def like_video():
    token_verification = verify_token(request.headers.get('token'))
    if not token_verification.success:
        return token_verification.get_response('Like The Video')
    if 'videoId' in request.json:
        video_id = request.json['videoId']
    else:
        return Result.failure(400, 'Video ID is missing').get_response('Like The Video')
    result = mongo.db.video.find_one({
        '_id': ObjectId(video_id)
    })
    if result:
        mongo.db.video.update_one({
            '_id': ObjectId(video_id)
        }, {'$set': {'liked': 1 - result.get('liked')}})
    return Result.success().get_response('Like The Video')
