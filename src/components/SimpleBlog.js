import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div>
    <div className="blog-main">
      {blog.title} {blog.author}
    </div>
    <div className="blog-secondary">
      blog has {blog.likes} likes
      <button onClick={onClick}>like</button>
    </div>
  </div>
)

export default SimpleBlog