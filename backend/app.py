from flask import Flask, request
from flask_pymongo import PyMongo
from Groq import GroqAPI
from login import LoginManagement
from result import Result
from Cohere import Cohere
from OpenAI import DallE3
from Suno import Suno
import configparser

from user import CurrentUser

app = Flask(__name__)
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
def api_greeting():
    return Result.success('The Timeless API is online!').get_response('API Ping')


@app.route('/generate_image', methods=['POST'])
def generate_image():
    token_verification = verify_token(request.headers.get('token'))
    if not token_verification.success:
        return token_verification.get_response('Image Generation')
    if 'prompt' in request.json:
        image_prompt = request.json['prompt']
    else:
        return Result.failure(400, 'Image Prompt is missing').get_response('Image Generation')
    elaborated_image_prompt = Cohere().elaborate_image_prompt(image_prompt)
    summarized_image_prompt = GroqAPI().summarize_prompt(image_prompt)
    image_url = DallE3().generate_image(elaborated_image_prompt)
    return Result.success({
        'originalPrompt': image_prompt,
        'elaboratedPrompt': elaborated_image_prompt,
        'summarizedPrompt': summarized_image_prompt,
        'imageUrl': image_url
    }).get_response('Image Generation')


@app.route('/generate_audio', methods=['POST'])
def generate_audio():
    if 'prompt' in request.json:
        prompt = request.json['prompt']
    else:
        return Result.failure(400, 'Prompt is missing').get_response('Audio Generation')
    audio_prompt = GroqAPI().generate_audio_prompt(prompt)
    audio = Suno().generate_audio(audio_prompt)
    return Result.success(audio).get_response('Audio Generation')


@app.route('/signup', methods=['POST'])
def signup():
    if 'username' in request.json and 'email' in request.json and 'password' in request.json:
        current_user = CurrentUser(request.json['email'], request.json['password'], request.json['username'])
        login_management = LoginManagement(current_user)
        result = login_management.signup()
        if result.success:
            mongo.db.user.insert_one({
                'email': current_user.email,
                'username': current_user.username,
            })
        return result.get_response('Signup')
