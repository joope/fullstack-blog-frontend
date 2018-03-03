import React from 'react'
class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false
    }
  }

  toggleOpen = () => {
    this.setState({
      opened: !this.state.opened
    })
  }

  render() {
    const {title, author, url, likes, user} = this.props.blog
    if (!title || !author || !url) return null
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    const content = this.state.opened
      ? <div>{title} {author}
          <div>{url}</div>
          <div>{likes}</div>
          <div>Lisäsi: {user && user.name}</div>
        </div>
      : <div>{title} {author}</div>

    return (
      <div style={blogStyle} onClick={this.toggleOpen}>
        {content}
      </div>  
    )
  }
}

export default Blog