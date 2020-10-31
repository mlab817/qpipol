const ProjectsRoutes = {
  path: '/projects',
  component: () => import('@/layouts/AppLayout.vue'),
  children: [
    {
      path: '',
      name: 'index-project',
      component: () =>
        import(
          /* webpackChunkName: 'ProjectsPage' */ '../pages/projects/ProjectIndex.vue'
        ),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: 'trash',
      name: 'deleted-projects',
      component: () => import('../pages/projects/DeletedProjects.vue')
    },
    {
      path: 'add',
      name: 'add-project',
      component: () =>
        import(
          /* webpackChunkName: 'AddProjectPage' */ '../pages/projects/AddProjectPage.vue'
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
          /* webpackChunkName: 'ValidateProjectPage' */ '../pages/projects/ValidateProject.vue'
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
          /* webpackChunkName: 'EditProjectPage' */ '../pages/projects/EditProjectPage.vue'
        ),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: ':id/review',
      name: 'review-project',
      component: () =>
        import(
          /* webpackChunkName: 'ReviewProject' */ '../pages/projects/ReviewProject.vue'
        ),
      meta: {
        requiresAuth: true,
        isReviewer: true
      }
    },
    {
      path: ':id/returned',
      name: 'returned-project',
      component: () => import('../pages/projects/ReturnedProject.vue'),
      meta: {
        requiresAuth: true,
        isEncoder: true
      }
    },
    {
      path: ':id/encode',
      name: 'encode-project',
      component: () => import('../pages/projects/EncodeProject.vue')
    },
    {
      path: ':id',
      name: 'view-project',
      component: () =>
        import(
          /* webpackChunkName: 'ViewProject' */ '../pages/projects/ViewProject.vue'
        ),
      meta: {
        requiresAuth: true
      }
    }
  ]
};

export default ProjectsRoutes;
