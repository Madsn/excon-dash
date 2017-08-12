from django.db.models.functions import Cast
from drf_multiple_model.views import MultipleModelAPIView
from rest_framework import permissions, generics, exceptions, status
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response

from excon_service.models import Trip
from .serializers import ScoreboardUserSerializer, ScoreboardTeamSerializer, TripSerializer, UserSerializer
from django.db.models import Sum, Count, F, FloatField
from django.utils.dateparse import parse_date

from . import models


class Trip(generics.CreateAPIView, generics.DestroyAPIView):
    """
    For creation and deletion of trips
    create - creates trip, with the currently authenticated user as owner
    delete - deletes trip, if the currently authenticated user is owner
    """
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = TripSerializer

    def create(self, request, *args, **kwargs):
        data = request.data
        new_trip = Trip.objects.create(distance=data["distance"], date=parse_date(data["date"]), user=request.user)
        new_trip.save()
        serializer = TripSerializer(new_trip)
        return Response(serializer.data)

    def delete(self, request, *args, **kwargs):
        pk = kwargs["pk"]
        trip = get_object_or_404(models.Trip, pk=pk)
        if trip.user == request.user:
            trip.delete()
            return Response()
        else:
            return Response("Users can only delete own trips", status=status.HTTP_403_FORBIDDEN)


class Dashboard(MultipleModelAPIView):
    """
    Gets data relevant for dashboard.
    Trips: Trips related to the current user
    User: Info about the current user
    """
    permission_classes = (permissions.IsAuthenticated,)
    objectify = True

    def get(self, request, *args, **kwargs):
        user = request.user
        self.queryList = [
            (models.Trip.objects.filter(user=user), TripSerializer, "trips"),
            (models.User.objects.filter(pk=user.id), UserSerializer, "userInfo"),
        ]
        return super(Dashboard, self).get(request, *args, **kwargs)


class Scoreboard(MultipleModelAPIView):
    objectify = True
    permission_classes = (permissions.AllowAny,)

    def get(self, request, *args, **kwargs):
        users_query = models.User.objects.values("username", "team__name", "team") \
            .annotate(distance=Sum("trips__distance"),
                      days=Count("trips__date", distinct=True))

        teams_query = models.Team.objects \
            .values("id", "name", "captain", "captain__username") \
            .annotate(distance=Sum("members__trips__distance"),
                      memberCount=Count("members", distinct=True),
                      days=Count("members__trips__date"),
                      avgDays=Cast(F("days"), FloatField())/Cast(F("memberCount"), FloatField()),
                      avgDistance=Cast(F("distance"), FloatField())/Cast(F("memberCount"), FloatField()))

        self.queryList = {
            (users_query, ScoreboardUserSerializer, 'individuals'),
            (teams_query, ScoreboardTeamSerializer, 'teams'),
        }
        return super(Scoreboard, self).get(request, *args, **kwargs)