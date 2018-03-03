import React from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: []
    }
  }

  componentDidMount() {
    this.getBlogs()
    const userLocalData = window.localStorage.getItem('loggedInUser')
    if (userLocalData) {
      const user = JSON.parse(userLocalData)
      this.setState({user})
      blogService.setToken(user.token)
    }
  }

  getBlogs = () => {
    console.log('fetching new')
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
  }

  logout = () => {
    this.setState({user: null})
    window.localStorage.clear()
  }

  render() {
    const {user, blogs} = this.state;
    const header = user ? <h2>Blogit</h2> : <h2>Kirjaudu sisään</h2>


    const userInfo = user 
      ? <div>
          {user.name} logged in
          <button onClick={this.logout}>kirjaudu ulos</button>
        </div>
      : null

    return (
      <div>
        { header }
        { userInfo }
        { !user && <LoginForm onSuccess={(user) => this.setState({user})}/>}
        { user && blogs.map(blog => 
          <Blog key={blog._id} blog={blog}/>
        )}
        <BlogForm onSuccess={this.getBlogs}/>
      </div>
    );
  }
}

export default App;
