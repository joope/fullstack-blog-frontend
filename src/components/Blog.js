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

    if (this.state.opened) {
      return (
        <div style={blogStyle}>
          <div onClick={this.toggleOpen}>{title} {author}</div>
          <div>{url}</div>
          <div>{likes} <button onClick={this.props.onlike}>Tykkää</button></div>
          <div>Lisäsi: {user && user.name}</div>
        </div>
      )
    }
    
    return <div style={blogStyle} onClick={this.toggleOpen}>{title} {author}</div>
  }
}

export default Blog