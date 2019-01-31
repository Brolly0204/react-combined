import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Button } from 'antd-mobile'
import { login, getUserData } from './Auth.redux.js'

@connect(
  state => ({ ...state.auth }),
  { login, getUserData }
)
class Auth extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        {this.props.isAuth ? <Redirect to="/dashboard" /> : null}
        <p>
          我的名字是 {this.props.user} 年龄是 {this.props.age}
        </p>
        <h2>你没有权限，需要登录才能看</h2>
        <Button type="primary" onClick={this.props.login}>
          登录
        </Button>
      </div>
    )
  }
  componentDidMount() {
    this.props.getUserData()
  }
}

export default Auth
