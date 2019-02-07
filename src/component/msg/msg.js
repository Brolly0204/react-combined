import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, Badge } from 'antd-mobile'

const Item = List.Item
const Brief = Item.Brief

@connect(state => ({ ...state }))
class Msg extends Component {
  getLast = arr => {
    return arr[arr.length - 1]
  }

  render() {
    const { chatmsg, users } = this.props.chat
    const userid = this.props.user['_id']
    const msgGroup = {}
    chatmsg.forEach(v => {
      msgGroup[v.chatid] = msgGroup[v.chatid] || []
      msgGroup[v.chatid].push(v)
    })
    const chatList = Object.values(msgGroup).sort((a, b) => {
      const aTime = this.getLast(a).create_time
      const bTime = this.getLast(b).create_time
      return bTime - aTime
    })
    return (
      <div>
        <List>
          {chatList.map(v => {
            const lastItem = this.getLast(v)
            const targetId = v[0].from === userid ? v[0].to : v[0].from
            const unreadNum = v.filter(i => !i.read && i.to === userid).length
            return (
              <Item
                extra={<Badge text={unreadNum} />}
                key={lastItem.create_time}
                thumb={require(`../images/${users[targetId].avatar}.png`)}
                arrow="horizontal"
                onClick={() => {
                  this.props.history.push(`/chat/${targetId}`)
                }}
              >
                {lastItem.content}
                <Brief>{users[targetId].name}</Brief>
              </Item>
            )
          })}
        </List>
      </div>
    )
  }
}

export default Msg
