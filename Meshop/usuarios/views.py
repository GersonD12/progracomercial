import os
import jwt
import json
import bcrypt
import base64
import supabase
from functools import wraps
from fuzzywuzzy import fuzz
from supabase import create_client
from django.http import JsonResponse
from django.http import HttpResponse
from datetime import datetime, timedelta
from binascii import Error as BinasciiError 
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from .models import Carrera, Terminos_y_Condiciones, Proveedor, Publicidad, UsuarioEstudiante, Producto, UsuarioAdmin

# Función para verificar el Token
@csrf_exempt
def verificarToken(view_func):
    @wraps(view_func)
    def wrapper(request, *args, **kwargs):
        # Verificar si existe la cabecera de autorización
        if 'Authorization' not in request.headers:
            return JsonResponse({'message': 'Token no proporcionado.'}, status=401)

        # Obtener el token de la cabecera de autorización
        token_base64  = request.headers['Authorization']

        try:
            token = base64.b64decode(token_base64).decode('utf-8')
            nombre_usuario = 'Miguel'
            id_User = 1
            secret_key = 'Me$hopT0keN'

            try:
                # Verificar el token con la clave secreta
                decoded_token = jwt.decode(token, secret_key, algorithms=['HS256'])

                if decoded_token['nombre_usuario'] != nombre_usuario or decoded_token['id'] != id_User:
                    return JsonResponse({'message': 'El token no pertenece al usuario.'}, status=401)

                # Token válido, continuar con la solicitud y ejecutar la vista
                return view_func(request, *args, **kwargs)
            except jwt.ExpiredSignatureError:
                return JsonResponse({'message': 'Token expirado.'}, status=401)
            except jwt.InvalidTokenError:
                return JsonResponse({'message': 'Token no válido.'}, status=401)
        except BinasciiError:
            return JsonResponse({'message': 'Token no válido: Error de relleno.'}, status=401)
    return wrapper

#-------------------------------------------------------------------------
#CARRERAS
# Listar carrerras
@verificarToken
def ListCarreras(request):
    if request.method == 'GET':
        # Configura la conexión a Supabase
        SUPABASE_URL = os.environ.get('SUPABASE_URL')
        SUPABASE_KEY = os.environ.get('SUPABASE_KEY')
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

        # Realiza una consulta a Supabase para obtener los departamentos
        response = supabase.from_('usuarios_carrera').select('*').execute()

        # Extrae los departamentos de la respuesta
        data = response.data
        carreras = data

        # Convierte los datos a formato JSON y envía una respuesta JSON
        return JsonResponse(carreras, safe=False)
    else:
        return JsonResponse({'message': 'Método no permitido'}, status=405)

# Crear una carrera
@csrf_exempt
@verificarToken
def CreateCarrera(request):
    if request.method == 'POST':
        # Accede directamente al cuerpo de la solicitud (en formato JSON)
        request_data = request.body

        try:
            # Intenta analizar los datos JSON
            data = json.loads(request_data)
        except json.JSONDecodeError as e:
            errors = {'message': 'Error en los datos JSON'}
            return JsonResponse(errors, status=400)

        # Procesa los datos según sea necesario
        # Aquí puedes realizar la inserción a Supabase con los datos de 'data'
        # Asegúrate de configurar las credenciales de Supabase en tu entorno o aquí

        SUPABASE_URL = os.environ.get('SUPABASE_URL')
        SUPABASE_KEY = os.environ.get('SUPABASE_KEY')
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

        # Supongamos que los datos a insertar están en 'data'
        response = supabase.from_('usuarios_carrera').upsert([data]).execute()

        if 'error' not in response:
            response_data = {'message': 'Datos insertados exitosamente en Supabase'}
            return JsonResponse(response_data)
        else:
            errors = {'message': 'Hubo un problema al insertar los datos en Supabase'}
            return JsonResponse(errors, status=500)
    else:
        return HttpResponse("Método no permitido", status=405)

# Actualizar una carrera
@csrf_exempt
@verificarToken
def UpdateCarrera(request, pk):
    if request.method == 'PUT':
        # Configura la conexión a Supabase
        SUPABASE_URL = os.environ.get('SUPABASE_URL')
        SUPABASE_KEY = os.environ.get('SUPABASE_KEY')
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

        # Obtiene el ID de la carrera de la URL
        carrera_id = pk

        # Intenta analizar los datos JSON del cuerpo de la solicitud
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError as e:
            errors = {'message': 'Error en los datos JSON'}
            return JsonResponse(errors, status=400)

        # Actualiza la carrera en Supabase
        response = supabase.from_('usuarios_carrera').update(data).eq('id', carrera_id).execute()

        # Verifica si la actualización fue exitosa y devuelve una respuesta JSON
        if 'error' not in response:
            response_data = {'message': 'Carrera actualizada exitosamente'}
            return JsonResponse(response_data)
        else:
            # Manejo de error y respuesta JSON en caso de error
            errors = {'message': 'Hubo un problema al actualizar la carrera.'}
            return JsonResponse(errors, status=400)
    else:
        return JsonResponse({'message': 'Método no permitido'}, status=405)

