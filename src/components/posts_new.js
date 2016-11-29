import _ from 'lodash'
import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { createPost } from '../actions/index'
import { Link } from 'react-router'

const FIELDS = {
  title: {
    type: 'input',
    label: 'Title for post'
   },
  categories: {
    type: 'input',
    label: 'Enter some categories'
  },
  content: {
    type: 'textarea',
    label: 'Post Contents'
 }
}

// ['title', 'categories', 'content']

class PostsNew extends Component {

  // get access to the router to be able to redirect to the rooth path when a post is sucessfully created
  static contextTypes = {
    router: PropTypes.object
  }

  renderField(fieldConfig, field) {
    const fieldHelper = this.props.fields[field]

    return (
      <div key={ fieldConfig.label } className={ `form-group ${fieldHelper.touched && fieldHelper.invalid ? 'has-danger' : '' }` }>
        <label>{ fieldConfig.label }</label>
        <fieldConfig.type className="form-control" { ...fieldHelper } />
        <div className="text-help form-control-label">
          { fieldHelper.touched ? fieldHelper.error : null }
        </div>
      </div>
    )
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
    const { handleSubmit } = this.props

    return (
      <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
        <h3>Create New Post</h3>

        { _.map(FIELDS, this.renderField.bind(this)) }

        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    )
  }
}

function validate(values) {
  const errors = {}

  _.each(FIELDS, (type, field) => {
    if (!values[field]) {
      errors[field] = `${field} is required.`
    }
  })

  return errors
}

// reduxForm can be used as a connect
// connect: first argument is mapStateToProps, second is mapDispatchToProps
// reduxForm: first is form config, second is mapStateToProps, third is mapDispatchToProps

export default reduxForm({
  // "Letter" that we are passing off to reduxForm
  form: 'PostsNew',
  fields: _.keys(FIELDS), validate
}, null, { createPost })(PostsNew)
