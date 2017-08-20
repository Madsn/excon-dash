from channels.generic.websockets import WebsocketDemultiplexer, JsonWebsocketConsumer, WebsocketConsumer

from .serializers import StateChangeSerializer
from .models import StateChange
from . import binding
import random


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
        action = content["action"]
        previous_state = StateChange.objects.all().order_by("-id").first()
        if action == "decrementEventNumber":
            new_event_number = previous_state.event_number - 1
        elif action == "incrementEventNumber":
            new_event_number = previous_state.event_number + 1
        new_obj = StateChange(event_number=new_event_number,
                              clock_speed=previous_state.clock_speed,
                              message=previous_state.message)
        new_obj.save()

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
