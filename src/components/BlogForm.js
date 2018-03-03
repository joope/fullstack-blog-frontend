import React from 'react'
import blogService from '../services/blogs'

class BlogForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      author: '',
      url: '',
      error: ''
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
      const blog = await blogService.create({
        title: this.state.title,
        author: this.state.author,
        url: this.state.url
      })
  
      this.props.onSuccess(blog)
    } catch(exception) {
      this.setState({
        error: 'Virhe luotaessa blogia',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }
  

  render() {
    return(
      <form onSubmit={this.post}>
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
              placeholder="Osoite"
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

export default BlogForm