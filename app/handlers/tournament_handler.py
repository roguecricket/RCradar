from handlers.base import HTTPRequestHandler
from json import dumps, loads
from engine import safty_handler, ModelDictJSONEnocder
from models.tournament import Tournaments
from models.user import User
from datetime import datetime
from uuid import uuid4
from jwt import decode, encode


class TournamentHandler(HTTPRequestHandler):

    async def prepare(self):
        ss_cookie = self.get_secure_cookie('_T_GA')
        ss_header = self.request.headers.get('Authorization')
        ss_secret = self.settings['jwt_secret']
        print(ss_header or ss_cookie)
        auth_dict = decode(ss_header or ss_cookie,
                           ss_secret,
                           algorithm='HS256')
        if not auth_dict:
            self.user = None
        else:
            self.user = await User.get_by_id(auth_dict['id'])
        print(self.user)
        return

    @safty_handler
    async def get(self):
        lat = self.get_argument('lat', 0)
        lon = self.get_argument('lon', 0)
        radious = self.get_argument('radious', 50)
        limit = self.get_argument('limit', 10)
        page = self.get_argument('page', 0)

        lat, lon, radious = float(lat), float(lon), int(radious)
        limit, skip = int(limit), int(page) * int(limit)
        results = await Tournaments.nearby(lat, lon, radious, limit=limit,
                                           skip=skip)
        self.set_header("Content-Type", "application/json")
        self.render_json(results)

    @safty_handler
    async def post(self):
        json = self.request.body.decode('utf-8')
        body = loads(json)
        name = body.get('title')
        lat = body.get('lat')
        lon = body.get('lon')
        contact_no = body.get('contact_no')
        closes_on = body.get('closes_on', 0)
        event_duration = body.get('duration')
        event_start_on = body.get('starts_on', 0)
        address = body.get('address')
        closes_on = datetime.fromtimestamp(int(closes_on) / 1000)
        event_start_on = datetime.fromtimestamp(int(event_start_on) / 1000)
        t = Tournaments(tid=str(uuid4()),
                        name=name,
                        contact_no=contact_no,
                        event_on=event_start_on,
                        closes_on=closes_on,
                        event_duration=event_duration,
                        address=address,
                        created_by=self.user,
                        location=[lat, lon])
        res = await t.save()
        self.set_header("Content-Type", "application/json")
        self.render_json(res)

    @safty_handler
    async def put(self, tid):
        json = self.request.body.decode('utf-8')
        body = loads(json)
        print(body)
        tournament = await Tournaments.get_by_id(tid)
        if tournament:
            for key, value in body.items():
                setattr(tournament, key, value)
            res = await tournament.save()
            self.render_json(res)
        else:
            self.set_status(404)
            self.render_json(dict(error="Not found"))
