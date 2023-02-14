import loadable from '@loadable/component';

const LoginView = loadable(() => import('../../../Views/Accounts/Login/Login.View'));
const ForgotPasswordView = loadable(() =>
  import('../../../Views/Accounts/ForgotPassword/ForgotPassword.View')
);
const ChangePasswordView = loadable(() =>
  import('../../../Views/Accounts/ChangePassword/ChangePassword.View')
);

export const AccountsRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    layout: '/accounts',
    default: true,
    authorize: false,
    isRoute: true,
    isExact: false,
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: ForgotPasswordView,
    layout: '/accounts',
    default: false,
    authorize: false,
    isRoute: true,
  },
  {
    path: '/change-password',
    name: 'change-password',
    component: ChangePasswordView,
    layout: '/accounts',
    default: false,
    authorize: false,
    isRoute: true,
  },
];
