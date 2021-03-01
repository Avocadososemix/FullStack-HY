import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import Notification from './components/Notification'
import Blog from './components/Blog'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Toggleable from './components/Toggleable'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [newBlog, setNewBlog] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')
    // const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    // const [addBlogVisible, setAddBlogVisible] = useState(false)


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

    const handleUsernameChange = (event) => {
        console.log(event.target.value)
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event) => {
        console.log(event.target.value)
        setPassword(event.target.value)
    }

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

    const likeBlog = ( likedBlog) => {
        console.log('likedblog ', likedBlog)
        const blog = blogs.find(blog => blog.id === likedBlog.id)
        const blogID = blog.id
        const changedBlog = { ...blog, likes: blog.likes + 1 }
        console.log('changedBlog ', changedBlog)
        console.log('blogID ', blogID)

        blogService
            .update(blogID, changedBlog)
            .then(returnedBlog => {

                console.log('returnedBlog ', returnedBlog)
                setBlogs(blogs.map(blog => blog.id !== blogID ? blog : returnedBlog))
                // setBlogs(blogs.filter(blog => blog.id !== blogID))
                // setBlogs(blogs.concat(returnedBlog))
                // setNewBlog('')
                // setNewAuthor('')
                // setNewUrl('')
                setErrorMessage(
                    `'${likedBlog.title}' by ${likedBlog.author} liked`
                )
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
            })
    }

    // const blogsToShow = showAll
    //     ? blogs
    //     : blogs.filter(blog => blog.title)

    const sortedBlogs = blogs.sort(function (a, b) {
        return b.likes - a.likes
    })

    if (user === null) {
        return (
            <div>
                <Notification message={errorMessage} />
                <h2>Log in to application</h2>
                <LoginForm
                    username={username}
                    password={password}
                    handleLogin={handleLogin}
                    handleUsernameChange={handleUsernameChange}
                    handlePasswordChange={handlePasswordChange}
                />
                {/* {loginForm()} */}
            </div>
        )
    }

    return (
        <div>
            <h1>Blogs</h1>
            <Notification message={errorMessage} />
            <p>{user.name} logged in<button onClick={() => handleLogOut()}>logout</button>  </p>
            {/* <BlogForm addBlog={addBlog} newBlog={newBlog} handleBlogChange={handleBlogChange}></BlogForm> */}
            {/* {blogForm()} */}
            <Toggleable buttonLabel="new blog">
                <BlogForm
                    addBlog={addBlog}
                    newBlog={newBlog}
                    newAuthor={newAuthor}
                    newUrl={newUrl}
                    handleBlogChange={handleBlogChange}
                    handleAuthorChange={handleAuthorChange}
                    handleUrlChange={handleUrlChange}
                />
            </Toggleable>
            <br></br>
            {sortedBlogs.map(blog =>
                <Blog
                    key={blog.id}
                    blog={blog}
                    likeBlog={likeBlog}
                />
            )}
        </div>
    )
}

export default App