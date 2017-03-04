from handlers.base import HTTPEventHandler
from asyncio import sleep
from models.tournament import Tournaments


class PointEventStream(object):

    def __init__(self, lat, lon, radious=500):
        self.lat = lat
        self.lon = lon
        self.radious = radious
        self.offset = 0
        self.limit = 10
        self.more = True

    async def __aiter__(self):
        return self

    async def __anext__(self):
        while self.more:
            data = await Tournaments.nearby(self.lat,
                                            self.lon,
                                            self.radious,
                                            limit=self.limit,
                                            skip=self.offset)
            if not data:
                self.more = False
                raise StopAsyncIteration
            else:
                self.offset += len(data)
            return data


class PointHandler(HTTPEventHandler):
    """
      Implements the HTTPEventHandler for handling
      Server-Sent events

      def on_<event_name>():
          describe an event
          as async generator

    """

    def on_fetch(self, lat=0, lon=0, radious=10):
        return PointEventStream(lat, lon, radious)
