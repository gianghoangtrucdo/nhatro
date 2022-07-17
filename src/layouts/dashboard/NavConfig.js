// component
import Iconify from '../../components/Iconify';
import {listIcons} from "@iconify/react/dist/iconify";

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

console.log(listIcons());

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'dormitory',
    path: '/dashboard/doms',
    icon: getIcon('eva:shopping-bag-fill'),
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
  },
  {
    title: 'invoice',
    path: '/dashboard/invoices',
    icon: getIcon('eva:shopping-bag-fill'),
  },
];

export default navConfig;
