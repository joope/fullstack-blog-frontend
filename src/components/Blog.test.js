import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

const blog = {
  title: 'Tämä on blogi',
  author: 'Kirjoittajan Nimi',
  url: 'www.url.fi',
  likes: 2,
  user: {
    name: 'Lisääjän Nimi',
    id: '1234123412341234'
  },
}

describe.only('Blog', () => {
  it('renders only title and author on default', () => {
    const blogComponent = shallow(
      <Blog  
        blog={blog} 
        onLike={() => console.log('liked')} 
        onDelete={() => console.log('deleted')}
        showDelete={true}
      />
    )

    expect(blogComponent.text()).toBe('Tämä on blogi Kirjoittajan Nimi')
  })

  it('should show all blog data when clicked', () => {
    const blogComponent = shallow(
      <Blog  
        blog={blog} 
        onLike={() => console.log('liked')} 
        onDelete={() => console.log('deleted')}
        showDelete={true}
      />
    )

    blogComponent.simulate('click')
    console.log(blogComponent.debug())
    const titleAndAuthor = blogComponent.find('.blog-main')
    expect(titleAndAuthor.text()).toBe('Tämä on blogi Kirjoittajan Nimi')

    const url = blogComponent.find('.blog-url')
    expect(url.text()).toBe('www.url.fi')

    const likes = blogComponent.find('.blog-likes')
    expect(likes.text()).toContain('2')

    const user = blogComponent.find('.blog-user')
    expect(user.text()).toBe('Lisäsi: Lisääjän Nimi')
  })
})