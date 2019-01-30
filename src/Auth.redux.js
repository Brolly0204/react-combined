const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'

const initState = {
  isAuth: false,
  user: '文利'
}

export function auth(state = initState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuth: true
      }
    case LOGOUT:
      return {
        ...state,
        isAuth: false
      }
    default:
      return state
  }
}

export function login() {
  return { type: LOGIN }
}

export function logout() {
  return { type: LOGOUT }
}
