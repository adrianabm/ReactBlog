import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPosts } from '../actions/index'
import { Link } from 'react-router-dom'

class PostsIndex extends Component {
  componentWillMount() {
    this.props.fetchPosts()
  }

  renderPosts() {
    return _.map(this.props.posts, post => {
      return (
        <Link to={'posts/' + post.id} key={post.id}>
          <li className="list-group-item">
            <strong>{post.title}</strong>
            <span className="post-category">{post.categories}</span>
          </li>
        </Link>
      )
    })
  }

  render() {
    return (
      <div>
        <div className="text-xs-right">
          <Link to="/posts/new" className="btn btn-primary">
            Add a post
          </Link>
        </div>
        <h3>Posts</h3>
        <ul className="list-group">{this.renderPosts()}</ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { posts: state.posts }
}

export default connect(
  mapStateToProps,
  { fetchPosts }
)(PostsIndex)
