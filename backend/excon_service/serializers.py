from rest_framework import serializers

from . import models


class StateChangeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.StateChange
        fields = '__all__'
