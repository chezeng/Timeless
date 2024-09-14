from API import API
import requests


class Suno(API):
    def __init__(self):
        super().__init__()
        self.url = 'https://timeless-suno-api.vercel.app'

    def generate_audio(self, prompt: str):
        response = requests.post(url=self.url + '/api/generate/', json={
            'prompt': prompt,
            'make_instrumental': False,
            'wait_audio': True
        })
        return response.json()
