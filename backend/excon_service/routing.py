from channels import route_class

from excon_service.consumers import Demultiplexer

trip_service_routing = [
]

channel_routing = [
    route_class(Demultiplexer, path="^/api/v1/ws"),
]
