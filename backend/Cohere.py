from API import API
import requests


class Cohere(API):
    def __init__(self):
        super().__init__()
        self.url = 'https://api.cohere.com/v1/chat'
        self.headers = {
            'accept': 'application/json',
            'content-type': 'application/json',
            'Authorization': 'bearer {}'.format(self.COHERE_API_KEY)
        }

    def elaborate_image_prompt(self, image_prompt: str) -> str:
        print('[Cohere] I am cooking the image prompt...')
        fixed_prompt = ('Act as a professional artist and writer, creating detailed AI-prompt descriptions in various '
                        'art styles. Use full imagination to expand the following description into vivid, '
                        'immersive and realistic scenes. Example: change the description “1980s New York Street Dusk” '
                        'to "Realistic New York City street at dusk in 1985, transitioning to evening. Vintage '
                        'vehicles, iconic yellow cabs, light up the avenue. Pedestrians in retro fashion stroll by. '
                        'The Brooklyn Bridge glows in the fading light, capturing the city\'s energy and movement. Do '
                        'not use any non ascii or non English characters in the response. Description:')
        response = requests.post(url=self.url, headers=self.headers, json={
            'message': fixed_prompt + image_prompt
        })
        print('[Cohere] Yo I am done cooking')
        return response.json().get('text')
