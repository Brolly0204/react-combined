import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TabBar } from 'antd-mobile'
import { withRouter } from "react-router-dom"

@withRouter
class NavLinkBar extends Component {
  static propTypes = {
    data: PropTypes.array
  }
  render() {
    const { data, location: { pathname } } = this.props
    const navList = data.filter(v => !v.hide)
    return (
      <TabBar tabBarPosition={'bottom'}>
        { navList.map(v => (
            <TabBar.Item
              title={v.title}
              key={v.path}
              icon={{uri: require(`./img/${v.icon}.png`)}}
              selectedIcon={{uri: require(`./img/${v.icon}-active.png`)}}
              selected={pathname === v.path}
              onPress={() => {
                this.props.history.push(v.path)
              }}
            />
        )) }
      </TabBar>
    )
  }
}

export default NavLinkBar
