import DashboardLayout from '@/views/Layout/DashboardLayout.vue';
import AuthLayout from '@/views/Pages/AuthLayout.vue';

import NotFound from '@/views/NotFoundPage.vue';

const routes = [
  {
    path: '/',
    redirect: '/auth/login', // 기본 경로를 login으로 리디렉션
  },
  {
    path: '/user',
    component: DashboardLayout,
    children: [

      {
        path: '/',
        name: 'user',
        component: () => import(/* webpackChunkName: "demo" */ '../views/User.vue')
      },
      {
        path: '/icons',
        name: 'icons',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Icons.vue')
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/UserProfile.vue')
      },
      {
        path: '/maps',
        name: 'maps',
        component: () => import(/* webpackChunkName: "demo" */ '../views/GoogleMaps.vue')
      },
      {
        path: '/report',
        name: 'reports',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Report.vue')
      },
      {
        path: '/store',
        name: 'store',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Store.vue')
      },
      {
        path: '/report/admin/:reportId',
        name: 'reportDetail',
        component: () => import(/* webpackChunkName: "demo" */ '../views/ReportDetail.vue')
      },
      {
        path: '/stores/:store_id',
        name: 'storeDetail',
        component: () => import(/* webpackChunkName: "demo" */ '../views/StoreDetail.vue')
      },
      {
        path: '/users/:userId',
        name: 'userDetail',
        component: () => import(/* webpackChunkName: "demo" */ '../views/UserDetail.vue')
      },
      {
        path: '/users/update/:userId',
        name: 'UpdateUser',
        component: () => import(/* webpackChunkName: "demo" */ '../views/UpdateUser.vue')
      },

    ]
  },
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/Login.vue') // Login.vue 파일 경로
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/Register.vue')
      },
      { path: '*', component: NotFound }
    ]
  }
];

export default routes;