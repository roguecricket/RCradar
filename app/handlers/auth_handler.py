from tornado.web import RequestHandler
from request import fetch, AuthUser
from config import app_config
from json import dumps, loads
from jwt import encode, decode
import typing


class CallbackHandler(RequestHandler):

    async def get(self):
        code = self.get_argument('code')
        token_payload = {
            'client_id': app_config.get('AUTH_ID'),
            'client_secret': app_config.get('CLIENT_SECRET'),
            'code': code,
            'grant_type': 'authorization_code',
            'redirect_uri': 'http://localhost/callback'
        }
        _url = "https://{domain}/oauth/token".format(domain=app_config.get("DOMIAN"))
        print(dumps(token_payload))
        response = await fetch(_url,
                               method='POST',
                               headers={'content-type': 'application/json'},
                               payload=dumps(token_payload))
        if response.code == 200:
            body = loads(response.body.decode('utf-8'))
            access_token = body['access_token']
            user = AuthUser(app_config.get('DOMIAN'), access_token, body)
            user_info = await user.get_or_create()
            tok = encode(dict(id=user_info.uid,
                              token=user_info.token),
                         self.settings["jwt_secret"],
                         algorithm='HS256')
            print(tok)
            self.set_secure_cookie('_T_GA', tok)
            self.redirect('/')
        else:
            self.redirect('/')
