import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const create = async (blog) => {
  const config = {
    headers: {'Authorization': token}
  }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const like = async (blog) => {
  const config = {
    headers: {'Authorization': token}
  }
  const likedBlog = {
    ...blog,
    likes: blog.likes + 1
  }
  delete likedBlog.user
  const response = await axios.put(`${baseUrl}/${blog._id}`, likedBlog, config)
  return response.data
}

const remove = async (blog) => {
  const config = {
    headers: {'Authorization': token}
  }
  const response = await axios.delete(`${baseUrl}/${blog._id}`, config)
  return response.data
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default { getAll, create, like, remove, setToken }