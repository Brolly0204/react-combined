import React, { Component } from 'react'
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, recvMsg, readMsg } from '../../redux/chat'
import { getChatId } from '../../util.js'
import './index.less'

const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
  .split(/\s+/)
  .map(v => ({ text: v }))

const Item = List.Item
@connect(
  state => ({ ...state }),
  { getMsgList, sendMsg, recvMsg, readMsg }
)
class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      msg: [],
      showEmoji: false
    }
  }
  componentDidMount() {
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList()
      this.props.recvMsg()
    }
    const to = this.props.match.params.user
    this.props.readMsg(to)
    this.fixCarousel()
  }

  handleChange = v => {
    this.setState({
      text: v
    })
  }
  handleSubmit = () => {
    const from = this.props.user['_id']
    const to = this.props.match.params.user
    const msg = this.state.text
    this.props.sendMsg({ from, to, msg })
    this.setState({
      text: ''
    })
  }
  selectEmoji = v => {
    this.setState({
      text: this.state.text + v.text
    })
  }
  fixCarousel = () => {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 0)
  }
  render() {
    const { user: userid } = this.props.match.params
    const { users, chatmsg } = this.props.chat
    const chatId = getChatId(userid, this.props.user['_id'])
    const chatmsgs = chatmsg.filter(v => v.chatid === chatId)
    if (!users[userid]) {
      return null
    }
    return (
      <div id="chat-page">
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => {
            this.props.history.goBack()
          }}
        >
          {users[userid].name}
        </NavBar>
        {chatmsgs.map(v => {
          const avatar = require(`../images/${users[v.from].avatar}.png`)
          return v.from === userid ? (
            <List key={v._id}>
              <Item thumb={avatar}>{v.content}</Item>
            </List>
          ) : (
            <List key={v._id}>
              <Item extra={<img src={avatar} alt="" />} className="chat-me">
                {v.content}
              </Item>
            </List>
          )
        })}
        <div className="stick-footer">
          <List>
            <InputItem
              placeholder="请输入信息"
              value={this.state.text}
              onChange={this.handleChange}
              extra={
                <div className="sendMsg">
                  <span
                    role={'img'}
                    aria-label={'emoji'}
                    onClick={() =>
                      this.setState(
                        { showEmoji: !this.state.showEmoji },
                        this.fixCarousel
                      )
                    }
                  >
                    😀
                  </span>
                  <span onClick={this.handleSubmit}>发送</span>
                </div>
              }
            />
          </List>
          {this.state.showEmoji ? (
            <Grid
              data={emoji}
              columnNum={9}
              carouselMaxRow={4}
              isCarousel={true}
              onClick={this.selectEmoji}
            />
          ) : null}
        </div>
      </div>
    )
  }
}

export default Chat
