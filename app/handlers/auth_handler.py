from tornado.web import RequestHandler
from request import fetch, AuthUser
from config import app_config
from json import dumps, loads


class CallbackHandler(RequestHandler):

    async def get(self):
        code = self.get_argument('code')
        token_payload = {
            'client_id': app_config.get('AUTH_ID'),
            'client_secret': app_config.get('CLIENT_SECRET'),
            'code': code,
            'grant_type': 'authorization_code',
            'redirect_uri': 'http://localhost:8080/callback'
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
            user = AuthUser(app_config.get('DOMIAN'), access_token)
            user_info = await user.info()
            self.set_secure_cookie('_T_GA', user_info)
            self.redirect('/')
        else:
            self.redirect('/')
