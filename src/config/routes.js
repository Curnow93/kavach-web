import { PieChartOutlined, AppstoreOutlined } from '@ant-design/icons';

//Pages
import Settings from '../pages/settings';
import Users from '../pages/users';
import Profile from '../pages/profile';
import Password from '../pages/password';
import OrganisationCreate from '../pages/organisation';
import App from '../pages/apps';

export default [
  {
    path: '/apps',
    Component: App,
    enableNavigation: true,
    enableBreadcrumb: true,
    Icon: AppstoreOutlined,
    title: 'Apps',
  },
  {
    path: '/settings',
    Component: Settings,
    enableNavigation: true,
    enableBreadcrumb: true,
    Icon: PieChartOutlined,
    title: 'Settings',
  },
  {
    path: '/organisation',
    Component: OrganisationCreate,
    enableNavigation: false,
    enableBreadcrumb: true,
    Icon: PieChartOutlined,
    title: 'Organisation',
  },
  {
    path: '/users',
    Component: Users,
    enableNavigation: true,
    enableBreadcrumb: true,
    Icon: PieChartOutlined,
    title: 'Users',
  },
  {
    path: '/password',
    Component: Password,
    enableNavigation: false,
    enableBreadcrumb: true,
    Icon: PieChartOutlined,
    title: 'Password',
  },
  {
    path: '/profile',
    Component: Profile,
    enableNavigation: false,
    enableBreadcrumb: true,
    Icon: PieChartOutlined,
    title: 'Profile',
  },
];