# Eliminar una carrera
@csrf_exempt
@verificarToken
def DeleteCarrera(request, pk):
    if request.method == 'DELETE':
        # Configura la conexión a Supabase
        SUPABASE_URL = os.environ.get('SUPABASE_URL')
        SUPABASE_KEY = os.environ.get('SUPABASE_KEY')
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

        # Obtiene el departamento a eliminar
        carrera = get_object_or_404(Carrera, id=pk)

        # Elimina el departamento en Supabase
        response = supabase.from_('usuarios_carrera').delete().eq('id', carrera.id).execute()

        # Verifica si la eliminación fue exitosa y devuelve una respuesta JSON
        if 'error' not in response:
            response_data = {'message': 'Carrera eliminada exitosamente'}
            return JsonResponse(response_data)
        else:
            # Manejo de error y respuesta JSON en caso de error
            errors = {'message': 'Hubo un problema al eliminar la carrera.'}
            return JsonResponse(errors, status=400)
    else:
        return JsonResponse({'message': 'Método no permitido'}, status=405)

#-------------------------------------------------------------------------
#TERMINOS Y CONDICIONES
# Listar terminos y condiciones
def ListTerminos(request):
    if request.method == 'GET':
        # Configura la conexión a Supabase
        SUPABASE_URL = os.environ.get('SUPABASE_URL')
        SUPABASE_KEY = os.environ.get('SUPABASE_KEY')
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

        # Realiza una consulta a Supabase para obtener los departamentos
        response = supabase.from_('usuarios_terminos_y_condiciones').select('*').execute()

        # Extrae los departamentos de la respuesta
        data = response.data
        carreras = data

        # Convierte los datos a formato JSON y envía una respuesta JSON
        return JsonResponse(carreras, safe=False)
    else:
        return JsonResponse({'message': 'Método no permitido'}, status=405)

# Crear terminos y conficiones
@csrf_exempt
@verificarToken
def CreateTerminos(request):
    if request.method == 'POST':
        # Accede directamente al cuerpo de la solicitud (en formato JSON)
        request_data = request.body

        try:
            # Intenta analizar los datos JSON
            data = json.loads(request_data)
        except json.JSONDecodeError as e:
            errors = {'message': 'Error en los datos JSON'}
            return JsonResponse(errors, status=400)

        # Procesa los datos según sea necesario
        # Aquí puedes realizar la inserción a Supabase con los datos de 'data'
        # Asegúrate de configurar las credenciales de Supabase en tu entorno o aquí

        SUPABASE_URL = os.environ.get('SUPABASE_URL')
        SUPABASE_KEY = os.environ.get('SUPABASE_KEY')
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

        # Supongamos que los datos a insertar están en 'data'
        response = supabase.from_('usuarios_terminos_y_condiciones').upsert([data]).execute()

        if 'error' not in response:
            response_data = {'message': 'Datos insertados exitosamente en Supabase'}
            return JsonResponse(response_data)
        else:
            errors = {'message': 'Hubo un problema al insertar los datos en Supabase'}
            return JsonResponse(errors, status=500)
    else:
        return HttpResponse("Método no permitido", status=405)

# Actualizar terminos y condiciones
@csrf_exempt
@verificarToken
def UpdateTerminos(request, pk):
    if request.method == 'PUT':
        # Configura la conexión a Supabase
        SUPABASE_URL = os.environ.get('SUPABASE_URL')
        SUPABASE_KEY = os.environ.get('SUPABASE_KEY')
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

        # Obtiene el ID de la carrera de la URL
        terminos_id = pk

        # Intenta analizar los datos JSON del cuerpo de la solicitud
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError as e:
            errors = {'message': 'Error en los datos JSON'}
            return JsonResponse(errors, status=400)

        # Actualiza la carrera en Supabase
        response = supabase.from_('usuarios_terminos_y_condiciones').update(data).eq('id', terminos_id).execute()

        # Verifica si la actualización fue exitosa y devuelve una respuesta JSON
        if 'error' not in response:
            response_data = {'message': 'Terminos y Condiciones actualizados exitosamente'}
            return JsonResponse(response_data)
        else:
            # Manejo de error y respuesta JSON en caso de error
            errors = {'message': 'Hubo un problema al actualizar los Terminos y Condiciones.'}
            return JsonResponse(errors, status=400)
    else:
        return JsonResponse({'message': 'Método no permitido'}, status=405)

