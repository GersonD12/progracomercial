from django.shortcuts import render
from django.views.generic import View
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

# Create your views here.
class Usuarios(View):
    template_name = "index.html"
    cred = credentials.Certificate('./meshopbd-98f09-firebase-adminsdk-rphby-317642e68a.json')
    firebase_admin.initialize_app(cred, {
        'databaseURL': 'https://meshopbd-98f09-default-rtdb.firebaseio.com/'
    })
    ref = db.reference('usuarios')
    datos = ref.get()
    def get(self, request):
        return render(request, self.template_name, { "usuarios": self.datos})