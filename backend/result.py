from typing import Generic, TypeVar


T = TypeVar('T')


class Result(Generic[T]):
    def __init__(self, success: bool, code: int, reason: str, data: T):
        self.success = success
        self.code = code
        self.reason = reason
        self.data = data

    @classmethod
    def success(cls, data: T = None):
        return cls(True, 200, 'OK', data)

    @classmethod
    def failure(cls, code: int, reason: str):
        return cls(False, code, reason, None)

    def get_response(self, request_name: str) -> tuple[dict, int]:
        if self.success:
            if self.data is None:
                return {
                    'ok': True,
                    'message': '{} Succeeded'.format(request_name),
                }, 200
            return {
                'ok': True,
                'message': '{} Succeeded'.format(request_name),
                'data': self.data,
            }, 200
        return {'ok': False, 'message': '{} Failed - {}'.format(request_name, self.reason)}, self.code
