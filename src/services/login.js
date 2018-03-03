import axios from 'axios'
const baseUrl = '/api/login'

const login = async (user) => {
  const response = await axios
    .post(baseUrl, user)
    .catch((err) => console.log(err))

  window.localStorage.setItem('loggedInUser', JSON.stringify(response.data))

  return response.data
}

export default {
  login
}