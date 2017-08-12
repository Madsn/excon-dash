from django.apps import AppConfig


class ExconServiceConfig(AppConfig):
    name = 'excon_service'

    def ready(self):
        from . import signals