from django.contrib import admin
from django.urls import path

from usuarios.views import signIn, postsignIn, signUp, logout, postsignUp
from usuarios.views import createProduct, listProductsForUser, searchProduct

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    #path('admin/', admin.site.urls),
    path('', signIn),
    path('postsignIn/', postsignIn),
    path('signUp/', signUp, name="signup"),
    path('logout/', logout, name="log"),
    path('postsignUp/', postsignUp),
    # Productos
    path('product/create', createProduct),
    path('product/list', listProductsForUser),
    path('product/search', searchProduct, name='searchProduct')

]