/**
 * src/boot/router-auth.js
 *
 * Defines router authentication guard
 * It is a boot file to ensure that it runs even before the app is loaded
 *
 */

import { LocalStorage, Dialog } from 'quasar';

export default ({ router, store }) => {
  router.beforeEach((to, from, next) => {
    const token = LocalStorage.getItem('token');
    const user = store.state.auth.user;
    const role = user ? (user.role ? user.role.name : 'guest') : 'guest';
    // console.log(`user: ${user} role: ${role}, token: ${!!token}`)

    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!token) {
        next({
          path: '/login',
          params: { nextUrl: to.fullPath }
        });
      } else {
        if (to.matched.some(record => record.meta.isAdmin)) {
          if (role === 'admin' || role === 'superadmin') {
            next();
          } else {
            Dialog.create({
              title: 'Restricted',
              message:
                'The page you are trying to access is restricted to admins only',
              cancel: true
            });
            // next({ name: 'home' });
            // redirect to origin page
            next({ name: 'dashboard' });
          }
        } else if (to.matched.some(record => record.meta.isEncoder)) {
          if (role === 'encoder') {
            next();
          } else {
            Dialog.create({
              title: 'Restricted',
              message:
                'The page you are trying to access is restricted to encoders only',
              cancel: true
            });

            // redirect to origin page
            next({ name: 'index-project' });
          }
        } else if (to.matched.some(record => record.meta.isReviewer)) {
          if (role === 'reviewer') {
            next();
          } else {
            Dialog.create({
              title: 'Restricted',
              message:
                'The page you are trying to access is restricted to reviewers only',
              cancel: true
            });
            // redirect to origin page
            next({ name: 'index-project' });
          }
        } else {
          // if it does not require special authorization
          return next();
        }
      }
    } else if (to.matched.some(record => record.meta.guest && token)) {
      next('/');
    } else {
      // if the route does not require auth
      return next();
    }
  });
};
