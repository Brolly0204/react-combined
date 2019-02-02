import React, { Component } from 'react'
import {
  WingBlank,
  WhiteSpace,
  Radio,
  List,
  InputItem,
  Button,
  NoticeBar
} from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { registerAction } from '../../redux/user'
import Logo from '../../component/logo/logo.js'

const RadioItem = Radio.RadioItem

@connect(
  state => ({ ...state.user }),
  { register: registerAction }
)
class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      pwd: '',
      repeatpwd: '',
      type: 'genius'
    }
  }
  handleRegister = () => {
    this.props.register(this.state)
  }
  handleChange = (key, val) => {
    this.setState({ [key]: val })
  }
  register = () => {}
  render() {
    const { type } = this.state
    const {
      redirectTo,
      msg,
      location: { pathname }
    } = this.props
    return (
      <div>
        {redirectTo && redirectTo !== pathname ? (
          <Redirect to={redirectTo} />
        ) : null}
        <Logo />
        <WingBlank>
          <List>
            {msg ? (
              <NoticeBar mode="closable" icon={null}>
                {msg}
              </NoticeBar>
            ) : null}
            <InputItem onChange={v => this.handleChange('user', v)}>
              用户名
            </InputItem>
            <WhiteSpace />
            <InputItem
              type="password"
              onChange={v => this.handleChange('pwd', v)}
            >
              密码
            </InputItem>
            <WhiteSpace />
            <InputItem
              type="password"
              onChange={v => this.handleChange('repeatpwd', v)}
            >
              确认密码
            </InputItem>
            <WhiteSpace />
            <RadioItem
              checked={type === 'genius'}
              onChange={() => this.handleChange('type', 'genius')}
            >
              牛人
            </RadioItem>
            <RadioItem
              checked={type === 'boss'}
              onChange={() => this.handleChange('type', 'boss')}
            >
              BOSS
            </RadioItem>
          </List>
          <WhiteSpace />
          <Button type="primary" onClick={this.handleRegister}>
            注册
          </Button>
        </WingBlank>
      </div>
    )
  }
}

export default Register
