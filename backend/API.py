import configparser

config = configparser.ConfigParser(interpolation=None)
config.read('config.ini')


class API(object):
    def __init__(self):
        self.OPENAI_API_KEY = config['keys']['OPENAI_API_KEY']
        self.COHERE_API_KEY = config['keys']['COHERE_API_KEY']
        self.GROQ_API_KEY = config['keys']['GROQ_API_KEY']
        self.SUNO_COOKIE = config['keys']['SUNO_COOKIE']