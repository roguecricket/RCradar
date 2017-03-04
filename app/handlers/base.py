from tornado.web import RequestHandler
from json import dumps, loads
from engine import safty_handler, ModelDictJSONEnocder


class HTTPRequestHandler(RequestHandler):

    def render_json(self, data):
        self.write(dumps(data, cls=ModelDictJSONEnocder))


class HTTPEventHandler(HTTPRequestHandler):
    """A wrapper for SSE"""

    def initialize(self):
        self.set_header('Content-Type', 'text/event-stream')
        self.set_header('Cache-Control', 'no-cache')
        self.set_header('Connection', 'keep-alive')

    def radiate(self, id, data, event=None):
        response = u''
        encoded_data = dumps(data, cls=ModelDictJSONEnocder)
        if event != None:
            response += u'id: ' + str(id).strip() + u'\n'
        response += u'data: ' + encoded_data.strip() + u'\n\n'
        print(response)
        self.write(response)
        self.flush()

    @safty_handler
    async def get(self):
        event_name = self.get_argument("event", None)
        lat = self.get_argument('lat', 0)
        lon = self.get_argument('lon', 0)
        radious = self.get_argument('radiou', 10)
        lat, lon, radious = float(lat), float(lon), int(radious)
        if not event_name:
            raise Exception("No Event specified")
        func_obj = getattr(self, "on_" + event_name)
        i = 0
        async for data in func_obj(lat=lat, lon=lon, radious=radious):
            self.radiate(i, data, event=event_name)
            i += 1
        self.finish()
