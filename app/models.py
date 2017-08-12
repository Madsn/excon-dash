from __future__ import unicode_literals

from django.db import models

class Event(models.Model):
  """
  Represents an event from the Master Scenario Event List.
  """
  id = models.()

  def __str__(self):
    return self.name