# Eliminar terminos y condiciones
@csrf_exempt
@verificarToken
def DeleteTerminos(request, pk):
    if request.method == 'DELETE':
        # Configura la conexión a Supabase
        SUPABASE_URL = os.environ.get('SUPABASE_URL')
        SUPABASE_KEY = os.environ.get('SUPABASE_KEY')
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

        # Obtiene el departamento a eliminar
        terminos = get_object_or_404(Terminos_y_Condiciones, id=pk)

        # Elimina el departamento en Supabase
        response = supabase.from_('usuarios_terminos_y_condiciones').delete().eq('id', terminos.id).execute()

        # Verifica si la eliminación fue exitosa y devuelve una respuesta JSON
        if 'error' not in response:
            response_data = {'message': 'Terminos y Condiciones eliminados exitosamente'}
            return JsonResponse(response_data)
        else:
            # Manejo de error y respuesta JSON en caso de error
            errors = {'message': 'Hubo un problema al eliminar los Terminos y Condiciones.'}
            return JsonResponse(errors, status=400)
    else:
        return JsonResponse({'message': 'Método no permitido'}, status=405)

#--------------------------------------------------------------------------   
#PROVEEDORES
# Listar proveedores
def ListProveedores(request):
    if request.method == 'GET':
        # Configura la conexión a Supabase
        SUPABASE_URL = os.environ.get('SUPABASE_URL')
        SUPABASE_KEY = os.environ.get('SUPABASE_KEY')
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

        # Realiza una consulta a Supabase para obtener los departamentos
        response = supabase.from_('usuarios_proveedor').select('*').execute()

        # Extrae los departamentos de la respuesta
        data = response.data
        carreras = data

        # Convierte los datos a formato JSON y envía una respuesta JSON
        return JsonResponse(carreras, safe=False)
    else:
        return JsonResponse({'message': 'Método no permitido'}, status=405)

# Crear proveedor
@csrf_exempt
@verificarToken
def CreateProveedor(request):
    if request.method == 'POST':
        # Accede directamente al cuerpo de la solicitud (en formato JSON)
        request_data = request.body

        try:
            # Intenta analizar los datos JSON
            data = json.loads(request_data)
        except json.JSONDecodeError as e:
            errors = {'message': 'Error en los datos JSON'}
            return JsonResponse(errors, status=400)

        # Procesa los datos según sea necesario
        # Aquí puedes realizar la inserción a Supabase con los datos de 'data'
        # Asegúrate de configurar las credenciales de Supabase en tu entorno o aquí

        SUPABASE_URL = os.environ.get('SUPABASE_URL')
        SUPABASE_KEY = os.environ.get('SUPABASE_KEY')
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

        # Supongamos que los datos a insertar están en 'data'
        response = supabase.from_('usuarios_proveedor').upsert([data]).execute()

        if 'error' not in response:
            response_data = {'message': 'Datos insertados exitosamente en Supabase'}
            return JsonResponse(response_data)
        else:
            errors = {'message': 'Hubo un problema al insertar los datos en Supabase'}
            return JsonResponse(errors, status=500)
    else:
        return HttpResponse("Método no permitido", status=405)

# Actualizar proveedor
@csrf_exempt
@verificarToken
def UpdateProveedor(request, pk):
    if request.method == 'PUT':
        # Configura la conexión a Supabase
        SUPABASE_URL = os.environ.get('SUPABASE_URL')
        SUPABASE_KEY = os.environ.get('SUPABASE_KEY')
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

        # Obtiene el ID de la carrera de la URL
        proveedor_id = pk

        # Intenta analizar los datos JSON del cuerpo de la solicitud
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError as e:
            errors = {'message': 'Error en los datos JSON'}
            return JsonResponse(errors, status=400)

        # Actualiza la carrera en Supabase
        response = supabase.from_('usuarios_proveedor').update(data).eq('id', proveedor_id).execute()

        # Verifica si la actualización fue exitosa y devuelve una respuesta JSON
        if 'error' not in response:
            response_data = {'message': 'Proveedor actualizado exitosamente'}
            return JsonResponse(response_data)
        else:
            # Manejo de error y respuesta JSON en caso de error
            errors = {'message': 'Hubo un problema al actualizar al Proveedor.'}
            return JsonResponse(errors, status=400)
    else:
        return JsonResponse({'message': 'Método no permitido'}, status=405)

