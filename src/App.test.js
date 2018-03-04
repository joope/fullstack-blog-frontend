import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App />', () => {
  let app

  describe('User is logged in', () => {
    beforeEach(() => {
      const user = {
        name: "Pate Polttaja",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Iktlcm9zaWluaXBhdGUiLCJpZCI6IjVhOTMwNTljZjZiOGRhMTQ0NGZmNmZmOSIsImlhdCI6MTUyMDA5MDk4NH0.vF32qAU7TqhNbMw5EdOXl0utNZdEcbSQWVZzXOyyKNM",
        username: "Kerosiinipate"
      }
      localStorage.setItem('loggedInUser', JSON.stringify(user))
      app = mount(<App />)
    })
    it('renders all blogs when logged in', () => {
      app.update()
      const blogs = app.find(Blog)
      expect(blogs.length).toBe(blogService.blogs.length)
    })
  })


  describe('User not logged in', () => {
    beforeEach(() => {
      localStorage.clear()
      app = mount(<App />)
    })
    it('shows login form when not logged in', () => {
      app.update()
      const form = app.find(LoginForm)
      const blogs = app.find(Blog)
      expect(form.length).toBe(1)
      expect(blogs.length).toBe(0)
    })
  })
})
