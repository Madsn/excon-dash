from channels.binding.websockets import WebsocketBinding

from . import models


class StateChangeBinding(WebsocketBinding):
    model = models.StateChange
    stream = 'state-change'
    fields = ['__all__']

    @classmethod
    def group_names(cls, instance):
        return ['state-change-updates']

    def has_permission(self, user, action, pk):
        return True
