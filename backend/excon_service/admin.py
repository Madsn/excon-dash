from django.contrib import admin
from .models import StateChange


class StateChangeAdmin(admin.ModelAdmin):
    readonly_fields = ('created',)


admin.site.register(StateChange, StateChangeAdmin)
