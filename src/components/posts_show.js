import React, { Component, PropTypes } from 'react'

class PostsShow extends Component {
  render() {
    return (
      <div>{ this.props.params.id }</div>
    )
  }
}

export default PostsShow
