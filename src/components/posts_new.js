import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { createPost } from '../actions/index'

class PostsNew extends Component {
  render() {
    // handleSubmit is coming from the reduxForm library
    const { fields: { title, categories, content }, handleSubmit } = this.props

    return (
      <form onSubmit={ handleSubmit(this.props.createPost) }>
        <h3>Create New Post</h3>
        <div className="form-group">
          <label>Title</label>
          <input type="text" className="form-control" { ...title } />
        </div>

        <div className="form-group">
          <label>Categories</label>
          <input type="text" className="form-control" { ...categories } />
        </div>

        <div className="form-group">
          <label>Content</label>
          <textarea className="form-control" { ...content } />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    )
  }
}

// reduxForm can be used as a connect
// connect: first argument is mapStateToProps, second is mapDispatchToProps
// reduxForm: first is form config, second is mapStateToProps, third is mapDispatchToProps

export default reduxForm({
  // "Letter" that we are passing off to reduxForm
  form: 'PostsNew',
  fields: ['title', 'categories', 'content']
}, null, { createPost })(PostsNew)
