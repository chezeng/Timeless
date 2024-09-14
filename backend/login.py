from user import current_user
import requests


class login_management:
    def __init__(self, user):
        self.user = user
    
    def signup(self):
        response = requests.post(
            url = "https://dev-uepv8601rzfynqzi.us.auth0.com/dbconnections/signup",
            json={
                "email": self.user.email,
                "password":self.user.password,
                "connection":  "Username-Password-Authentication",
                "username": self.user.username
            }
        )
        print(response.text)

    def login(self, redirectLink):
        response = requests.get(
            url = "https://dev-uepv8601rzfynqzi.us.auth0.com/authorize",
            json={
                "response_type" : "token",
                "client_id" : "O4c53QdJ9k3kjdTM6D8yYkTzKeOe6LNi",
                "redirect_uri" : redirectLink
            }
        )
        print(response)
    

        

