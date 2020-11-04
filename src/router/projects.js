const ProjectsRoutes = {
  path: '/projects',
  component: () => import('@/layouts/AppLayout.vue'),
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
};

export default ProjectsRoutes;