# Eliminar proveedor
@csrf_exempt
@verificarToken
def DeleteProveedor(request, pk):
    if request.method == 'DELETE':
        # Configura la conexión a Supabase
        SUPABASE_URL = os.environ.get('SUPABASE_URL')
        SUPABASE_KEY = os.environ.get('SUPABASE_KEY')
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

        # Obtiene el departamento a eliminar
        proveedor = get_object_or_404(Proveedor, id=pk)

        # Elimina el departamento en Supabase
        response = supabase.from_('usuarios_proveedor').delete().eq('id', proveedor.id).execute()

        # Verifica si la eliminación fue exitosa y devuelve una respuesta JSON
        if 'error' not in response:
            response_data = {'message': 'Proveedor eliminado exitosamente'}
            return JsonResponse(response_data)
        else:
            # Manejo de error y respuesta JSON en caso de error
            errors = {'message': 'Hubo un problema al eliminar al Proveedor.'}
            return JsonResponse(errors, status=400)
    else:
        return JsonResponse({'message': 'Método no permitido'}, status=405)

#--------------------------------------------------------------------------
#PUBLICIDAD
# Listar publicidad
def ListPublicidad(request):
    if request.method == 'GET':
        # Configura la conexión a Supabase
        SUPABASE_URL = os.environ.get('SUPABASE_URL')
        SUPABASE_KEY = os.environ.get('SUPABASE_KEY')
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

        # Realiza una consulta a Supabase para obtener los departamentos
        response = supabase.from_('usuarios_publicidad').select('*').execute()

        # Extrae los departamentos de la respuesta
        data = response.data
        carreras = data

        # Convierte los datos a formato JSON y envía una respuesta JSON
        return JsonResponse(carreras, safe=False)
    else:
        return JsonResponse({'message': 'Método no permitido'}, status=405)

# Crear publicidad
@csrf_exempt
@verificarToken
def CreatePublicidad(request):
    if request.method == 'POST':
        # Accede directamente al cuerpo de la solicitud (en formato JSON)
        request_data = request.body

        try:
            # Intenta analizar los datos JSON
            data = json.loads(request_data)
        except json.JSONDecodeError as e:
            errors = {'message': 'Error en los datos JSON'}
            return JsonResponse(errors, status=400)

        # Procesa los datos según sea necesario
        # Aquí puedes realizar la inserción a Supabase con los datos de 'data'
        # Asegúrate de configurar las credenciales de Supabase en tu entorno o aquí

        SUPABASE_URL = os.environ.get('SUPABASE_URL')
        SUPABASE_KEY = os.environ.get('SUPABASE_KEY')
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

        # Supongamos que los datos a insertar están en 'data'
        response = supabase.from_('usuarios_publicidad').upsert([data]).execute()

        if 'error' not in response:
            response_data = {'message': 'Datos insertados exitosamente en Supabase'}
            return JsonResponse(response_data)
        else:
            errors = {'message': 'Hubo un problema al insertar los datos en Supabase'}
            return JsonResponse(errors, status=500)
    else:
        return HttpResponse("Método no permitido", status=405)

# Actualizar publicidad
@csrf_exempt
@verificarToken
def UpdatePublicidad(request, pk):
    if request.method == 'PUT':
        # Configura la conexión a Supabase
        SUPABASE_URL = os.environ.get('SUPABASE_URL')
        SUPABASE_KEY = os.environ.get('SUPABASE_KEY')
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

        # Obtiene el ID de la carrera de la URL
        publicidad_id = pk

        # Intenta analizar los datos JSON del cuerpo de la solicitud
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError as e:
            errors = {'message': 'Error en los datos JSON'}
            return JsonResponse(errors, status=400)

        # Actualiza la carrera en Supabase
        response = supabase.from_('usuarios_publicidad').update(data).eq('id', publicidad_id).execute()

        # Verifica si la actualización fue exitosa y devuelve una respuesta JSON
        if 'error' not in response:
            response_data = {'message': 'Publicidad actualizada exitosamente'}
            return JsonResponse(response_data)
        else:
            # Manejo de error y respuesta JSON en caso de error
            errors = {'message': 'Hubo un problema al actualizar la publicidad.'}
            return JsonResponse(errors, status=400)
    else:
        return JsonResponse({'message': 'Método no permitido'}, status=405)

