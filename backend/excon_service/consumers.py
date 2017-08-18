from channels.generic.websockets import WebsocketDemultiplexer, JsonWebsocketConsumer

from .serializers import StateChangeSerializer
from .models import StateChange
from . import binding


class GetStateConsumer(JsonWebsocketConsumer):
    def connect(self, message, multiplexer, **kwargs):
        state = StateChange.objects.all().order_by("-id").first()
        serializer = StateChangeSerializer(state)
        multiplexer.send({"data": serializer.data})


class Demultiplexer(WebsocketDemultiplexer):
    consumers = {
        "get-initial": GetStateConsumer,
        "state-change": binding.StateChangeBinding.consumer
    }

    def connection_groups(self):
        return ["state-change-updates"]
