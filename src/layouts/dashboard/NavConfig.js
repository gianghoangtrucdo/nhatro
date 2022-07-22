// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'dormitory',
    path: '/dashboard/doms',
    icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'room',
    path: '/dashboard/rooms',
    icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: 'contract',
    path: '/dashboard/contracts',
    icon: getIcon('eva:shopping-bag-fill'),
  }
];

export default navConfig;
