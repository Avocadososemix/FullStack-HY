const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    console.log('getti')
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

// blogsRouter.post('/', (request, response) => {
//     const blog = new Blog(request.body)
//     console.log('posti')
//     blog
//         .save()
//         .then(result => {
//             response.status(201).json(result)
//         })
// })

// blogsRouter.post('/', async (request, response, next) => {
//     const body = request.body

//     const blog = new Blog({
//         title: body.content,
//         author: body.author === undefined ? 'unknown' : body.author,
//         url: body.url === undefined ? 'unknown' : body.url,
//         likes: body.likes === undefined ? 0 : body.likes,
//     })
//     try {
//         const savedBlog = await blog.save()
//         response.json(savedBlog.toJSON())
//     } catch(exception) {
//         next(exception)
//     }
// })

blogsRouter.post('/', async (request, response) => {
    const body = request.body

    const blog = new Blog({
        title: body.title,
        author: body.author === undefined ? 'unknown' : body.author,
        url: body.url,
        likes: body.likes === undefined ? 0 : body.likes,
    })

    if (blog.title === undefined || blog.url === undefined) {
        response.status(400).end()
    } else {
        const savedBlog = await blog.save()
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