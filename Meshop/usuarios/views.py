from django.shortcuts import render
import pyrebase
import bcrypt
import firebase_admin
from firebase_admin import credentials

# Inicializa Firebase
firebase_cred = credentials.Certificate("./meshopbd-98f09-firebase-adminsdk-rphby-317642e68a.json")
firebase_admin.initialize_app(firebase_cred, {'databaseURL': 'https://meshopbd-98f09-default-rtdb.firebaseio.com/'})

from firebase_admin import db

""" https://www.geeksforgeeks.org/django-authentication-project-with-firebase/ """
config = {
  'apiKey': "AIzaSyA1TvbOsiMLij3qXRjGuuII4uNhRNMKUnQ",
  'authDomain': "meshopbd-98f09.firebaseapp.com",
  'databaseURL': "https://meshopbd-98f09-default-rtdb.firebaseio.com",
  'projectId': "meshopbd-98f09",
  'storageBucket': "meshopbd-98f09.appspot.com",
  'messagingSenderId': "224883523457",
  'appId': "1:224883523457:web:934b1d249bec8e2b313280"
}

# Initialising database,auth and firebase for further use
firebase=pyrebase.initialize_app(config)
authe = firebase.auth()
database=firebase.database()

# Login y Registro
def signIn(request):
    return render(request,"Login.html")

def home(request):
    return render(request,"Home.html")

def postsignIn(request):
    email=request.POST.get('email')
    pasw=request.POST.get('pass')
    try:
        # if there is no error then signin the user with given email and password
        user=authe.sign_in_with_email_and_password(email,pasw)
    except:
        message="Invalid Credentials!!Please ChecK your Data"
        return render(request,"Login.html",{"message":message})
    session_id=user['idToken']
    request.session['uid']=str(session_id)
    return render(request,"Home.html",{"email":email})

def logout(request):
    try:
        del request.session['uid']
    except:
        pass
    return render(request,"Login.html")

def signUp(request):
    return render(request,"Registration.html")

def postsignUp(request):
     email = request.POST.get('email')
     passs = request.POST.get('pass')
     name = request.POST.get('name')
     try:
        # creating a user with the given email and password
        user=authe.create_user_with_email_and_password(email,passs)
        uid = user['localId']
        idtoken = request.session['uid']
        print(uid)
     except:
        ref = db.reference('usuarios')
        hashed_password = bcrypt.hashpw(passs.encode('utf-8'), bcrypt.gensalt())
        # Datos de ejemplo que deseas almacenar
        data = {
            "nombre": name,
            "email": email,
            "password": hashed_password.decode('utf-8')
        }
        # Agregar los datos a la base de datos
        ref.push(data)
        return render(request, "Registration.html")
     return render(request,"Login.html")

# Productos
def createProduct(request):
    # Obtén el ID del usuario autenticado
    #user_id = request.user.uid
    user_id = "NexEqZCtLZHHt-r3TgW"

    nombre_producto = request.POST.get('nombre_producto')
    descripcion_producto = request.POST.get('descripcion_producto')
    precio = request.POST.get('precio')
    stock = request.POST.get('stock')
    categoria_producto = request.POST.get('categoria_producto') # Relacionado con tabla categoria
    proveedor = request.POST.get('proveedor') # Relacionado con tabla proveedor
    imagen = request.POST.get('imagen')
    
    ref = db.reference('productos')
    data = {
        "nombre_producto": nombre_producto,
        "descripcion_producto": descripcion_producto,
        "precio": precio,
        "stock": stock,
        "categoria_producto": categoria_producto,
        "proveedor": proveedor,
        "imagen": imagen,
        "user_id": user_id
    }
    # Agregar los datos a la base de datos
    ref.push(data)
    return render(request,"ProductCreate.html")

def listProductsForUser(request):
    # Obtén el ID del usuario autenticado
    #user_id = request.user.uid
    #user_id = "NexEqZCtLZHHt-r3TgW"  # Reemplaza esto con la forma real de obtener el ID del usuario autenticado
    user_id = "Ndp6ZdoQGeFDa0TVi2k"

    # Consulta la base de datos para obtener los productos del usuario
    ref = db.reference('productos')
    products = ref.order_by_child('user_id').equal_to(user_id).get()

    return render(request, "ProductList.html", {'products': products})