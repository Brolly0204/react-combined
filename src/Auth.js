import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Button } from 'antd-mobile'
import { login } from './Auth.redux.js'

@connect(
  state => ({ ...state.auth }),
  { login }
)
class Auth extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        {this.props.isAuth ? <Redirect to="/dashboard" /> : null}
        <h2>你没有权限，需要登录才能看</h2>
        <Button type="primary" onClick={this.props.login}>
          登录
        </Button>
      </div>
    )
  }
}

export default Auth
