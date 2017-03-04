from handlers.base import HTTPEventHandler
from asyncio import sleep
from engine import Beam
from models.tournament import Tournaments


class PointBeam(Beam):
    """Point Beam gives the event stream for getting
       Tournaments on bigger radious

       !traditional pagination stream
    """

    def __init__(self, lat, lon, radious=500):
        self.lat = lat
        self.lon = lon
        self.radious = radious
        self.offset = 0
        self.limit = 10
        self.more = True
        super(PointBeam, self).__init__()

    async def radiate(self):
        data = await Tournaments.nearby(self.lat,
                                        self.lon,
                                        self.radious,
                                        limit=self.limit,
                                        skip=self.offset)
        print(data)
        return data

    async def on_radiate(self, data):
        if data:
            self.offset += len(data)


class PointHandler(HTTPEventHandler):
    """
      Implements the HTTPEventHandler for handling
      Server-Sent events

      def on_<event_name>():
          describe an event
          as async generator

    """

    def on_fetch(self, lat=0, lon=0, radious=500):
        return PointBeam(lat, lon, radious)
