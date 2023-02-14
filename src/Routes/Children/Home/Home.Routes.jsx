import loadable from '@loadable/component';

const DashboardPageView = loadable(() =>
  import('../../../Views/Home/dashboard-page/DashboardPage.View')
);

const HomeRoutes = [
  {
    id: 1,
    path: '/dashboard-page',
    name: 'Dashboard',
    component: DashboardPageView,
    layout: '/home',
    default: true,
    isRoute: true,
    authorize: true,
    roles: ['ALL'],
    icon: 'mdi mdi-store-outline',
    isDisabled: false,
    isRecursive: false,
    isHidden: false,
    isExact: true,
    children: [],
  },
];

export default HomeRoutes;
