from motorengine.document import MotorEngineDocument
from motorengine.fields import *


class Spammer(MotorEngineDocument):
    user_id = StringField(required=True, unique=True)

    @classmethod
    async def add(cls, id):
        entity = cls(user_id=id)
        res = await entity.save()
        return res
