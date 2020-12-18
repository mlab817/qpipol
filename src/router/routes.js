import {
  requireAuth,
  requireGuest
} from "src/router/middleware";

const routes = [
  {
    path: '/',
    component: () => import('src/layouts/MainLayout.vue'),
    beforeEnter: requireAuth,
    children: [
      {
        path: '',
        name: 'home',
        component: () =>
          import(/* webpackChunkName: 'Dashboard' */ '../pages/Dashboard.vue')
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
      }
    ]
  },
  {
    path: '/users',
    component: () => import('src/layouts/MainLayout.vue'),
    beforeEnter: requireAuth,
    children: [
      {
        path: '',
        name: 'users-index',
        component: () => import('src/pages/UserPage.vue')
      },
      {
        path: ':slug',
        name: 'user-page',
        component: () => import('src/pages/UserPage.vue')
      }
    ]
  },
  {
    path: '/projects',
    component: () => import('src/layouts/MainLayout.vue'),
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
      },
      {
        path: ':slug/edit',
        name: 'project-edit',
        component: () => import('src/pages/ProjectEdit.vue')
      },
      {
        path: ':slug',
        name: 'project-view',
        component: () => import('src/pages/ProjectView.vue')
      }
    ]
  },
  {
    path: '/user',
    component: () => import('src/layouts/MainLayout.vue'),
    beforeEnter: requireAuth,
    children: [
      {
        path: 'projects',
        name: 'user-projects',
        component: () => import('src/pages/MyProjects.vue')
      },
      {
        path: 'edit-account',
        name: 'edit-account',
        component: () => import('src/pages/EditAccount.vue')
      },
      {
        path: 'teams',
        name: 'teams',
        component: () => import('src/pages/Teams.vue')
      }
    ]
  },
  {
    path: '/auth/:provider/callback',
    name: 'login-callback',
    component: () => import(/* webpackChunkName: 'LoginCallback' */ '../pages/LoginCallback.vue'),
    meta: {
      guest: true
    }
  },
  {
    path: '/auth',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: 'LoginPage' */ '../pages/Login.vue'),
    beforeEnter: requireGuest,
    meta: {
      guest: true
    }
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
