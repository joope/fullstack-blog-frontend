let token = null

const blogs = [
  {
    id: "5a451df7571c224a31b5c8ce",
    title: "HTML on helppoa",
    author: "Authori",
    url: "www.urli1.fi",
    likes: 1,
    user: {
      _id: "5a437a9e514ab7f168ddf138",
      username: "mluukkai",
      name: "Matti Luukkainen"
    }
  },
  {
    id: "5a451e21e0b8b04a45638211",
    title: "HTML on helppoa",
    author: "Authori",
    url: "www.urli2.fi",
    likes: 2,
    user: {
      _id: "5a437a9e514ab7f168ddf138",
      username: "mluukkai",
      name: "Matti Luukkainen"
    }
  },
  {
    id: "5a451e30b5ffd44a58fa79ab",
    title: "HTML on helppoa",
    author: "Authori",
    url: "www.urli3.fi",
    likes: 3,
    user: {
      _id: "5a437a9e514ab7f168ddf138",
      username: "mluukkai",
      name: "Matti Luukkainen"
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = () => {
  console.log('lol')
}

export default { getAll, blogs, setToken }
