from tornado.httpclient import AsyncHTTPClient, HTTPRequest
from tornado.httputil import url_concat
from tornado.gen import Task

async def fetch(url, method='GET',
                params={}, headers={}, payload=None):
    if params:
        url = url_concat(url, params)
    _request = HTTPRequest(url, method=method, headers=headers, body=payload)
    client = AsyncHTTPClient()
    response = await client.fetch(_request)
    return response


class AuthUser(object):

    def __init__(self, domain, access_token):
        self.token = access_token
        self._base = "https://{domain}/".format(domain=domain)

    async def info(self):
        url = self._base + "userinfo"
        response = await fetch(url, method='GET',
                               headers={
                                   'Authorization': 'Bearer {}'.format(self.token)
                               })
        return response.body.decode('utf-8')