# Eliminar proveedor
@csrf_exempt
@verificarToken
def DeletePublicidad(request, pk):
    if request.method == 'DELETE':
        # Configura la conexión a Supabase
        SUPABASE_URL = os.environ.get('SUPABASE_URL')
        SUPABASE_KEY = os.environ.get('SUPABASE_KEY')
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

        # Obtiene el departamento a eliminar
        publicidad = get_object_or_404(Publicidad, id=pk)

        # Elimina el departamento en Supabase
        response = supabase.from_('usuarios_publicidad').delete().eq('id', publicidad.id).execute()

        # Verifica si la eliminación fue exitosa y devuelve una respuesta JSON
        if 'error' not in response:
            response_data = {'message': 'Publicidad eliminada exitosamente'}
            return JsonResponse(response_data)
        else:
            # Manejo de error y respuesta JSON en caso de error
            errors = {'message': 'Hubo un problema al eliminar la Publicidad.'}
            return JsonResponse(errors, status=400)
    else:
        return JsonResponse({'message': 'Método no permitido'}, status=405)

#--------------------------------------------------------------------------
#USUARIOS (ESTUDIANTES)
# Listar usuarios estudiantes
def ListUsuariosEstudiantes(request):
    if request.method == 'GET':
        # Configura la conexión a Supabase
        SUPABASE_URL = os.environ.get('SUPABASE_URL')
        SUPABASE_KEY = os.environ.get('SUPABASE_KEY')
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

        # Realiza una consulta a Supabase para obtener los departamentos
        response = supabase.from_('usuarios_usuarioestudiante').select('*').execute()

        # Extrae los departamentos de la respuesta
        data = response.data
        carreras = data

        # Convierte los datos a formato JSON y envía una respuesta JSON
        return JsonResponse(carreras, safe=False)
    else:
        return JsonResponse({'message': 'Método no permitido'}, status=405)

# Crear usuario estudiante
@csrf_exempt
@verificarToken
def CreateUsuarioEstudiante(request):
    if request.method == 'POST':
        # Accede directamente al cuerpo de la solicitud (en formato JSON)
        request_data = request.body

        try:
            # Intenta analizar los datos JSON
            data = json.loads(request_data)
        except json.JSONDecodeError as e:
            errors = {'message': 'Error en los datos JSON'}
            return JsonResponse(errors, status=400)

        # Procesa los datos según sea necesario
        # Aquí puedes realizar la inserción a Supabase con los datos de 'data'
        # Asegúrate de configurar las credenciales de Supabase en tu entorno o aquí

        SUPABASE_URL = os.environ.get('SUPABASE_URL')
        SUPABASE_KEY = os.environ.get('SUPABASE_KEY')
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

        # Supongamos que los datos a insertar están en 'data'
        response = supabase.from_('usuarios_usuarioestudiante').upsert([data]).execute()

        if 'error' not in response:
            response_data = {'message': 'Datos insertados exitosamente en Supabase'}
            return JsonResponse(response_data)
        else:
            errors = {'message': 'Hubo un problema al insertar los datos en Supabase'}
            return JsonResponse(errors, status=500)
    else:
        return HttpResponse("Método no permitido", status=405)

# Actualizar publicidad
@csrf_exempt
@verificarToken
def UpdateUsuarioEstudiante(request, pk):
    if request.method == 'PUT':
        # Configura la conexión a Supabase
        SUPABASE_URL = os.environ.get('SUPABASE_URL')
        SUPABASE_KEY = os.environ.get('SUPABASE_KEY')
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

        # Obtiene el ID de la carrera de la URL
        usuario_estudiante_id = pk

        # Intenta analizar los datos JSON del cuerpo de la solicitud
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError as e:
            errors = {'message': 'Error en los datos JSON'}
            return JsonResponse(errors, status=400)

        # Actualiza la carrera en Supabase
        response = supabase.from_('usuarios_usuarioestudiante').update(data).eq('id', usuario_estudiante_id).execute()

        # Verifica si la actualización fue exitosa y devuelve una respuesta JSON
        if 'error' not in response:
            response_data = {'message': 'Usuario Estudiante actualizado exitosamente'}
            return JsonResponse(response_data)
        else:
            # Manejo de error y respuesta JSON en caso de error
            errors = {'message': 'Hubo un problema al actualizar a Usuario Estudiante.'}
            return JsonResponse(errors, status=400)
    else:
        return JsonResponse({'message': 'Método no permitido'}, status=405)

