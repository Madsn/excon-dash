from channels.generic.websockets import WebsocketDemultiplexer, JsonWebsocketConsumer

from .serializers import StateChangeSerializer
from .models import StateChange
from . import binding


class GetStateConsumer(JsonWebsocketConsumer):
    def connect(self, message, multiplexer, **kwargs):
        state = StateChange.objects.all().order_by("-id").first()
        serializer = StateChangeSerializer(state)
        multiplexer.send({"data": serializer.data})


class AdminChangesConsumer(JsonWebsocketConsumer):
    def receive(self, content, **kwargs):
        """
        Called with decoded JSON content.
        """
        print("received: {0}".format(content))
        pass

    def send(self, content, close=False):
        """
        Encode the given content as JSON and send it to the client.
        """
        super(JsonWebsocketConsumer, self).send(text=self.encode_json(content), close=close)


class Demultiplexer(WebsocketDemultiplexer):
    consumers = {
        "get-initial": GetStateConsumer,
        "state-change": binding.StateChangeBinding.consumer,
        "admin-changes": AdminChangesConsumer
    }

    def connection_groups(self):
        return ["state-change-updates", "admin-changes"]
