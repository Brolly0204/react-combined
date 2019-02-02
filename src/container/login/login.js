import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { List, InputItem, WhiteSpace, WingBlank, Button } from 'antd-mobile'
import Logo from '../../component/logo/logo.js'
import { loginAction } from '../../redux/user'

@connect(
  state => ({ ...state.user }),
  { login: loginAction }
)
class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      pwd: ''
    }
  }
  handleLogin = () => {
    this.props.login(this.state)
  }
  handleRegister = () => {
    this.props.history.push('/register')
  }
  handleChange = (key, val) => {
    this.setState({ [key]: val })
  }
  render() {
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
        <Logo />
        <WingBlank>
          <List>
            <InputItem onChange={v => this.handleChange('user', v)}>
              用户名
            </InputItem>
            <WhiteSpace />
            <InputItem
              onChange={v => this.handleChange('pwd', v)}
              type="password"
            >
              密码
            </InputItem>
          </List>
          <WhiteSpace />
          <Button type="primary" onClick={this.handleLogin}>
            登录
          </Button>
          <WhiteSpace />
          <Button type="primary" onClick={this.handleRegister}>
            注册
          </Button>
        </WingBlank>
      </div>
    )
  }
}

export default Login
