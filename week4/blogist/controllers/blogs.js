const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({}).populate('user', { username: 1, name: 1 , url: 1 })

    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
    console.log('blog post ', request.body)
    const body = request.body

    const user = await User.findById(body.userId)

    const blog = new Blog({
        title: body.title,
        author: body.author === undefined ? 'unknown' : body.author,
        url: body.url,
        likes: body.likes === undefined ? 0 : body.likes,
        user: user._id,
        // user: user._id === undefined ? '603410394edac231711e35cc' : user._id,
    })
    // temporarily add root as Blog user, change later!

    if (blog.title === undefined || blog.url === undefined) {
        response.status(400).end()
    } else {
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()

        response.json(savedBlog.toJSON())
    }
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
        response.json(blog.toJSON())
    } else {
        response.status(404).end()
    }
})

// blogsRouter.put('/:id', (request, response) => {
//     const body = request.body

//     const blog = new Blog({
//         title: body.title,
//         author: body.author === undefined ? 'unknown' : body.author,
//         url: body.url,
//         likes: body.likes === undefined ? 0 : body.likes,
//     })

//     const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
//     response.json(updatedBlog)
// })

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

module.exports = blogsRouter