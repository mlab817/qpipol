import store from '../store'

export const requireAuth = (to, from, next) => {
  function proceed () {
    const requiredPermissions = to.meta.permissions,
      userPermissions = store.auth.getCurrentUser.permissions

    if (requiredPermissions && requiredPermissions.length) {
      if (userPermissions.some(up => up.includes(requiredPermissions))) {
        next()
      } else {
        next({
          name: 'unauthorized'
        })
      }
    } else {
      next()
    }
  }

  const token = localStorage.getItem('token')

  if (!token) {
    next({
      name: 'login'
    })
  } else {
    proceed()
  }
}
