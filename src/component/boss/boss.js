import React, { Component } from 'react'
import { Card, WingBlank, WhiteSpace} from "antd-mobile"
import { connect } from 'react-redux'
import { getUserList } from '../../redux/chatuser'
import UserCard from "../genius/genius"

@connect(
  state => ({ ...state.chatuser }),
  { getUserList }
)
class Boss extends Component {
  componentDidMount() {
    this.props.getUserList('genius')
  }

  render() {
    return <UserCard data={this.props.userList} />
  }
}

export default Boss
