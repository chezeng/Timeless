import time

from API import API
import requests


class BLTCY(API):
    def __init__(self):
        super().__init__()
        self.url = 'https://api.bltcy.ai'
        self.headers = {
            'Authorization': 'Bearer ' + self.BLTCY_API_KEY
        }

    def image_to_video(self, image_url: str, prompt: str):
        print('[柏拉图次元] I am cooking up the video...')
        response = requests.post(url=self.url + '/luma/generations', headers=self.headers, json={
            'user_prompt': prompt,
            'image_url': image_url
        })
        task_id = response.json().get('id')
        print('[柏拉图次元] The cook is on the way to the kitchen! Task ID:', task_id)
        return self.get_video(task_id)

    def get_task(self, task_id: str):
        response = requests.get(url=self.url + '/luma/generations/' + task_id, headers=self.headers)
        return response.json()

    def get_video(self, task_id: str):
        response = requests.get(url=self.url + '/luma/generations/' + task_id + '/download_video_url',
                                headers=self.headers)
        while response.status_code != 200:
            print('[柏拉图次元] The cooking is still underway! Please be patient...')
            time.sleep(5)
            response = requests.get(url=self.url + '/luma/generations/' + task_id + '/download_video_url',
                                    headers=self.headers)
        print('[柏拉图次元] The cooking is done! Enjoy the video!')
        return response.json().get('url')
