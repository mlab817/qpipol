import { requireAuth } from "src/router/middleware";

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/LandingLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () =>
          import(/* webpackChunkName: 'LandingPage' */ '../pages/Landing.vue')
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
    ]
  },
  {
    path: '/projects',
    component: () => import('@/layouts/AppLayout.vue'),
    beforeEnter: requireAuth,
    children: [
      {
        path: '',
        name: 'index-project',
        component: () =>
          import(
            /* webpackChunkName: 'ProjectsPage' */ 'pages/ProjectIndex.vue'
            ),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'trash',
        name: 'deleted-projects',
        component: () => import('pages/ProjectsDeleted.vue')
      },
      {
        path: 'add',
        name: 'add-project',
        component: () =>
          import(
            /* webpackChunkName: 'AddProjectPage' */ 'pages/ProjectAdd.vue'
            ),
        meta: {
          requiresAuth: true,
          isEncoder: true
        }
      },
      {
        path: ':id/validate',
        name: 'validate-project',
        component: () =>
          import(
            /* webpackChunkName: 'ValidateProjectPage' */ 'pages/ProjectValidate.vue'
            ),
        meta: {
          requiresAuth: true,
          isReviewer: true
        }
      },
      {
        path: ':id/edit',
        name: 'edit-project',
        component: () =>
          import(
            /* webpackChunkName: 'EditProjectPage' */ 'pages/ProjectEdit.vue'
            ),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: ':id',
        name: 'view-project',
        component: () =>
          import(
            /* webpackChunkName: 'ViewProject' */ 'pages/ProjectView.vue'
            ),
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '/review',
    component: () => import('@/layouts/AppLayout.vue'),
    beforeEnter: requireAuth,
    children: [
      {
        path: '',
        name: 'review',
        component: () =>
          import(/* webpackChunkName: 'Review' */ '../pages/Review.vue'),
        meta: {
          requiresAuth: true
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
      },
      {
        path: 'banner-programs',
        name: 'banner-programs',
        component: () =>
          import(
            /* webpackChunkName: 'BannerPrograms' */ '@/pages/BannerPrograms.vue'
          ),
        before: requireAuth,
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
            /* webpackChunkName: 'PrexcPrograms' */ '@/pages/PrexcPrograms.vue'
          ),
        meta: {
          requiresAuth: true,
          isEncoder: true
        }
      },
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
    component: () => import('../layouts/AuthLayout.vue'),
    children: [
      {
        path: '',
        name: 'login',
        component: () =>
          import(/* webpackChunkName: 'LoginPage' */ '../pages/Login.vue'),
        meta: {
          guest: true
        }
      }
    ]
  },
  {
    path: '/email-verify',
    name: 'email-verify',
    component: () => import('../layouts/AuthLayout.vue'),
    children: [
      {
        path: '',
        component: () =>
          import(
            /* webpackChunkName: 'EmailVerify' */ '../pages/EmailVerify.vue'
            )
      }
    ]
  },
  {
    path: '/password/reset/:token',
    name: 'reset-password',
    component: () => import('../layouts/AuthLayout.vue'),
    children: [
      {
        path: '',
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
    path: '/consolidates',
    component: () => import('@/layouts/AppLayout.vue'),
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