# Eliminar proveedor
@csrf_exempt
@verificarToken
def DeleteUsuarioEstudiante(request, pk):
    if request.method == 'DELETE':
        # Configura la conexión a Supabase
        SUPABASE_URL = os.environ.get('SUPABASE_URL')
        SUPABASE_KEY = os.environ.get('SUPABASE_KEY')
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

        # Obtiene el departamento a eliminar
        usuario_estudiante = get_object_or_404(UsuarioEstudiante, id=pk)

        # Elimina el departamento en Supabase
        response = supabase.from_('usuarios_usuarioestudiante').delete().eq('id', usuario_estudiante.id).execute()

        # Verifica si la eliminación fue exitosa y devuelve una respuesta JSON
        if 'error' not in response:
            response_data = {'message': 'Usuario Estudiante eliminada exitosamente'}
            return JsonResponse(response_data)
        else:
            # Manejo de error y respuesta JSON en caso de error
            errors = {'message': 'Hubo un problema al eliminar a Usuario Estudiante.'}
            return JsonResponse(errors, status=400)
    else:
        return JsonResponse({'message': 'Método no permitido'}, status=405)

#--------------------------------------------------------------------------
#PRODUCTO
# Listar productos
def ListProductos(request):
    if request.method == 'GET':
        # Configura la conexión a Supabase
        SUPABASE_URL = os.environ.get('SUPABASE_URL')
        SUPABASE_KEY = os.environ.get('SUPABASE_KEY')
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

        # Realiza una consulta a Supabase para obtener los departamentos
        response = supabase.from_('usuarios_producto').select('*').execute()

        # Extrae los departamentos de la respuesta
        data = response.data
        carreras = data

        # Convierte los datos a formato JSON y envía una respuesta JSON
        return JsonResponse(carreras, safe=False)
    else:
        return JsonResponse({'message': 'Método no permitido'}, status=405)

# Crear un producto
@csrf_exempt
@verificarToken
def CreateProducto(request):
    if request.method == 'POST':
        # Accede directamente al cuerpo de la solicitud (en formato JSON)
        request_data = request.body

        try:
            # Intenta analizar los datos JSON
            data = json.loads(request_data)
        except json.JSONDecodeError as e:
            errors = {'message': 'Error en los datos JSON'}
            return JsonResponse(errors, status=400)

        # Procesa los datos según sea necesario
        # Aquí puedes realizar la inserción a Supabase con los datos de 'data'
        # Asegúrate de configurar las credenciales de Supabase en tu entorno o aquí

        SUPABASE_URL = os.environ.get('SUPABASE_URL')
        SUPABASE_KEY = os.environ.get('SUPABASE_KEY')
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

        # Supongamos que los datos a insertar están en 'data'
        response = supabase.from_('usuarios_producto').upsert([data]).execute()

        if 'error' not in response:
            response_data = {'message': 'Datos insertados exitosamente en Supabase'}
            return JsonResponse(response_data)
        else:
            errors = {'message': 'Hubo un problema al insertar los datos en Supabase'}
            return JsonResponse(errors, status=500)
    else:
        return HttpResponse("Método no permitido", status=405)

# Actualizar publicidad
@csrf_exempt
@verificarToken
def UpdateProducto(request, pk):
    if request.method == 'PUT':
        # Configura la conexión a Supabase
        SUPABASE_URL = os.environ.get('SUPABASE_URL')
        SUPABASE_KEY = os.environ.get('SUPABASE_KEY')
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

        # Obtiene el ID de la carrera de la URL
        producto_id = pk

        # Intenta analizar los datos JSON del cuerpo de la solicitud
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError as e:
            errors = {'message': 'Error en los datos JSON'}
            return JsonResponse(errors, status=400)

        # Actualiza la carrera en Supabase
        response = supabase.from_('usuarios_producto').update(data).eq('id', producto_id).execute()

        # Verifica si la actualización fue exitosa y devuelve una respuesta JSON
        if 'error' not in response:
            response_data = {'message': 'Producto actualizado exitosamente'}
            return JsonResponse(response_data)
        else:
            # Manejo de error y respuesta JSON en caso de error
            errors = {'message': 'Hubo un problema al actualizar el Producto.'}
            return JsonResponse(errors, status=400)
    else:
        return JsonResponse({'message': 'Método no permitido'}, status=405)

# Eliminar proveedor
@csrf_exempt
@verificarToken
def DeleteProducto(request, pk):
    if request.method == 'DELETE':
        # Configura la conexión a Supabase
        SUPABASE_URL = os.environ.get('SUPABASE_URL')
        SUPABASE_KEY = os.environ.get('SUPABASE_KEY')
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

        # Obtiene el departamento a eliminar
        producto = get_object_or_404(Producto, id=pk)

        # Elimina el departamento en Supabase
        response = supabase.from_('usuarios_producto').delete().eq('id', producto.id).execute()

        # Verifica si la eliminación fue exitosa y devuelve una respuesta JSON
        if 'error' not in response:
            response_data = {'message': 'Producto eliminado exitosamente'}
            return JsonResponse(response_data)
        else:
            # Manejo de error y respuesta JSON en caso de error
            errors = {'message': 'Hubo un problema al eliminar un Producto.'}
            return JsonResponse(errors, status=400)
    else:
        return JsonResponse({'message': 'Método no permitido'}, status=405)

