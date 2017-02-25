import os
import tornado
import tornado.web
from tornado import ioloop
from tornado import httpserver
from tornado.options import define
from tornado.options import options
from motorengine import connect
from config import app_config
from uuid import uuid4
from tornado.web import StaticFileHandler
from handlers import CallbackHandler, IndexHandler, \
    LogoutHandler, TournamentHandler, GzippedContentHandler


define("port", default=8080, help="run on given port", type=int)
# Initializing the environmental variables.
mongo_host = os.environ.get("MONOGO_HOST", "mongodb://localhost:27017/") + "toradar"


if __name__ == "__main__":
    tornado.options.parse_command_line()
    connect('toradar', host=mongo_host)
    app = tornado.web.Application(
        handlers=[(r'/', IndexHandler),
                  (r'/callback', CallbackHandler),
                  (r'/logout', LogoutHandler),
                  (r'/tournament', TournamentHandler),
                  (r'/tournament/(?P<tid>.*?)/?$', TournamentHandler),
                  (r'/static/(.*)', GzippedContentHandler,
                   {"path": os.path.join(os.path.dirname(__file__), "../build")}),
                  (r'/assets/(.*)', StaticFileHandler,
                   {"path": os.path.join(os.path.dirname(__file__), "../assets")})],
        template_path=os.path.join(os.path.dirname(__file__),
                                   "../templates"),
        gzip=True,
        debug=True,
        cookie_secret=str(uuid4()))
    http_server = httpserver.HTTPServer(app)
    http_server.listen(options.port)
    ioloop.IOLoop.instance().start()
