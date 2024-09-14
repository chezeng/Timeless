from API import API
from openai import OpenAI


class DallE3(API):
    def __init__(self):
        super().__init__()
        self.client = OpenAI(api_key=self.OPENAI_API_KEY)

    def generate_image(self, image_prompt: str) -> str:
        fixed_prompt = 'high quality and realistic image based on the following description:'
        print('[DallE3] I am cooking the images...')
        response = self.client.images.generate(
            model="dall-e-3",
            prompt=fixed_prompt + image_prompt,
            size="1024x1024",
            quality="standard",
            n=1,
        )
        print('[DallE3] Yo I am done cooking')
        image_url = response.data[0].url
        return image_url
