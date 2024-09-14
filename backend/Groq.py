from groq import Groq

from API import API


class GroqAPI(API):
    def __init__(self):
        super().__init__()
        self.client = Groq(api_key=self.GROQ_API_KEY)

    def summarize_prompt(self, prompt_to_summarize: str) -> str:
        fixed_prompt = ('You will be given a prompt that describe a image, summarize the prompt in one sentence, '
                        'keep the artistic and creative elements of the prompt. Your feedback should be nothing more '
                        'than the sentence itself. Prompt:')
        print('[Groq] I am cooking up a summary for the prompt')
        chat_completion = self.client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": fixed_prompt + prompt_to_summarize,
                }
            ],
            model="llama3-8b-8192",
        )
        print('[Groq] I am done cooking!')
        return chat_completion.choices[0].message.content

    def generate_audio_prompt(self, prompt: str) -> str:
        fixed_prompt = ('You are a musician, you will be given a time, a location and a description. Please describe '
                        'the best suitable music for the scene. The description must be in 20 words. The description '
                        'must not contain any artist name. The Scene:')
        print('[Groq] I am cooking a prompt for the audio...')
        chat_completion = self.client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": fixed_prompt + prompt,
                }
            ],
            model="llama3-8b-8192",
        )
        print('[Groq] I am done cooking!')
        return chat_completion.choices[0].message.content
