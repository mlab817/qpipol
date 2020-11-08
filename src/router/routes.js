import ProjectsRoutes from './projects';

const routes = [
  {
    path: '',
    component: () => import('@/layouts/LandingLayout.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () =>
          import(/* webpackChunkName: 'LandingPage' */ '../pages/Landing.vue')
      }
    ]
  },
  {
    path: '/',
    component: () => import('@/layouts/AppLayout.vue'),
    children: [
      {
        path: 'review',
        name: 'review',
        component: () =>
          import(/* webpackChunkName: 'Review' */ '../pages/Review.vue'),
        meta: {
          requiresAuth: true
        }
      },
      // {
      //   path: 'activity',
      //   name: 'activity',
      //   component: () =>
      //     import(
      //       /* webpackChunkName: 'ActivityPage' */ '../pages/ActivityPage.vue'
      //     ),
      //   meta: {
      //     requiresAuth: true
      //   }
      // },
      {
        path: 'notifications',
        name: 'notifications',
        component: () =>
          import(
            /* webpackChunkName: 'Notifications' */ '../pages/Notifications.vue'
          ),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () =>
          import(/* webpackChunkName: 'Dashboard' */ '../pages/Dashboard.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'settings',
        name: 'settings',
        component: () =>
          import(
            /* webpackChunkName: 'SettingsPage' */ '../pages/SettingsPage.vue'
          ),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'profile',
        name: 'profile',
        component: () =>
          import(
            /* webpackChunkName: 'ProfilePage' */ '../pages/ProfilePage.vue'
          ),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'security',
        name: 'security',
        component: () =>
          import(
            /* webpackChunkName: 'SecurityPage' */ '../pages/Security.vue'
          ),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'programs',
        name: 'programs',
        component: () =>
          import(
            /* webpackChunkName: 'ProgramsIndex' */ '@/pages/ProgramsIndex.vue'
          ),
        meta: {
          requiresAuth: true,
          isEncoder: true
        }
      },
      {
        path: 'programs/:id',
        name: 'review-activities',
        component: () =>
          import(
            /* webpackChunkName: 'ProgramsValidate' */ '@/pages/ProgramsValidate.vue'
          ),
        meta: {
          requiresAuth: true,
          isReviewer: true
        }
      }
    ]
  },
  ProjectsRoutes,
  {
    path: '/shared',
    component: () => import('@/layouts/PublicLayout.vue'),
    children: [
      {
        path: ':id',
        name: 'shared-project',
        component: () =>
          import(
            /* webpackChunkName: 'SharedProject' */ '@/pages/SharedProject.vue'
          )
      }
    ]
  },
  {
    path: '',
    component: () => import('../layouts/AuthLayout.vue'),
    children: [
      {
        path: '/login',
        name: 'login',
        component: () =>
          import(/* webpackChunkName: 'LoginPage' */ '../pages/Login.vue'),
        meta: {
          guest: true
        }
      },
      {
        path: '/email-verify',
        name: 'email-verify',
        component: () =>
          import(
            /* webpackChunkName: 'EmailVerify' */ '../pages/EmailVerify.vue'
          )
      },
      {
        path: '/password/reset/:token',
        name: 'reset-password',
        component: () =>
          import(
            /* webpackChunkName: 'ResetPassword' */ '../pages/ResetPassword.vue'
          )
      }
    ]
  },
  {
    path: '/upload',
    component: () => import('@/layouts/AppLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('../pages/ProgramsUpload.vue'),
        meta: {
          requiresAuth: true,
          isEncoder: true
        }
      }
    ]
  },
  {
    path: '/error',
    name: 'error',
    component: () =>
      import(/* webpackChunkName: 'Error404' */ 'pages/Error404.vue')
  }
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  });
}

export default routes;
