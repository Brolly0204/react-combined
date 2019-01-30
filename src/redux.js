const ADD_GUN = 'ADD_GUN'
const REMOVE_GUN = 'REMOVE_GUN'

export function counter(state = 0, action) {
  switch (action.type) {
    case ADD_GUN:
      return state + 1
    case REMOVE_GUN:
      return state - 1
    default:
      return 10
  }
}

export function addGun() {
  return { type: ADD_GUN }
}

export function removeGun() {
  return { type: REMOVE_GUN }
}

export function addGunAsync() {
  return dispatch => {
    setTimeout(() => {
      dispatch(addGun())
    }, 2000)
  }
}
