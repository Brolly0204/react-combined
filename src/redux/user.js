import axios from 'axios'
import { getRedirectTo } from '../util'

// const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
// const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'
const LOGOUT = 'LOGOUT'

const initState = {
  redirectTo: '',
  msg: '',
  user: '',
  pwd: '',
  type: '',
  avatar: ''
}

export default function userReducer(state = initState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        redirectTo: getRedirectTo(action.payload),
        msg: '',
        ...action.payload
      }
    case LOAD_DATA:
      return {
        ...state,
        ...action.payload
      }
    case ERROR_MSG:
      return {
        ...state,
        msg: action.msg
      }
    case LOGOUT:
      return { ...initState, redirectTo: '/login' }
    default:
      return state
  }
}

function authSuccess(data) {
  return {
    type: AUTH_SUCCESS,
    payload: data
  }
}

export function loadData(userinfo) {
  return {
    type: LOAD_DATA,
    payload: userinfo
  }
}

function errorMsg(msg) {
  return {
    msg,
    type: ERROR_MSG
  }
}

export function loginAction({ user, pwd }) {
  if (!user || !pwd) {
    return errorMsg('用户名密码不能为空！')
  }
  return dispatch => {
    axios
      .post('/user/login', {
        user,
        pwd
      })
      .then(res => {
        const result = res.data
        if (result.code === 0) {
          dispatch(authSuccess(result.data))
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}

export function registerAction({ user, pwd, repeatpwd, type }) {
  if (!user || !pwd || !repeatpwd) {
    return errorMsg('请输入用户名或密码！')
  }

  if (pwd !== repeatpwd) {
    return errorMsg('密码和确认密码不同！')
  }

  return dispatch => {
    axios
      .post('/user/register', {
        user,
        pwd,
        type
      })
      .then(res => {
        const result = res.data
        if (result.code === 0) {
          dispatch(
            authSuccess({
              user,
              pwd,
              type
            })
          )
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}

export function update(data) {
  return dispatch => {
    axios.post('/user/update', data).then(res => {
      const result = res.data
      if (result.code === 0) {
        dispatch(authSuccess(result.data))
      } else {
        dispatch(errorMsg(result.data.msg))
      }
    })
  }
}

export function logoutsubmit() {
  return { type: LOGOUT }
}
