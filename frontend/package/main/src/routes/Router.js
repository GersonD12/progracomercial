import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
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
const Pruebas2 = Loadable(lazy(() => import('../views/apps/pruebas/Prueba')));

const Producto = Loadable(lazy(() => import('../views/productos/Productos')));



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

const ThemeRoutes = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', name: 'Home', element: <Navigate to="/dashboards/modern" /> },
      { path: '/dashboards/modern', name: 'Modern', exact: true, element: <Modern /> },
      { path: '/dashboards/awesome', name: 'awesome', exact: true, element: <Awesome /> },
      { path: '/dashboards/classy', name: 'Classy', exact: true, element: <Classy /> },
      { path: '/dashboards/analytical', name: 'analytical', exact: true, element: <Analytical /> },
      { path: '/dashboards/minimal', name: 'minimal', exact: true, element: <Minimal /> },
      { path: '/about', name: 'about', exact: true, element: <About /> },
 

      /***** PRUEBAS DOUGLAS ****/
      {
        path: '/apps/pruebas', // Puedes personalizar la URL según tus necesidades
        name: 'Pruebas2', // Puedes personalizar el nombre de la ruta
        exact: true, // Opcional: si deseas que coincida exactamente con la URL
        element: <Pruebas2 /> // Renderiza el componente Prueba.js
      },
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
