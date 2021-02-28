import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import Notification from './components/Notification'
import Blog from './components/Blog'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    console.log('haetaan blogit ')
    blogService
      .getAll()
      .then(initialBlogs => {
        console.log(initialBlogs)
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleBlogChange = (event) => {
    console.log(event.target.value)
    setNewBlog(event.target.value)
  }

  const handleAuthorChange = (event) => {
    console.log(event.target.value)
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    console.log(event.target.value)
    setNewUrl(event.target.value)
  }

  const handleLogOut = async () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      console.log('try-time!', window.localStorage)
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlog,
      author: newAuthor,
      url: newUrl
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewBlog('')
        setNewAuthor('')
        setNewUrl('')
        setErrorMessage(
          `'${blogObject.title}' by ${blogObject.author} added`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
      
  }

  const blogForm = () => (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        title:<input
          value={newBlog}
          onChange={handleBlogChange}
        /><br></br>
      author:<input
          value={newAuthor}
          onChange={handleAuthorChange}
        /><br></br>
      url:<input
          value={newUrl}
          onChange={handleUrlChange}
        /><br></br>
        <button type="submit">create</button>
      </form>
    </div>
  )

  const blogsToShow = showAll
    ? blogs
    : blogs.filter(blog => blog.title)

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  if (user === null) {
    return (
      <div>
        <Notification message={errorMessage} />
        <h2>Log in to application</h2>
        {loginForm()}
      </div>
    )
  }

  console.log('hipsu', blogs)
  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={errorMessage} />
      <p>{user.name} logged in<button onClick={() => handleLogOut()}>logout</button>  </p>
      {/* <BlogForm addBlog={addBlog} newBlog={newBlog} handleBlogChange={handleBlogChange}></BlogForm> */}
      {blogForm()}
      <br></br>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
        />
      )}
    </div>
  )
}

export default App