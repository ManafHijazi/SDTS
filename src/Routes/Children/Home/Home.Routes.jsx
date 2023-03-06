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
const SchedulingPageView = loadable(() =>
  import('../../../Views/Home/scheduling-page/SchedulingPage.View')
);
const SchedulesPageView = loadable(() =>
  import('../../../Views/Home/schedules-page/SchedulesPage.View')
);
const ResultEntryPageView = loadable(() =>
  import('../../../Views/Home/result-entry-page/ResultEntryPage.View')
);
const TrainerReportPageView = loadable(() =>
  import('../../../Views/Home/trainer-report-page/TrainerReportPage.View')
);

const PendingTrainingPermit = loadable(() =>
  import('../../../Views/Home/students-page/students-pages/PendingTrainingPermit.View')
);
const PendingTheoryTest = loadable(() =>
  import('../../../Views/Home/students-page/students-pages/PendingTheoryTest.View')
);
const ScheduleRoadLessons = loadable(() =>
  import('../../../Views/Home/students-page/students-pages/ScheduleRoadLessons.View')
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
    children: [
      {
        id: 1,
        path: '/pending-permit',
        name: 'Pending Training Permit',
        layout: '/home/students-page',
        icon: 'mdi mdi-account-clock-outline',
      },
      {
        id: 2,
        path: '/pending-theory-test',
        name: 'Pending Theory Test',
        layout: '/home/students-page',
        icon: 'mdi mdi-note-edit-outline',
      },
      {
        id: 3,
        path: '/schedule-road-lessons',
        name: 'Schedule Road Lessons',
        layout: '/home/students-page',
        icon: 'mdi mdi-road-variant',
      },
    ],
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
    id: 6,
    path: '/pending-permit',
    name: 'Pending Permit',
    component: PendingTrainingPermit,
    layout: '/home/students-page',
    default: false,
    isRoute: true,
    authorize: true,
    roles: ['SUPER_USER'],
    icon: 'mdi mdi-account-clock-outline',
    isDisabled: false,
    isRecursive: false,
    isHidden: true,
    isExact: true,
    children: [],
  },
  {
    id: 7,
    path: '/pending-theory-test',
    name: 'Pending Permit',
    component: PendingTheoryTest,
    layout: '/home/students-page',
    default: false,
    isRoute: true,
    authorize: true,
    roles: ['SUPER_USER'],
    icon: 'mdi mdi-note-edit-outline',
    isDisabled: false,
    isRecursive: false,
    isHidden: true,
    isExact: true,
    children: [],
  },
  {
    id: 8,
    path: '/schedule-road-lessons',
    name: 'Schedule Road Lessons',
    component: ScheduleRoadLessons,
    layout: '/home/students-page',
    default: false,
    isRoute: true,
    authorize: true,
    roles: ['SUPER_USER'],
    icon: 'mdi mdi-road-variant',
    isDisabled: false,
    isRecursive: false,
    isHidden: true,
    isExact: true,
    children: [],
  },
  {
    id: 9,
    path: '/scheduling-page',
    name: 'Scheduling',
    component: SchedulingPageView,
    layout: '/home',
    default: false,
    isRoute: true,
    authorize: true,
    roles: ['SUPER_USER'],
    icon: 'mdi mdi-calendar-clock',
    isDisabled: false,
    isRecursive: false,
    isHidden: true,
    isExact: true,
    children: [],
  },
  {
    id: 10,
    path: '/schedules-page',
    name: 'Scheduled Lessons',
    component: SchedulesPageView,
    layout: '/home',
    default: false,
    isRoute: true,
    authorize: true,
    roles: ['SUPER_USER'],
    icon: 'mdi mdi-calendar-clock',
    isDisabled: false,
    isRecursive: false,
    isHidden: false,
    isExact: true,
    children: [],
  },
  {
    id: 11,
    path: '/trainer-report',
    name: 'Trainer Report',
    component: TrainerReportPageView,
    layout: '/home',
    default: false,
    isRoute: true,
    authorize: true,
    roles: ['SUPER_USER'],
    icon: 'mdi mdi-chart-box-outline',
    isDisabled: false,
    isRecursive: false,
    isHidden: false,
    isExact: true,
    children: [],
  },
  {
    id: 12,
    path: '/results-entry',
    name: 'Results Entry',
    component: ResultEntryPageView,
    layout: '/home',
    default: false,
    isRoute: true,
    authorize: true,
    roles: ['SUPER_USER'],
    icon: 'mdi mdi-list-status',
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
    name: 'Utilities',
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
