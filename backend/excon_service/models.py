from datetime import timedelta

from django.core.exceptions import ValidationError
from django.db import models
from django.utils import timezone


def validate_only_one_instance(obj):
    model = obj.__class__
    if (model.objects.count() > 0 and
            obj.id != model.objects.get().id):
        raise ValidationError("Can only create 1 %s instance" % model.__name__)


class StateChange(models.Model):
    created = models.DateTimeField(editable=False)
    event_number = models.IntegerField(blank=True)
    virtual_clock = models.DateTimeField(blank=True, null=True)
    message = models.CharField(max_length=128, blank=True)
    # Set speed to 0 to pause clock
    clock_speed = models.FloatField()

    def save(self, *args, **kwargs):
        """ On creation, set created_at and calculate virtual clock if none supplied """
        if not self.id:
            now = timezone.now().replace(microsecond=0)
            self.created = now
            if not self.virtual_clock:
                previous = StateChange.objects.all().order_by("-id").first()
                if previous is not None and previous.virtual_clock is not None:
                    diff = (now - previous.created).total_seconds()
                    diff_with_speed = diff * previous.clock_speed
                    self.virtual_clock = previous.virtual_clock + timedelta(seconds=diff_with_speed)
            return super(StateChange, self).save(*args, **kwargs)
        else:
            raise ValidationError("Can not modify StateChanges - create a new one instead")

    def __str__(self):
        return "{0} - {1} - {2} - {3}".format(self.id, self.created, self.virtual_clock, self.clock_speed)
