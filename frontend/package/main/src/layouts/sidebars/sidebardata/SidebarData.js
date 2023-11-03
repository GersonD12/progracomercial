import * as Icon from 'react-feather';

const SidebarData = [
 
  { caption: 'Modulos' },

  {
    title: 'Productos',
    href: '/productos/Productos',
    icon: <Icon.ShoppingBag />,
    id: 2.2,
    collapisble: false,
  },
  {
    title: 'Usuarios',
    href: '/usuarios/Usuarios',
    icon: <Icon.User/>,
    id: 2.3,
    collapisble: false,
  },
  {
    title: 'Carrera',
    href: '/carrera/Carrera',
    icon: <Icon.Award />,
    id: 2.4,
    collapisble: false,
  },
  {
    title: 'Terminos',
    href: '/termino/Termino',
    icon: <Icon.FileText />,
    id: 2.5,
    collapisble: false,
  },
  {
    title: 'Publicidad',
    href: '/publicidad/Publicidad',
    icon: <Icon.Tv />,
    id: 2.5,
    collapisble: false,
  },
  {
    title: 'Proveedores',
    href: '/proveedor/Proveedor',
    icon: <Icon.Truck />,
    id: 2.6,
    collapisble: false,
  },
  {
    title: 'Perfiles',
    href: '/perfil/Perfil',
    icon: <Icon.Users />,
    id: 2.7,
    collapisble: false,
  },
  /* {
    title: 'Authentication',
    href: '/auth',
    icon: <Icon.Lock />,
    id: 6.5,
    collapisble: true,
    children: [
      {
        title: 'Login',
        href: '/auth/loginformik',
        icon: <Icon.Disc />,
      },
      {
        title: 'Register',
        href: '/auth/registerformik',
        icon: <Icon.Disc />,
      },
      {
        title: 'Maintanance',
        href: '/auth/maintanance',
        icon: <Icon.Disc />,
      },
      {
        title: 'Lockscreen',
        href: '/auth/lockscreen',
        icon: <Icon.Disc />,
      },
      {
        title: 'Recover Password',
        href: '/auth/recoverpwd',
        icon: <Icon.Disc />,
      },
      {
        title: 'Error',
        href: '/auth/404',
        icon: <Icon.Disc />,
      },
    ],
  }, */
];

export default SidebarData;
