import store from '../store'

export const requireAuth = (to, from, next) => {
  function proceed () {
    const requiredPermissions = to.meta && to.meta.permissions,
      userPermissions = store.state.auth.me.permissions

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

export const requireGuest = (to, from, next) => {
  const token = localStorage.getItem('token')
  if (token) {
    next('/')
  } else {
    next()
  }
}
