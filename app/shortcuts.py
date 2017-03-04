from json import JSONEncoder
from datetime import datetime
from motorengine.document import MotorEngineDocument
from traceback import format_exc
from tornado.log import logging
from bson import ObjectId


def requires_login(f):
    def inner(self, *args, **kwargs):
        user_info = self.get_secure_cookie('_T_GA')
        if not user_info:
            return f(self, *args, **kwargs)
        else:
            self.set_status(401)
            self.render_json({"error": "unauthorized"})
    return inner


def safty_handler(f):
    async def inner(self, *args, **kwargs):
        try:
            data = await f(self, *args, **kwargs)
        except Exception as e:
            self.set_status(500)
            self.render_json({"error": "Invalid Request"})
            logging.info(format_exc())
    return inner


class ModelDictJSONEnocder(JSONEncoder):

    def default(self, obj):
        if isinstance(obj, MotorEngineDocument):
            return obj.to_son()
        elif isinstance(obj, datetime):
            return obj.timestamp()
        elif isinstance(obj, ObjectId):
            return str(obj)
        return JSONEncoder.default(self, obj)
