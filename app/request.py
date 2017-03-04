from tornado.httpclient import AsyncHTTPClient, HTTPRequest
from tornado.httputil import url_concat
from tornado.gen import Task
from json import loads, dumps
from models.user import User

async def fetch(url, method='GET',
                params={}, headers={}, payload=None):
    if params:
        url = url_concat(url, params)
    _request = HTTPRequest(url, method=method, headers=headers, body=payload)
    client = AsyncHTTPClient()
    response = await client.fetch(_request)
    return response


class AuthUser(object):

    def __init__(self, domain, access_token, body):
        self.token = access_token
        self._base = "https://{domain}/".format(domain=domain)
        self._body = body

    async def info(self):
        url = self._base + "userinfo"
        response = await fetch(url, method='GET',
                               headers={
                                   'Authorization': 'Bearer {}'.format(self.token)
                               })
        return response.body.decode('utf-8')

    async def get_or_create(self):
        info = await self.info()
        info = loads(info)
        auth_type, user_id = info.get('user_id', "").split("|")
        user = await User.get_by_id(user_id)
        if not user:
            user = User(uid=user_id,
                        email=info.get("email"),
                        data=info,
                        source=auth_type)
            user = await user.save()
        return user
