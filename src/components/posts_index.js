import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchPosts } from '../actions/index'
import { Link } from 'react-router-dom'

class PostsIndex extends Component {
  componentWillMount() {
    this.props.fetchPosts()
  }

  renderPosts() {
    return this.props.posts.map((post) => {
      return (
        <Link to={ "posts/" + post.id } key={ post.id }>
          <li className="list-group-item">
              <strong>{ post.title }</strong>
              <span className="post-category">{ post.categories }</span>
          </li>
        </Link>
      )
    })
  }

  render() {
    return (
      <div>
        <div className="text-xs-right">
          <Link to="/posts/new" className="btn btn-primary">Add a post</Link>
        </div>
        <h3>Posts</h3>
        <ul className="list-group">
          { this.renderPosts() }
        </ul>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPosts }, dispatch)
}

function mapStateToProps(state) {
  return { posts: state.posts.all }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsIndex)

// In ES6, it's possible to skip this step of writing the mapDispatchToProps function and just write the export as the following:
// export default connect(null, { fetchPosts })(PostsIndex)
