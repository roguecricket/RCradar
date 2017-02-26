from motorengine.document import MotorEngineDocument
from motorengine.fields import *
from pymongo import GEOSPHERE, GEO2D


class Tournaments(MotorEngineDocument):

    __indexes__ = [('location', GEO2D)]

    name = StringField(required=True)
    tid = StringField(required=True)
    event_on = DateTimeField(required=True)
    location = GeoPointField(required=True)
    contact_no = StringField(required=True)
    closes_on = DateTimeField(required=True)
    event_duration = IntField(required=True, default=1)
    created_by = StringField(required=True)
    address = StringField(required=True)
    reported_spams = IntField(default=0)

    @classmethod
    async def new(cls, **kwargs):
        entity = cls(**kwargs)
        res = await entity.save()
        return res

    async def as_spam(self):
        self.reported_spams += 1
        res = await self.save()
        return res

    @classmethod
    async def nearby(cls, lat, lon, radious, limit=10, skip=0):
        results = await cls.objects.limit(limit).skip(skip)\
            .filter(location__around=[(lat, lon), radious])\
            .find_all()
        return results

    @classmethod
    async def get_by_id(cls, id):
        results = await cls.objects.filter(tid=id).find_all()
        return results[0] if results else None
