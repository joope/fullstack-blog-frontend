import React from 'react'
import loginService from '../services/login'

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      error: ''
    }
  }

  handleLoginFieldChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
  
      this.props.onSuccess(user)
    } catch(exception) {
      this.setState({
        error: 'käyttäjätunnus tai salasana virheellinen',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }
  

  render() {
    return(
      <form onSubmit={this.login}>
        <input 
            type="text"
            name="username"
            placeholder="käyttäjätunnus"
            value={this.state.username}
            onChange={this.handleLoginFieldChange}
        />
        <input
            type="password"
            name="password"
            placeholder="salasana"
            value={this.state.password}
            onChange={this.handleLoginFieldChange}
        />
      <button type="submit">kirjaudu</button>
      { this.state.error && <div>{this.state.error}</div>}
      </form>
    )
  }

}

export default LoginForm