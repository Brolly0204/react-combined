import axios from 'axios'
import io from 'socket.io-client'

const socket = io('ws://localhost:7000')

// 获取信息列表
const MSG_LIST = 'MSG_LIST'
// 读取信息
const MSG_RECV = 'MSG_RECV'
// 标识已读
const MSG_READ = 'MSG_READ'

const initState = {
  chatmsg: [],
  users: {},
  unread: 0
}

export default function chat(state = initState, action) {
  switch (action.type) {
    case MSG_LIST:
      return {
        ...state,
        chatmsg: action.payload.msgs,
        users: action.payload.users,
        unread: action.payload.msgs.filter(
          v => !v.read && v.to === action.payload.userid
        ).length
      }
    case MSG_RECV:
      const n = action.payload.to === action.userid ? 1 : 0
      return {
        ...state,
        chatmsg: [...state.chatmsg, action.payload],
        unread: state.unread + n
      }
    case MSG_READ:
      const { from, num } = action.payload
      return {
        ...state,
        chatmsg: state.chatmsg.map(v => ({
          ...v,
          read: v.from === from ? true : v.read
        })),
        unread: state.unread - num
      }
    default:
      return state
  }
}

function msgRecv(msg, userid) {
  return {
    type: MSG_RECV,
    payload: msg,
    userid
  }
}

export function recvMsg() {
  return (dispatch, getState) => {
    socket.on('recvmsg', function(data) {
      const userid = getState().user['_id']
      dispatch(msgRecv(data, userid))
    })
  }
}

function msgRead({ from, userid, num }) {
  return { type: MSG_READ, payload: { from, userid, num } }
}

function msgList(msgs, users, userid) {
  return { type: MSG_LIST, payload: { msgs, users, userid } }
}

export function sendMsg({ from, to, msg }) {
  return () => {
    socket.emit('sendmsg', { from, to, msg })
  }
}

export function readMsg(from) {
  return (dispatch, getState) => {
    axios.post('/user/readmsg', { from }).then(res => {
      const result = res.data
      const userid = getState().user._id
      if (result.code === 0) {
        dispatch(msgRead({ userid, from, num: res.data.num }))
      }
    })
  }
}

export function getMsgList() {
  return (dispatch, getState) => {
    axios.get('/user/getmsglist').then(res => {
      const result = res.data
      if (result.code === 0) {
        const userid = getState().user['_id']
        dispatch(msgList(result.msgs, result.users, userid))
      }
    })
  }
}
