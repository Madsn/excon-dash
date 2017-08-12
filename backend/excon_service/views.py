from rest_framework import generics

from . import models
from . import serializers


class StateList(generics.ListCreateAPIView):
    queryset = models.State.objects.all()
    serializer_class = serializers.StateSerializer


class StateDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.State.objects.all()
    serializer_class = serializers.StateSerializer
