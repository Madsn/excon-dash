from rest_framework import serializers

from . import models


class StateSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.State
        fields = '__all__'
