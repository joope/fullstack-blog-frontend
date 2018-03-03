import React from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: []
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
  }

  render() {
    const {user, blogs} = this.state;
    const header = user ? <h2>Blogit</h2> : <h2>Kirjaudu sisään</h2>
    return (
      <div>
        { header }
        { user && 
          <div>{user.name} logged in</div>
        }
        { !user && <LoginForm onLogin={(user) => this.setState({user})}/>}
        { user && blogs.map(blog => 
          <Blog key={blog._id} blog={blog}/>
        )}
      </div>
    );
  }
}

export default App;
