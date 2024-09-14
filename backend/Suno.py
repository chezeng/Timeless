from API import API
import requests


class Suno(API):
    def __init__(self):
        super().__init__()
        self.url = 'https://timeless-suno-api.vercel.app'

    def generate_audio(self, prompt: str):
        print('[Suno] I am cooking the audios...')
        response = requests.post(url=self.url + '/api/generate/', json={
            'prompt': prompt,
            'make_instrumental': False,
            'wait_audio': True
        })
        print('[Suno] I am done cooking!')
        return response.json()
