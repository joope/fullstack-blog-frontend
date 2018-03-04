import React from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'

class BlogForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      author: '',
      url: '',
    }
  }

  handleLoginFieldChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  post = async (event) => {
    event.preventDefault()
    try {
      const blog = await blogService.create({...this.state})
      this.setState({
        title: '',
        author: '',
        url: ''
      })
      this.props.displayNotification(`Lisättiin uusi blogi '${blog.title}', kirjoittajalta ${blog.author}`)
      this.props.onSuccess(blog)
    } catch(exception) {
      this.props.displayNotification('Virhe luotaessa blogia')
    }
  }
  

  render() {
    return(
      <form onSubmit={this.post}>
        <h2>Luo uusi</h2>
        <div>
          <input 
              type="text"
              name="title"
              placeholder="Nimi"
              value={this.state.title}
              onChange={this.handleLoginFieldChange}
          />
        </div>
        <div>
          <input
              type="text"
              name="author"
              placeholder="Kirjoittaja"
              value={this.state.author}
              onChange={this.handleLoginFieldChange}
          />
        </div>
        <div>
          <input
              type="text"
              name="url"
              placeholder="Url"
              value={this.state.url}
              onChange={this.handleLoginFieldChange}
          />
        </div>
      <button type="submit">luo uusi blogi</button>
      { this.state.error && <div>{this.state.error}</div>}
      </form>
    )
  }

}

BlogForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  displayNotification: PropTypes.func.isRequired
}

export default BlogForm