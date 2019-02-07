import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { List, InputItem, WhiteSpace, WingBlank, Button } from 'antd-mobile'
import Logo from '../../component/logo/logo.js'
import { loginAction } from '../../redux/user'
import imoocForm from '../../component/imooc-form/imooc-form.js'

// 属性代理
// function WrapperHello(Comp) {
//   class WrapComp extends Component {
//     render() {
//       return (
//         <div>
//           <p>这是HOC高阶组件特有的元素</p>
//           <Comp {...this.props} />
//         </div>
//       )
//     }
//   }
//   return WrapComp
// }

// const HocHello = WrapperHello(Hello)

// 反向代理
// function WrapperHello(Comp) {
//   class WrapComp extends Comp {
//     componentDidMount() {
//       console.log('Hoc 新增生命周期')
//     }
//     render() {
//       return <Comp />
//     }
//   }
//   return WrapComp
// }
//
// @WrapperHello
// class Hello extends Component {
//   componentDidMount() {
//     console.log('DidMount')
//   }
//   render() {
//     return <div>I love React & Vue & Node.js & Java & Python</div>
//   }
// }

@connect(
  state => ({ ...state.user }),
  { login: loginAction }
)
@imoocForm
class Login extends Component {
  handleLogin = () => {
    this.props.login(this.props.state)
  }
  handleRegister = () => {
    this.props.history.push('/register')
  }
  render() {
    const { redirectTo, handleChange } = this.props
    return (
      <div>
        {redirectTo && redirectTo !== '/login' ? (
          <Redirect to={redirectTo} />
        ) : null}
        <Logo />
        <WingBlank>
          <List>
            <InputItem onChange={v => handleChange('user', v)}>
              用户名
            </InputItem>
            <WhiteSpace />
            <InputItem onChange={v => handleChange('pwd', v)} type="password">
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
