from datetime import timedelta

from django.core.exceptions import ValidationError
from django.db import models
from django.utils import timezone


def validate_only_one_instance(obj):
    model = obj.__class__
    if (model.objects.count() > 0 and
                obj.id != model.objects.get().id):
        raise ValidationError("Can only create 1 %s instance" % model.__name__)


class State(models.Model):
    """
    current_event - the event number from the MSEL
    message - arbitrary message shown on dashboard
    clock_virt_seed - virtual time for t=0 on the virtual clock
    clock_virt_rate - clock rate, e.g. 5.0 -> 1 sec real = 5 sec virtual
    clock_real_seed - real time for t=0 on the virtual clock
    """
    current_event = models.IntegerField(blank=True)
    message = models.CharField(max_length=250, blank=True)
    clock_virt_seed = models.DateTimeField(blank=False, null=False)
    clock_virt_rate = models.FloatField(blank=False, null=False)
    clock_real_seed = models.DateTimeField(auto_now=True, blank=False, null=False)

    def clean(self):
        """
        Don't allow saving more than 1 config row
        """
        validate_only_one_instance(self)


class StateChange(models.Model):
    created_at = models.DateTimeField(editable=False)
    event_number = models.IntegerField(blank=True)
    # TODO: If new virtual clock not supplied, calculate based on previous event
    virtual_clock = models.DateTimeField(blank=True)
    # Set speed to 0 to pause clock
    clock_speed = models.FloatField()

    def save(self, *args, **kwargs):
        """ On creation, set created_at """
        if not self.id:
            now = timezone.now()
            self.created_at = now
        return super(StateChange, self).save(*args, **kwargs)

