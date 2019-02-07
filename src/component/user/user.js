import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Modal, Result, List, WhiteSpace } from 'antd-mobile'
import cookies from 'browser-cookies'
import { logoutsubmit } from '../../redux/user'

const Item = List.Item
const Brief = Item.Brief
const alert = Modal.alert

const myImg = ({ avatar }) => {
  let icon
  if (avatar) {
    icon = require(`../images/${avatar}.png`)
  } else {
    icon = require('../images/bull.png')
  }
  return (
    <img
      src={icon}
      style={{ width: '50px', height: '50px' }}
      className="spe am-icon am-icon-md"
      alt=""
    />
  )
}

@connect(
  state => ({ ...state.user }),
  { logoutsubmit }
)
class User extends Component {
  logout = () => {
    alert('注销', '确认退出登录吗？', [
      { text: '取消', onPress: () => console.log('cancel') },
      {
        text: '确认',
        onPress: () => {
          cookies.erase('userid')
          this.props.logoutsubmit()
        }
      }
    ])
  }
  render() {
    const { user, title, company, desc, money, redirectTo } = this.props
    return user ? (
      <div>
        <Result
          img={myImg(this.props)}
          title={user}
          message={<div>{company}</div>}
        />
        <List renderHeader={() => '简介'}>
          <Item>
            {title}
            <Brief>{desc}</Brief>
            {money ? (
              <Brief>
                薪资：
                {money}
              </Brief>
            ) : null}
          </Item>
        </List>
        <WhiteSpace />
        <List>
          <Item onClick={this.logout}>退出登录</Item>
        </List>
      </div>
    ) : (
      <Redirect to={redirectTo} />
    )
  }
}

export default User
