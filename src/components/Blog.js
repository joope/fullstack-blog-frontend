import React from 'react'
import PropTypes from 'prop-types'

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
    const { showDelete, blog={} } = this.props;
    const { title, author, url, likes, user } = blog;
    
    //if (!title || !author || !url) return null
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
          <div>{likes} <button onClick={this.props.onLike}>Tykkää</button></div>
          <div>Lisäsi: {user && user.name}</div>
          { showDelete && <button onClick={this.props.onDelete}>Poista</button> }
        </div>
      )
    }
    
    return <div style={blogStyle} onClick={this.toggleOpen}>{title} {author}</div>
  }
}

Blog.propTypes = {
  showDelete: PropTypes.bool,
  onDelete: PropTypes.func.isRequired,
  onLike: PropTypes.func.isRequired,
}

export default Blog