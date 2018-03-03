import React from 'react'
import loginService from '../services/login'

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
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
      const user = await loginService.login({...this.state})
      this.props.displayNotification('Kirjauduttiin onnistuneesti sisään')
      this.props.onSuccess(user)
    } catch(exception) {
      this.props.displayNotification('Väärä salasana tai tunnus')
    }
  }
  

  render() {
    return(
      <form onSubmit={this.login}>
      <h2>Kirjaudu sisään</h2>
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