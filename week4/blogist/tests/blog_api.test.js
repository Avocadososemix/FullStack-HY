const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('4.8 a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.title)

    expect(contents).toContain(
        'React patterns'
    )
})

test('4.9 blogs are identified with an', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.title)

    expect(contents).toContain(
        'React patterns'
    )
})

test('4.10 a valid blog can be added ', async () => {
    const newBlog = {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(n => n.title)
    expect(titles).toContain(
        'React patterns'
    )
})

test('blog without title is not added', async () => {
    const newBlog = {
        author: 'Mister Cake'
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('3.9 a specific blog can be viewed using the id', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]
    expect(blogToView.id).toBeDefined()

    const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

    expect(resultBlog.body.id).toEqual(blogToView.id)
    expect(resultBlog.body).toEqual(processedBlogToView)
})

test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
        helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
})

test('4.11 blog without likes receives 0 likes', async () => {
    const newBlog = {
        title: 'React magic patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const title = blogsAtEnd.map(n => n.title)
    expect(title).toContain(
        'React magic patterns'
    )

    const likes = blogsAtEnd.map(n => n.likes)
    expect(likes).toContain(
        0
    )
})

test('4.12 adding blog without title or url fails', async () => {
    
    const user = helper.initialBlogs[0]
    const newBlog = [{
        author: 'Michael Chan',
        likes: 3,
        userID: user._id
    }, {
        title: 'Some title',
        author: 'Michael Chan',
        likes: 3,
        userID: user._id
    }, {
        author: 'Michael Chan',
        url: 'www.testurl.com',
        likes: 3,
        userID: user._id
    }
    ]

    await api
        .post('/api/blogs')
        .send(newBlog[0])
        .expect(400)

    await api
        .post('/api/blogs')
        .send(newBlog[1])
        .expect(400)

    await api
        .post('/api/blogs')
        .send(newBlog[2])
        .expect(400)

})

afterAll(() => {
    mongoose.connection.close()
})