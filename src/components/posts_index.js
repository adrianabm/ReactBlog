import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchPosts } from '../actions/index'

class PostsIndex extends Component {
  componentWillMount() {
    this.props.fetchPosts()
  }

  render() {
    return (
      <div>List of blog posts</div>
    )
  }
}

// In ES6, it's possible to skip this step of writing this function and just do this in the export:
// export default connect(null, { fetchPosts })(PostsIndex)

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPosts }, dispatch)
}

export default connect(null, mapDispatchToProps)(PostsIndex)
