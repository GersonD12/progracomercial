import * as Icon from 'react-feather';

const SidebarData = [
  { caption: 'Inicio' },
  {
    title: 'Dashboards',
    href: '/dashboards',
    id: 1,
    suffix: '5',
    suffixColor: 'bg-primary',
    icon: <Icon.Home />,
    collapisble: true,
    children: [
      {
        title: 'Modern',
        href: '/dashboards/modern',
        icon: <Icon.Disc />,
        id: 1.1,
        collapisble: false,
      },
      {
        title: 'Awesome',
        href: '/dashboards/awesome',
        icon: <Icon.Disc />,
        id: 1.2,
        collapisble: false,
      },
      {
        title: 'Classy',
        href: '/dashboards/classy',
        icon: <Icon.Disc />,
        id: 1.3,
        collapisble: false,
      },
      {
        title: 'Analytical',
        href: '/dashboards/analytical',
        icon: <Icon.Disc />,
        id: 1.4,
        collapisble: false,
      },
      {
        title: 'Minimal',
        href: '/dashboards/minimal',
        icon: <Icon.Disc />,
        id: 1.5,
        collapisble: false,
      },
    ],
  },
  { caption: 'Aplicaciones' },
  {
    title: 'Pruebaaaas',
    href: '/apps/pruebas',
    icon: <Icon.FileText />,
    id: 2.1,
    collapisble: false,
  },
  {
    title: 'Productos',
    href: '/productos/Productos',
    icon: <Icon.FileText />,
    id: 2.2,
    collapisble: false,
  },
  {
    title: 'Estudiantes',
    href: '/usuarios/Usuarios',
    icon: <Icon.FileText />,
    id: 2.3,
    collapisble: false,
  },
  {
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
  },
];

export default SidebarData;
