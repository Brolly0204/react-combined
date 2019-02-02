import React, { Component } from 'react'
import { Grid, List } from 'antd-mobile'
import PropTypes from 'prop-types'

const avatarList = [
  'boy',
  'girl',
  'man',
  'woman',
  'crab',
  'hippopotamus',
  'whale',
  'bull',
  'koala',
  'pig',
  'chick',
  'hedgehog',
  'lemur',
  'tiger',
  'zebra'
].map(item => ({
  icon: require(`../images/${item}.png`),
  text: item
}))

export default class AvatarSelector extends Component {
  static propTypes = {
    selectAvatar: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props)
    this.state = {
      avatarList,
      text: '',
      icon: ''
    }
  }
  render() {
    const { avatarList, icon, text } = this.state
    const gridHeader = icon ? (
      <div>
        <span>已选择头像</span>
        <img
          style={{
            verticalAlign: 'middle',
            marginLeft: '10px'
          }}
          width="20px"
          src={icon}
          alt={text}
        />
      </div>
    ) : (
      <div>请选择头像</div>
    )
    return (
      <div>
        <List renderHeader={() => gridHeader}>
          <Grid
            data={avatarList}
            columnNum={5}
            onClick={info => {
              this.setState({ ...info })
              this.props.selectAvatar(info.text)
            }}
          />
        </List>
      </div>
    )
  }
}
