from channels.binding.websockets import WebsocketBinding

from . import models


class StateBinding(WebsocketBinding):
    model = models.State
    stream = 'state'
    fields = ['__all__']

    @classmethod
    def group_names(cls, instance):
        return ['state-updates']

    def has_permission(self, user, action, pk):
        return True


class StateChangeBinding(WebsocketBinding):
    model = models.StateChange
    stream = 'state-change'
    fields = ['__all__']

    @classmethod
    def group_names(cls, instance):
        return ['state-change-updates']

    def has_permission(self, user, action, pk):
        return True
