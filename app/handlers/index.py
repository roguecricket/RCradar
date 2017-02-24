from tornado.web import RequestHandler
from config import app_config


class IndexHandler(RequestHandler):

    async def get(self):
        userinfo = self.get_secure_cookie('_T_GA')
        if not userinfo:
            self.render('index.html', **app_config)
        else:
            self.render('dashboard.html')


class LogoutHandler(RequestHandler):

    async def get(self):
        self.clear_all_cookies()
        self.finish()
