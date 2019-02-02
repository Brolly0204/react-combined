import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  NavBar,
  InputItem,
  TextareaItem,
  Button,
  WingBlank,
  WhiteSpace
} from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector'
import { update } from '../../redux/user'

@connect(
  state => ({
    ...state.user
  }),
  { update }
)
class GeniusInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      avatar: '',
      title: '',
      money: '',
      desc: ''
    }
  }
  handleChange = (key, val) => {
    this.setState({ [key]: val })
  }
  selectAvatar = imgName => {
    this.setState({ avatar: imgName })
  }
  handleUpdate = () => {
    this.props.update({
      ...this.state
    })
  }
  render() {
    const {
      redirectTo,
      location: { pathname }
    } = this.props
    return (
      <div>
        {redirectTo && redirectTo !== pathname ? (
          <Redirect to={redirectTo} />
        ) : null}
        <NavBar mode="dark">牛人完善信息页</NavBar>
        <AvatarSelector selectAvatar={this.selectAvatar} />
        <InputItem onChange={v => this.handleChange('title', v)}>
          求职岗位
        </InputItem>
        <InputItem onChange={v => this.handleChange('money', v)}>
          期望薪资
        </InputItem>
        <TextareaItem
          title="个人简介"
          autoHeight
          rows={3}
          onChange={v => this.handleChange('desc', v)}
        />
        <WhiteSpace />
        <WingBlank>
          <Button type="primary" onClick={this.handleUpdate}>
            保存
          </Button>
        </WingBlank>
      </div>
    )
  }
}

export default GeniusInfo
