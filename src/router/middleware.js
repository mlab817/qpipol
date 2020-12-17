import store from '../store'
import {LocalStorage} from "quasar";

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

export const resolveLogin = (to, from, next) => {
  const access_token = to.query.access_token
  console.log(from)
  console.log(next)
  if (!access_token) {
    next({ name: 'login' })
  } else {
    LocalStorage.set('token', access_token)
    store
      .dispatch('auth/onAuthStateChanged')
      .then(() => console.log('ok'))
      .catch(err => console.log(err.message))
  }
}
