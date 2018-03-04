import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('SimpleBlog', () => {
  it('renders correct content', () => {
    const blog = {
      title: 'Tämä on blogi',
      author: 'Kirjoittajan Nimi',
      url: 'www.url.fi',
      likes: 2,
      user: {
        id: '1234123412341234'
      },
      
    }
    const onClick = () => console.log('Clicked button')
    const blogComponent = shallow(<SimpleBlog blog={blog} onClick={onClick}/>)

    const titleAndAuthor = blogComponent.find('.blog-main')
    expect(titleAndAuthor.text()).toBe('Tämä on blogi Kirjoittajan Nimi')

    const likes = blogComponent.find('.blog-secondary')
    expect(likes.text()).toContain('blog has 2 likes')
  })
})