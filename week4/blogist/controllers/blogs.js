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

blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)
    console.log('posti')
    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})

// const PORT = 3003

// blogsRouter.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`)
// })

module.exports = blogsRouter