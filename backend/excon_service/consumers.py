from channels.generic.websockets import WebsocketDemultiplexer

from . import binding


class Demultiplexer(WebsocketDemultiplexer):
    consumers = {
        'state': binding.StateBinding.consumer
    }

    def connection_groups(self):
        return ['state-updates']


