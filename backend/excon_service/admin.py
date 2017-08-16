from django.contrib import admin
from .models import State, StateChange


class StateChangeAdmin(admin.ModelAdmin):
    readonly_fields = ('created_at',)


admin.site.register(State)
admin.site.register(StateChange, StateChangeAdmin)
