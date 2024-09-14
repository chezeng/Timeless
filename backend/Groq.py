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
        chat_completion = self.client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": fixed_prompt + prompt_to_summarize,
                }
            ],
            model="llama3-8b-8192",
        )
        return chat_completion.choices[0].message.content
