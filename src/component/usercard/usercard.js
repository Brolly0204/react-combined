import React, { Component } from 'react'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

@withRouter
class UserCard extends Component {
  static defaultProps = {
    data: []
  }
  static propTypes = {
    data: PropTypes.array
  }
  handleClick = v => {
    this.props.history.push(`/chat/${v._id}`)
  }
  render() {
    return (
      <WingBlank>
        {this.props.data.map(v => (
          <div key={v['_id']}>
            <WhiteSpace />
            {v.avatar ? (
              <Card onClick={() => this.handleClick(v)}>
                <Card.Header
                  title={v.user}
                  thumb={require(`../images/${v.avatar}.png`)}
                  extra={<span>{v.title}</span>}
                />
                <Card.Body>
                  {v.type === 'boss' ? (
                    <div>
                      职位要求：
                      {v.desc}
                    </div>
                  ) : (
                    <div>{v.desc}</div>
                  )}
                </Card.Body>
                {v.type === 'boss' ? (
                  <Card.Footer
                    content={`薪资：${v.money}`}
                    extra={
                      <div>
                        公司：
                        {v.company}
                      </div>
                    }
                  />
                ) : (
                  <Card.Footer content={`期望薪资：${v.money}`} />
                )}
              </Card>
            ) : null}
          </div>
        ))}
      </WingBlank>
    )
  }
}

export default UserCard
