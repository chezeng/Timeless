from result import Result
from user import CurrentUser
import requests


class LoginManagement:
    def __init__(self, user: CurrentUser):
        self.user = user

    def signup(self) -> Result:
        response = requests.post(
            url="https://dev-uepv8601rzfynqzi.us.auth0.com/dbconnections/signup",
            json={
                "email": self.user.email,
                "password": self.user.password,
                "connection": "Username-Password-Authentication",
                "username": self.user.username
            }
        )
        if response.status_code == 200:
            return Result.success('User signed up successfully')
        return Result.failure(400, response.text)

    def login(self, redirectLink):
        response = requests.get(
            url="https://dev-uepv8601rzfynqzi.us.auth0.com/authorize",
            params={
                "response_type": "token",
                "client_id": "O4c53QdJ9k3kjdTM6D8yYkTzKeOe6LNi",
                "redirect_uri": redirectLink
            }
        )
        print(response)

    def logout(self, returnToLink):
        response = requests.get(
            url="https://dev-uepv8601rzfynqzi.us.auth0.com/v2/logout",
            params={
                "returnTo": returnToLink
            }
        )
        print(response)
