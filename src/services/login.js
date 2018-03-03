import axios from 'axios'
const baseUrl = '/api/login'

const login = async (user) => {
  const response = await axios
    .post(baseUrl, user)
    .catch((err) => console.log(err))

  return response.data
}

export default {
  login
}