import React, { Component } from 'react'
import { Route, Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button, List } from 'antd-mobile'
import App from './App.js'
import { logout } from './Auth.redux.js'

const Item = List.Item

const styles = {
  display: 'block'
}

@connect(
  state => ({ ...state.auth }),
  { logout }
)
class DashBoard extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { match } = this.props
    const redirectLogin = <Redirect to="/login" />
    const app = (
      <div>
        {this.props.isAuth ? (
          <Button onClick={this.props.logout} type="primary">
            注销
          </Button>
        ) : null}
        <List>
          <Item>
            <Link style={styles} to={`${match.url}`}>
              一营
            </Link>
          </Item>
          <Item>
            <Link style={styles} to={`${match.url}/two`}>
              二营
            </Link>
          </Item>
          <Item>
            <Link style={styles} to={`${match.url}/troop`}>
              骑兵连
            </Link>
          </Item>
        </List>
        <Route path={`${match.url}`} exact component={App} />
        <Route path={`${match.url}/two`} component={Two} />
        <Route path={`${match.url}/troop`} component={Troop} />
      </div>
    )
    return this.props.isAuth ? app : redirectLogin
  }
}

export default DashBoard

function Two() {
  return <h2>二营</h2>
}

// function Three() {
//   return <h2>三营</h2>
// }

function Troop() {
  return <h2>骑兵连</h2>
}
