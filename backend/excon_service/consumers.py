from channels.generic.websockets import WebsocketDemultiplexer, JsonWebsocketConsumer, WebsocketConsumer
from django.utils import timezone
from django.utils.dateparse import parse_datetime
from rest_framework.authtoken.models import Token

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
        if "token" not in content:
            kwargs["multiplexer"].send({"error": "Change requests must include valid token"})
            return
        token = content["token"]
        token_exists = Token.objects.filter(pk=token).exists()
        if not token_exists:
            kwargs["multiplexer"].send({"error": "Invalid token: {0}".format(token)})
            return
        action = content["action"]
        previous_state = StateChange.objects.all().order_by("-id").first()
        if previous_state is None:
            previous_state = StateChange(event_number=0,
                                         clock_speed=1,
                                         message="",
                                         virtual_clock=timezone.now().replace(microsecond=0))
            previous_state.save()
        new_event_number = previous_state.event_number
        new_virtual_clock = None
        new_message = previous_state.message
        new_clock_speed = previous_state.clock_speed
        if action == "decrementEventNumber":
            new_event_number = max(0, previous_state.event_number - 1)
        elif action == "incrementEventNumber":
            new_event_number = previous_state.event_number + 1
        elif action == "decrementClockSpeed":
            new_clock_speed = max(0, previous_state.clock_speed - 1)
        elif action == "incrementClockSpeed":
            new_clock_speed = previous_state.clock_speed + 1
        elif "payload" in content and content["payload"] is not None:
            payload = content["payload"]
            if action == "setEventNumber":
                new_event_number = max(0, int(payload))
            elif action == "setVirtualClock":
                new_virtual_clock = parse_datetime(payload)
            elif action == "setClockSpeed":
                new_clock_speed = max(0, payload)
            elif action == "setMessage":
                new_message = payload
        new_obj = StateChange(event_number=new_event_number,
                              clock_speed=new_clock_speed,
                              message=new_message,
                              virtual_clock=new_virtual_clock)
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
