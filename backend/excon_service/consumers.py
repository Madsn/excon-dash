from channels.generic.websockets import WebsocketDemultiplexer, JsonWebsocketConsumer

from .serializers import StateSerializer
from .models import State
from . import binding


class GetStateConsumer(JsonWebsocketConsumer):
    def connect(self, message, multiplexer, **kwargs):
        state = State.objects.get(pk=1)
        serializer = StateSerializer(state)
        multiplexer.send({"data": serializer.data})


class Demultiplexer(WebsocketDemultiplexer):
    consumers = {
        "state": binding.StateBinding.consumer,
        "getState": GetStateConsumer,
        "state-change": binding.StateChangeBinding.consumer
    }

    def connection_groups(self):
        return ["state-updates", "state-change-updates"]