#--------------------------------------------------------------------------
#USUARIOS ADMIN
# Listar usuarios admin
def ListUsuariosAdmin(request):
    if request.method == 'GET':
        # Configura la conexión a Supabase
        SUPABASE_URL = os.environ.get('SUPABASE_URL')
        SUPABASE_KEY = os.environ.get('SUPABASE_KEY')
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

        # Realiza una consulta a Supabase para obtener los departamentos
        response = supabase.from_('usuarios_usuarioadmin').select('*').execute()

        # Extrae los departamentos de la respuesta
        data = response.data
        carreras = data

        # Convierte los datos a formato JSON y envía una respuesta JSON
        return JsonResponse(carreras, safe=False)
    else:
        return JsonResponse({'message': 'Método no permitido'}, status=405)

# Crear un usuario admin
@csrf_exempt
@verificarToken
def CreateUsuarioAdmin(request):
    if request.method == 'POST':
        # Accede directamente al cuerpo de la solicitud (en formato JSON)
        request_data = request.body

        try:
            # Intenta analizar los datos JSON
            data = json.loads(request_data)
        except json.JSONDecodeError as e:
            errors = {'message': 'Error en los datos JSON'}
            return JsonResponse(errors, status=400)

        # Procesa los datos según sea necesario
        # Cifra la contraseña con BCrypt
        if 'password' in data:  # Asume que la contraseña está en un campo llamado 'password'
            password = data['password'].encode('utf-8')
            hashed_password = bcrypt.hashpw(password, bcrypt.gensalt())
            data['password'] = hashed_password.decode('utf-8')

        # Aquí puedes realizar la inserción a Supabase con los datos de 'data'
        # Asegúrate de configurar las credenciales de Supabase en tu entorno o aquí

        SUPABASE_URL = os.environ.get('SUPABASE_URL')
        SUPABASE_KEY = os.environ.get('SUPABASE_KEY')
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

        # Supongamos que los datos a insertar están en 'data'
        response = supabase.from_('usuarios_usuarioadmin').upsert([data]).execute()

        if 'error' not in response:
            response_data = {'message': 'Datos insertados exitosamente en Supabase'}
            return JsonResponse(response_data)
        else:
            errors = {'message': 'Hubo un problema al insertar los datos en Supabase'}
            return JsonResponse(errors, status=500)
    else:
        return HttpResponse("Método no permitido", status=405)

# Actualizar usuario admin
@csrf_exempt
@verificarToken
def UpdateUsuarioAdmin(request, pk):
    if request.method == 'PUT':
        # Configura la conexión a Supabase
        SUPABASE_URL = os.environ.get('SUPABASE_URL')
        SUPABASE_KEY = os.environ.get('SUPABASE_KEY')
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

        # Obtiene el ID de la carrera de la URL
        usuario_admin_id = pk

        # Intenta analizar los datos JSON del cuerpo de la solicitud
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError as e:
            errors = {'message': 'Error en los datos JSON'}
            return JsonResponse(errors, status=400)
        
        # Cifra la contraseña con BCrypt
        if 'password' in data:  # Asume que la contraseña está en un campo llamado 'password'
            password = data['password'].encode('utf-8')
            hashed_password = bcrypt.hashpw(password, bcrypt.gensalt())
            data['password'] = hashed_password.decode('utf-8')

        # Actualiza la carrera en Supabase
        response = supabase.from_('usuarios_usuarioadmin').update(data).eq('id', usuario_admin_id).execute()

        # Verifica si la actualización fue exitosa y devuelve una respuesta JSON
        if 'error' not in response:
            response_data = {'message': 'Usuario Admin actualizado exitosamente'}
            return JsonResponse(response_data)
        else:
            # Manejo de error y respuesta JSON en caso de error
            errors = {'message': 'Hubo un problema al actualizar al Usuario Admin.'}
            return JsonResponse(errors, status=400)
    else:
        return JsonResponse({'message': 'Método no permitido'}, status=405)

