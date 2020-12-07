import {
  requireAuth,
  requireGuest
} from "src/router/middleware";

const routes = [
  {
    path: '',
    name: 'landing',
    component: () =>
      import(/* webpackChunkName: 'LandingPage' */ '../pages/Landing.vue')
  },
  {
    path: '/',
    component: () => import('src/layouts/MainLayout.vue'),
    beforeEnter: requireAuth,
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
            /* webpackChunkName: 'ProgramsIndex' */ 'src/pages/ProgramsIndex.vue'
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
            /* webpackChunkName: 'ProgramsValidate' */ 'src/pages/ProgramsValidate.vue'
          ),
        meta: {
          requiresAuth: true,
          isReviewer: true
        }
      },
      {
        path: 'banner-programs',
        name: 'banner-programs',
        component: () =>
          import(
            /* webpackChunkName: 'BannerPrograms' */ 'src/pages/BannerPrograms.vue'
          ),
        meta: {
          requiresAuth: true,
          isEncoder: true
        }
      },
      {
        path: 'prexc-programs',
        name: 'prexc-programs',
        component: () =>
          import(
            /* webpackChunkName: 'PrexcPrograms' */ 'src/pages/PrexcPrograms.vue'
          ),
        meta: {
          requiresAuth: true,
          isEncoder: true
        }
      },
    ]
  },
  {
    path: '/projects',
    component: () => import('@/layouts/AppLayout.vue'),
    beforeEnter: requireAuth,
    children: [
      {
        path: '',
        name: 'project-index',
        component: () => import('src/pages/ProjectIndex.vue')
      },
      {
        path: 'add',
        name: 'project-add',
        component: () => import('src/pages/ProjectAdd.vue')
      }
    ]
  },
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
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: 'LoginPage' */ '../pages/Login.vue'),
    beforeEnter: requireGuest,
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
  },
  {
    path: '/upload',
    component: () => import('src/layouts/AppLayout.vue'),
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
    path: '/consolidates',
    component: () => import('src/layouts/AppLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('../pages/ProgramsConsolidate.vue'),
        meta: {
          requiresAuth: true
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
