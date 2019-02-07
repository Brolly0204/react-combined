import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { NavBar } from 'antd-mobile'
import NavLinkBar from '../navlink/navlink'
import Boss from '../boss/boss'
import Genius from '../genius/genius'
import User from '../user/user'
import Msg from '../msg/msg'
import { getMsgList, recvMsg } from '../../redux/chat'

function createNavList(type) {
  return [
    {
      path: '/boss',
      text: '牛人',
      icon: 'boss',
      title: '牛人列表',
      component: Boss,
      hide: type === 'genius'
    },
    {
      path: '/genius',
      text: 'boss',
      icon: 'job',
      title: 'BOSS列表',
      component: Genius,
      hide: type === 'boss'
    },
    {
      path: '/msg',
      text: '消息',
      icon: 'msg',
      title: '消息列表',
      component: Msg
    },
    {
      path: '/me',
      text: '我',
      icon: 'user',
      title: '个人中心',
      component: User
    }
  ]
}

@connect(
  state => ({ ...state.user, ...state.chat }),
  { getMsgList, recvMsg }
)
class Dashboard extends Component {
  componentDidMount() {
    if (!this.props.chatmsg.length) {
      this.props.getMsgList()
      this.props.recvMsg()
    }
  }
  render() {
    const {
      type,
      location: { pathname }
    } = this.props
    const navList = createNavList(type)
    return (
      <div>
        <NavBar className="fixed-header" mode={'dark'}>
          {navList.find(v => v.path === pathname).title}
        </NavBar>
        <div style={{ marginTop: '45px' }}>
          <Switch>
            {navList.map(v => (
              <Route key={v.path} path={v.path} component={v.component} />
            ))}
          </Switch>
        </div>
        <NavLinkBar data={navList} />
      </div>
    )
  }
}

export default Dashboard