# Eliminar usuario admin
@csrf_exempt
@verificarToken
def DeleteUsuarioAdmin(request, pk):
    if request.method == 'DELETE':
        # Configura la conexión a Supabase
        SUPABASE_URL = os.environ.get('SUPABASE_URL')
        SUPABASE_KEY = os.environ.get('SUPABASE_KEY')
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

        # Obtiene el departamento a eliminar
        usuariosadmin = get_object_or_404(UsuarioAdmin, id=pk)

        # Elimina el departamento en Supabase
        response = supabase.from_('usuarios_usuarioadmin').delete().eq('id', usuariosadmin.id).execute()

        # Verifica si la eliminación fue exitosa y devuelve una respuesta JSON
        if 'error' not in response:
            response_data = {'message': 'Usuario Admin eliminado exitosamente'}
            return JsonResponse(response_data)
        else:
            # Manejo de error y respuesta JSON en caso de error
            errors = {'message': 'Hubo un problema al eliminar a Usuario Admin.'}
            return JsonResponse(errors, status=400)
    else:
        return JsonResponse({'message': 'Método no permitido'}, status=405)

#--------------------------------------------------------------------------
#LOGIN
@csrf_exempt
def LoginUsuarioAdmin(request):
    if request.method == 'POST':
        # Accede directamente al cuerpo de la solicitud (en formato JSON)
        request_data = request.body

        try:
            # Intenta analizar los datos JSON
            data = json.loads(request_data)
        except json.JSONDecodeError as e:
            errors = {'message': 'Error en los datos JSON'}
            return JsonResponse(errors, status=400)

        # Asegúrate de que los campos "nombre_usuario" y "password" estén presentes en los datos
        if 'nombre_usuario' not in data or 'password' not in data:
            errors = {'message': 'Credenciales incompletas'}
            return JsonResponse(errors, status=400)

        # Consulta la base de datos Supabase para verificar las credenciales
        SUPABASE_URL = os.environ.get('SUPABASE_URL')
        SUPABASE_KEY = os.environ.get('SUPABASE_KEY')
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

        response = supabase.from_('usuarios_usuarioadmin').select('*').eq('nombre_usuario', data['nombre_usuario']).execute()

        if 'error' not in response and len(response.data) > 0:
            user = response.data[0]
            # Verifica la contraseña utilizando la biblioteca BCrypt
            if bcrypt.checkpw(data['password'].encode('utf-8'), user['password'].encode('utf-8')):
                # Genera un token JWT
                expiration_time = datetime.utcnow() + timedelta(hours=2)
                datosToken = {
                    'id': user['id'],
                    'nombre_usuario': user['nombre_usuario'],  
                    'exp': expiration_time,                   
                }

                # Define una clave secreta para firmar el token (puedes generar una clave segura)
                secret_key = 'Me$hopT0keN'
                token = jwt.encode(datosToken, secret_key, algorithm='HS256')
                token_base64 = base64.b64encode(token).decode('utf-8')
                return JsonResponse({'message': 'Inicio de sesión exitoso', 'token': token_base64})
        
        errors = {'message': 'Credenciales incorrectas'}
        return JsonResponse(errors, status=401)
    else:
        return HttpResponse("Método no permitido", status=405)

@csrf_exempt
@verificarToken
def searchProduct(request):
    if request.method == 'POST':
        # Recibe el texto de la búsqueda de HTML
        request_data = request.body

        try:
            # Intenta analizar los datos JSON
            data = json.loads(request_data)
        except json.JSONDecodeError as e:
            errors = {'message': 'Error en los datos JSON'}
            return JsonResponse(errors, status=400)

        # Obtiene los productos de la tabla 'productos' en Supabase
        # Configura la conexión a Supabase
        SUPABASE_URL = os.environ.get('SUPABASE_URL')
        SUPABASE_KEY = os.environ.get('SUPABASE_KEY')
        supabase_client  = supabase.Client(SUPABASE_URL, SUPABASE_KEY)

        # Obtiene el departamento a eliminar
        products, error = supabase_client.from_('usuarios_producto').select('*').execute()

        # Realiza la búsqueda y almacena los productos con un 40% de match
        results = []
        search_text = data.get('nombre_producto', '')
        for product_data in products[1]:
            product_name = product_data.get('nombre_producto', '')
            # Función fuzz para saber el % de match
            similarity = fuzz.token_sort_ratio(search_text, product_name)
            # Se almacena si es mayor o igual al 40%
            if similarity >= 43:
                results.append(product_data)

        if not results:
            # No se encontraron resultados
            return JsonResponse({'message': 'No se encontraron productos que coincidan con la búsqueda'})
        else :# Se retorna la vista con los resultados cargados
            return JsonResponse({'results': results})
    return JsonResponse({'message': 'Método no permitido'}, status=405)
