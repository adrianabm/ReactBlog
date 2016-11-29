import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { createPost } from '../actions/index'
import { Link } from 'react-router'

class PostsNew extends Component {

  // get access to the router to be able to redirect to the rooth path when a post is sucessfully created
  static contextTypes = {
    router: PropTypes.object
  }

  // whenever handleSubmit is called, this function will be called and pass the properties of the form
  onSubmit(props) {
    this.props.createPost(props)
      .then(() => {
        // blog post has been created, navigate the user to the index
        // we navigate by calling this.context.router.push with the new path to navigate to.
        this.context.router.push('/')
      })
  }

  render() {
    // handleSubmit is coming from the reduxForm library
    const { fields: { title, categories, content }, handleSubmit } = this.props

    return (
      <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
        <h3>Create New Post</h3>
        <div className={ `form-group ${title.touched && title.invalid ? 'has-danger' : '' }` }>
          <label>Title</label>
          <input type="text" className="form-control" { ...title } />
          <div className="text-help form-control-label">
            { title.touched ? title.error : null }
          </div>
        </div>

        <div className={ `form-group ${categories.touched && categories.invalid ? 'has-danger': '' }` }>
          <label>Categories</label>
          <input type="text" className="form-control" { ...categories } />
          <div className="text-help form-control-label">
            { categories.touched ? categories.error : null }
          </div>
        </div>

        <div className={ `form-group ${content.touched && content.invalid ? 'has-danger' : '' }` }>
          <label>Content</label>
          <textarea className="form-control" { ...content } />
          <div className="text-help form-control-label">
            { content.touched ? content.error : null }
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    )
  }
}

function validate(values) {
  const errors = {}

  if (!values.title) {
    errors.title = 'Enter a title'
  }
  if (!values.categories) {
    errors.categories = 'Enter a category'
  }
  if (!values.content) {
    errors.content = 'Enter some content'
  }

  return errors
}

// reduxForm can be used as a connect
// connect: first argument is mapStateToProps, second is mapDispatchToProps
// reduxForm: first is form config, second is mapStateToProps, third is mapDispatchToProps

export default reduxForm({
  // "Letter" that we are passing off to reduxForm
  form: 'PostsNew',
  fields: ['title', 'categories', 'content'], validate
}, null, { createPost })(PostsNew)
