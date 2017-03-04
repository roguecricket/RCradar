from motorengine.document import MotorEngineDocument
from motorengine.fields import *
from uuid import uuid4


class User(MotorEngineDocument):
    uid = StringField(required=True)
    email = StringField(required=True)
    token = StringField(default=str(uuid4()))
    data = JsonField()
    source = StringField(required=True)

    @classmethod
    async def get_by_id(cls, md):
        entity = await cls.objects.filter(uid=md).find_all()
        if not entity:
            return None
        return entity[0]


class Spammer(MotorEngineDocument):
    user_id = StringField(required=True, unique=True)

    @classmethod
    async def add(cls, id):
        entity = cls(user_id=id)
        res = await entity.save()
        return res
