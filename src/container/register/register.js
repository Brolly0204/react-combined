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
import imoocForm from '../../component/imooc-form/imooc-form.js'

const RadioItem = Radio.RadioItem

@connect(
  state => ({ ...state.user }),
  { register: registerAction }
)
@imoocForm
class Register extends Component {
  componentDidMount() {
    this.props.handleChange('type', 'genius')
  }
  handleRegister = () => {
    this.props.register(this.props.state)
  }
  handleChange = (key, val) => {
    this.setState({ [key]: val })
  }
  register = () => {}
  render() {
    const { type } = this.props.state
    const {
      redirectTo,
      msg,
      handleChange,
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
            <InputItem onChange={v => handleChange('user', v)}>
              用户名
            </InputItem>
            <WhiteSpace />
            <InputItem type="password" onChange={v => handleChange('pwd', v)}>
              密码
            </InputItem>
            <WhiteSpace />
            <InputItem
              type="password"
              onChange={v => handleChange('repeatpwd', v)}
            >
              确认密码
            </InputItem>
            <WhiteSpace />
            <RadioItem
              checked={type === 'genius'}
              onChange={() => handleChange('type', 'genius')}
            >
              牛人
            </RadioItem>
            <RadioItem
              checked={type === 'boss'}
              onChange={() => handleChange('type', 'boss')}
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
