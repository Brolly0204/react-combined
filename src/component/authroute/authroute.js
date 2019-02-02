import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import { loadData } from '../../redux/user'

@withRouter
@connect(
  null,
  { loadData }
)
class AuthRoute extends React.Component {
  componentDidMount() {
    const publicList = ['/login', '/register']
    const pathname = this.props.location.pathname
    if (publicList.includes(pathname)) {
      return null
    }
    axios.get('/user/info').then(res => {
      const result = res.data
      if (result.code === 0) {
        this.props.loadData(result.data)
      } else {
        this.props.history.push('/login')
      }
    })
  }

  render() {
    return null
  }
}

export default AuthRoute
