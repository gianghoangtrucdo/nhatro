import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import User from './pages/User';
import NotFound from './pages/Page404';
import DashboardApp from './pages/DashboardApp';
import Doms from "./pages/Doms";
import ViewAndUpdateDormitory from "./components/dormitory/ViewAndUpdateDormitory";
import Contracts from "./pages/Contracts";
import Rooms from "./components/dormitory/Rooms";
import Invoices from "./pages/Invoices";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'doms', element: <Doms /> },
        { path: 'rooms', element: <Rooms /> },
        { path: 'contracts', element: <Contracts /> },
        { path: 'invoices', element: <Invoices /> },
        { path: 'dom/:id', element: <ViewAndUpdateDormitory /> },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
