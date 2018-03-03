import React from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

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

  handleNewBlog = () => {
    this.getBlogs();
    this.blogForm.toggleVisibility();
  }

  handleLike = (blog) => async () => {
    await blogService.like(blog)
    this.getBlogs()
  }

  getBlogs = async () => {
    let blogs = await blogService.getAll()
    blogs = blogs.sort((a,b) => {
      return b.likes - a.likes
    })
    this.setState({ blogs })
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

    const userInfo = user 
      ? <div>
          {user.name} logged in
          <button onClick={this.logout}>kirjaudu ulos</button>
        </div>
      : null

    const blogList = user 
      ? blogs.map(blog => 
          <Blog key={blog._id} blog={blog} onlike={this.handleLike(blog)}/>
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
        { user && 
          <Togglable buttonLabel='Lisää uusi' ref={component => this.blogForm = component}>
            <BlogForm onSuccess={this.handleNewBlog} displayNotification={this.displayNotification}/>
          </Togglable>
        }
      </div>
    );
  }
}

export default App;
