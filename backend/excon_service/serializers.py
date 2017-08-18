from rest_framework import serializers

from . import models


class StateChangeSerializer(serializers.ModelSerializer):
    created = serializers.DateTimeField()

    class Meta:
        model = models.StateChange
        fields = "__all__"
