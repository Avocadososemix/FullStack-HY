const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        userId: '60342211a2af4d40be568c90'
    },
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        userId: '60342211a2af4d40be568c90'
    },
]

const initialUsers = [
    {
        _id: '6034229d1de287414ae08f7c',
        blogs: [],
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        passwordHash: '$2b$10$lzXvzyFuJ0IPATmQuRDzdeUJS2mb7/2KOn9g2GpEe/Qo.FW6H4M4S',
    }
]

const nonExistingId = async () => {
    const blog = new Blog({ title: 'willremovethissoon', author: 'someguy', url: 'someurl', likes: 0 })
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs, initialUsers, nonExistingId, blogsInDb, usersInDb
}