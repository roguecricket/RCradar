from json import JSONEncoder
from datetime import datetime
from motorengine.document import MotorEngineDocument


def requires_login(f):
    def inner(self, *args, **kwargs):
        user_info = self.get_secure_cookie('_T_GA')
        if not user_info:
            return f(self, *args, **kwargs)
        else:
            self.set_status(401)
            self.render_json({"error": "unauthorized"})
    return inner


class ModelDictJSONEnocder(JSONEncoder):

    def default(self, obj):
        if isinstance(obj, MotorEngineDocument):
            return obj.to_son()
        elif isinstance(obj, datetime):
            return obj.timestamp()
        return JSONEncoder.default(self, obj)
