from channels.routing import route_class

from excon_service.consumers import Demultiplexer


channel_routing = [
    route_class(Demultiplexer, path="^/api/v1/ws"),
]
