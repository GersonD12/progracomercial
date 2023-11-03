import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Loadable from '../layouts/loader/Loadable';
import Usuarios from '../views/usuarios/Usuarios';
//import Prueba from '../views/apps/pruebas/Prueba'; // Importa el componente Prueba.js

/****Layouts*****/

const FullLayout = Loadable(lazy(() => import('../layouts/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/BlankLayout')));
/***** Pages ****/

const Modern = Loadable(lazy(() => import('../views/dashboards/Modern')));
const Awesome = Loadable(lazy(() => import('../views/dashboards/Awesome')));
const Classy = Loadable(lazy(() => import('../views/dashboards/Classy')));
const Analytical = Loadable(lazy(() => import('../views/dashboards/Analytical')));
const Minimal = Loadable(lazy(() => import('../views/dashboards/Minimal')));
const About = Loadable(lazy(() => import('../views/About')));

/***** Apps ****/


/***** PRUEBAS DOUGLAS ****/

const Producto = Loadable(lazy(() => import('../views/productos/Productos')));
const Carrera = Loadable(lazy(() => import('../views/carrera/Carrera')));
const Termino = Loadable(lazy(() => import('../views/terminos/Termino')));
const Publicidad = Loadable(lazy(() => import('../views/publicidad/Publicidad')));
const Proveedor = Loadable(lazy(() => import('../views/proveedor/Proveedor')));
const Perfil = Loadable(lazy(() => import('../views/perfil/Perfil')));



/***** Icon Pages ****/
const Bootstrap = Loadable(lazy(() => import('../views/icons/Bootstrap')));
const Feather = Loadable(lazy(() => import('../views/icons/Feather')));


/***** Auth Pages ****/
const Error = Loadable(lazy(() => import('../views/auth/Error')));
const RegisterFormik = Loadable(lazy(() => import('../views/auth/RegisterFormik')));
const LoginFormik = Loadable(lazy(() => import('../views/auth/LoginFormik')));
const Maintanance = Loadable(lazy(() => import('../views/auth/Maintanance')));
const LockScreen = Loadable(lazy(() => import('../views/auth/LockScreen')));
const RecoverPassword = Loadable(lazy(() => import('../views/auth/RecoverPassword')));

/*****Routes******/

function ModernWithAuthenticationCheck() {
  // Utilizamos !! para convertir en True si existe el Token, o en False si no existe
  const hasAuthToken = !!Cookies.get('authToken');

  // Redirecciona a Login si no está logueado
  if (!hasAuthToken) {
    return <Navigate to="/auth/loginformik" />;
  }

  // Redirecciona a Dashboard si está logueado
  return <Modern />;
}

const ThemeRoutes = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', name: 'Home', element: <Navigate to="/auth/loginformik" /> },
      //{ path: '/dashboards/modern', name: 'Modern', exact: true, element: <Modern /> },
      {
        path: '/dashboards/modern',
        name: 'Modern',
        exact: true,
        element: <ModernWithAuthenticationCheck />,
      },
      { path: '/dashboards/awesome', name: 'awesome', exact: true, element: <Awesome /> },
      { path: '/dashboards/classy', name: 'Classy', exact: true, element: <Classy /> },
      { path: '/dashboards/analytical', name: 'analytical', exact: true, element: <Analytical /> },
      { path: '/dashboards/minimal', name: 'minimal', exact: true, element: <Minimal /> },
      { path: '/about', name: 'about', exact: true, element: <About /> },
 

      /***** PRUEBAS DOUGLAS ****/
      {
        path: '/productos/Productos', // Puedes personalizar la URL según tus necesidades
        name: 'Prodcutos', // Puedes personalizar el nombre de la ruta
        exact: true, // Opcional: si deseas que coincida exactamente con la URL
        element: <Producto /> // Renderiza el componente Prueba.js
      },

      {
        path: '/usuarios/Usuarios', // Puedes personalizar la URL según tus necesidades
        name: 'Usuarios', // Puedes personalizar el nombre de la ruta
        exact: true, // Opcional: si deseas que coincida exactamente con la URL
        element: <Usuarios /> // Renderiza el componente Prueba.js
      },
      {
        path: '/carrera/Carrera', // Puedes personalizar la URL según tus necesidades
        name: 'Carrera', // Puedes personalizar el nombre de la ruta
        exact: true, // Opcional: si deseas que coincida exactamente con la URL
        element: <Carrera /> // Renderiza el componente Prueba.js
      },
      {
        path: '/termino/Termino', // Puedes personalizar la URL según tus necesidades
        name: 'Termino', // Puedes personalizar el nombre de la ruta
        exact: true, // Opcional: si deseas que coincida exactamente con la URL
        element: <Termino /> // Renderiza el componente Prueba.js
      },
      {
        path: '/publicidad/Publicidad', // Puedes personalizar la URL según tus necesidades
        name: 'Publicidad', // Puedes personalizar el nombre de la ruta
        exact: true, // Opcional: si deseas que coincida exactamente con la URL
        element: <Publicidad /> // Renderiza el componente Prueba.js
      },
      {
        path: '/proveedor/Proveedor', // Puedes personalizar la URL según tus necesidades
        name: 'Proveedor', // Puedes personalizar el nombre de la ruta
        exact: true, // Opcional: si deseas que coincida exactamente con la URL
        element: <Proveedor /> // Renderiza el componente Prueba.js
      },
      {
        path: '/perfil/Perfil', // Puedes personalizar la URL según tus necesidades
        name: 'Perfil', // Puedes personalizar el nombre de la ruta
        exact: true, // Opcional: si deseas que coincida exactamente con la URL
        element: <Perfil /> // Renderiza el componente Prueba.js
      },
     
      { path: '/icons/bootstrap', name: 'bootstrap', exact: true, element: <Bootstrap /> },
      { path: '/icons/feather', name: 'feather', exact: true, element: <Feather /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
      { path: 'registerformik', element: <RegisterFormik /> },
      { path: 'loginformik', element: <LoginFormik /> },
      { path: 'maintanance', element: <Maintanance /> },
      { path: 'lockscreen', element: <LockScreen /> },
      { path: 'recoverpwd', element: <RecoverPassword /> },
    ],
  },
];

export default ThemeRoutes;