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
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
  }

  displayNotification = (notification) => {
    this.setState({
      notification
    }, () => window.setTimeout(this.clearNotification, 2000))
  }

  clearNotification = () => {
    this.setState({notification: ''})
  }

  logout = () => {
    this.setState({user: null})
    window.localStorage.clear()
  }

  render() {
    const {user, blogs, notification} = this.state;
    const header = user ? <h2>Blogit</h2> : <h2>Kirjaudu sisään</h2>


    const userInfo = user 
      ? <div>
          {user.name} logged in
          <button onClick={this.logout}>kirjaudu ulos</button>
        </div>
      : null

    const blogList = user 
      ? blogs.map(blog => 
          <Blog key={blog._id} blog={blog}/>
      )
      : null
    const blogHeader = user ? <h2>Blogit</h2> : null

    return (
      <div>
        { notification && <div style={{margin: '15px', color: 'grey'}}>{notification}</div> }
        { userInfo }
        { !user && <LoginForm onSuccess={(user) => this.setState({user})} displayNotification={this.displayNotification}/>}
        { blogHeader }
        { blogList }
        { user && <BlogForm onSuccess={this.getBlogs} displayNotification={this.displayNotification}/>}
      </div>
    );
  }
}

export default App;
