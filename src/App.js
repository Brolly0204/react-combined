import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd-mobile'
import * as actions from './redux.js'

// 装饰器
@connect(
  state => ({
    num: state.counter
  }),
  {
    ...actions
  }
)
class App extends Component {
  render() {
    const { num, addGun, removeGun, addGunAsync } = this.props
    return (
      <div>
        <h1>
          现在有机枪
          {num}把
        </h1>
        <Button type="primary" onClick={() => addGun()}>
          申请武器
        </Button>
        <Button type="warning" onClick={() => removeGun()}>
          上交武器
        </Button>
        <Button onClick={() => addGunAsync()}>等两天再交</Button>
      </div>
    )
  }
}

export default App

// export default connect(
//   state => {
//     return {
//       num: state
//     }
//   },
//   {
//     ...actions
//   }
// )(App)
