from django.urls import path
from usuarios.views import ListCarreras, CreateCarrera, UpdateCarrera, DeleteCarrera
from usuarios.views import ListTerminos, CreateTerminos, UpdateTerminos, DeleteTerminos
from usuarios.views import ListProveedores, CreateProveedor, UpdateProveedor, DeleteProveedor
from usuarios.views import ListPublicidad, CreatePublicidad, UpdatePublicidad, DeletePublicidad
from usuarios.views import ListUsuariosEstudiantes, CreateUsuarioEstudiante, UpdateUsuarioEstudiante, DeleteUsuarioEstudiante
from usuarios.views import ListProductos, CreateProducto, UpdateProducto, DeleteProducto
from usuarios.views import ListUsuariosAdmin, CreateUsuarioAdmin, UpdateUsuarioAdmin, DeleteUsuarioAdmin, LoginUsuarioAdmin
from usuarios.views import searchProduct

urlpatterns = [
    # Rutas para carreras
    path('carreras/', ListCarreras, name='carrera-list'),
    path('carreras/nuevo/', CreateCarrera, name='carrera-create'),
    path('carreras/<int:pk>/editar/', UpdateCarrera, name='carrera-update'),
    path('carreras/<int:pk>/eliminar/', DeleteCarrera, name='carrera-delete'),
    # Rutas para carreras
    path('terminos/', ListTerminos, name='terminos-list'),
    path('terminos/nuevo/', CreateTerminos, name='terminos-create'),
    path('terminos/<int:pk>/editar/', UpdateTerminos, name='terminos-update'),
    path('terminos/<int:pk>/eliminar/', DeleteTerminos, name='terminos-delete'),
    # Rutas para proveedor
    path('proveedores/', ListProveedores, name='proveedor-list'),  
    path('proveedores/nuevo/', CreateProveedor, name='proveedor-create'),
    path('proveedores/<int:pk>/editar/', UpdateProveedor, name='proveedor-update'),
    path('proveedores/<int:pk>/eliminar/', DeleteProveedor, name='proveedor-delete'),
    # Rutas para publicidad
    path('publicidad/', ListPublicidad, name='publicidad-list'),  
    path('publicidad/nuevo/', CreatePublicidad, name='publicidad-create'),
    path('publicidad/<int:pk>/editar/', UpdatePublicidad, name='publicidad-update'),
    path('publicidad/<int:pk>/eliminar/', DeletePublicidad, name='publicidad-delete'),
    # Rutas para usuarios estudiantes
    path('usuarios_estudiantes/', ListUsuariosEstudiantes, name='usuarios_estudiantes-list'),  
    path('usuarios_estudiantes/nuevo/', CreateUsuarioEstudiante, name='usuarios_estudiantes-create'),
    path('usuarios_estudiantes/<int:pk>/editar/', UpdateUsuarioEstudiante, name='usuarios_estudiantes-update'),
    path('usuarios_estudiantes/<int:pk>/eliminar/', DeleteUsuarioEstudiante, name='usuarios_estudiantes-delete'),
    # Rutas para productos
    path('productos/', ListProductos, name='producto-list'), 
    path('productos/nuevo/', CreateProducto, name='producto-create'),
    path('productos/<int:pk>/editar/', UpdateProducto, name='producto-update'),
    path('productos/<int:pk>/eliminar/', DeleteProducto, name='producto-delete'),
    # Rutas para usuarios admin
    path('usuarios_admin/', ListUsuariosAdmin, name='usuarios_admin-list'), 
    path('usuarios_admin/nuevo/', CreateUsuarioAdmin, name='usuarios_admin-create'),
    path('usuarios_admin/<int:pk>/editar/', UpdateUsuarioAdmin, name='usuarios_admin-update'),
    path('usuarios_admin/<int:pk>/eliminar/', DeleteUsuarioAdmin, name='usuarios_admin-delete'),
    # Rutas para login
    path('login/', LoginUsuarioAdmin, name='login'),
    # Ruta para busqueda avanzada
    path('busqueda/', searchProduct, name='busqueda'),    
]
