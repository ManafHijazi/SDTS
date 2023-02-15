import loadable from '@loadable/component';

const DashboardPageView = loadable(() =>
  import('../../../Views/Home/dashboard-page/DashboardPage.View')
);
const StudentsPageView = loadable(() =>
  import('../../../Views/Home/students-page/StudentsPage.View')
);
const TrainersPageView = loadable(() =>
  import('../../../Views/Home/trainers-page/TrainersPage.View')
);
const VehiclesPageView = loadable(() =>
  import('../../../Views/Home/vehicles-page/VehiclesPage.View')
);
const CoursesPageView = loadable(() => import('../../../Views/Home/courses-page/CoursesPage.View'));

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
    roles: ['SUPER_USER'],
    icon: 'mdi mdi-view-dashboard',
    isDisabled: false,
    isRecursive: false,
    isHidden: false,
    isExact: true,
    children: [],
  },
  {
    id: 2,
    path: '/students-page',
    name: 'Students',
    component: StudentsPageView,
    layout: '/home',
    default: false,
    isRoute: true,
    authorize: true,
    roles: ['SUPER_USER'],
    icon: 'mdi mdi-account-school',
    isDisabled: false,
    isRecursive: false,
    isHidden: false,
    isExact: true,
    children: [],
  },
  {
    id: 3,
    path: '/trainer-page',
    name: 'Trainer',
    component: TrainersPageView,
    layout: '/home',
    default: false,
    isRoute: true,
    authorize: true,
    roles: ['SUPER_USER'],
    icon: 'mdi mdi-human-male-board-poll',
    isDisabled: false,
    isRecursive: false,
    isHidden: false,
    isExact: true,
    children: [],
  },
  {
    id: 4,
    path: '/vehicles-page',
    name: 'Vehicles',
    component: VehiclesPageView,
    layout: '/home',
    default: false,
    isRoute: true,
    authorize: true,
    roles: ['SUPER_USER'],
    icon: 'mdi mdi-car-3-plus',
    isDisabled: false,
    isRecursive: false,
    isHidden: false,
    isExact: true,
    children: [],
  },
  {
    id: 5,
    path: '/courses-page',
    name: 'Courses',
    component: CoursesPageView,
    layout: '/home',
    default: false,
    isRoute: true,
    authorize: true,
    roles: ['SUPER_USER'],
    icon: 'mdi mdi-book-open',
    isDisabled: false,
    isRecursive: false,
    isHidden: false,
    isExact: true,
    children: [],
  },
];

export default HomeRoutes;
