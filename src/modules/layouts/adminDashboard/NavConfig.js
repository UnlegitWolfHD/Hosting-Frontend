// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navAdminConfig = [
  {
    title: 'Benutzer',
    path: '/admin/user',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'Ankündigung',
    path: '/admin/announce',
    icon: getIcon('eva:people-fill'),
  },
];

export { navAdminConfig };
