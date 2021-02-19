const dummy = (blogs) => {
    blogs = 1
    return blogs
}

const totalLikes = (blogs) => {

    if (blogs === undefined || blogs.length === 0) {
        return 0
    } else {
        let total = 0
        for (let i = 0; i < blogs.length; i++) {
            total += blogs[i].likes
        }
        return total
    }
}

const favoriteBlog = (blogs) => {

    if (blogs === undefined || blogs.length === 0) {
        return null
    } else {
        let favorite = { likes: 0 }
        for (let i = 0; i < blogs.length; i++) {
            if (blogs[i].likes > favorite.likes) {
                favorite = blogs[i]
            }
        }
        return favorite
    }
}

const mostBlogs = (blogs) => {
    let authorsMap = new Map()
    if (blogs === undefined || blogs.length === 0) {
        return null
    } else {
        for (let i = 0; i < blogs.length; i++) {
            if (!authorsMap.has(blogs[i].author)) {
                authorsMap.set(blogs[i].author, 1)
            } else {
                authorsMap.set(blogs[i].author, authorsMap.get(blogs[i].author) + 1)
            }
        }
    }
    const winner = ([...authorsMap.entries()].reduce((a, e) => e[1] > a[1] ? e : a))
    return { author: winner[0], blogs: winner[1] }
}

const mostLikes = (blogs) => {
    let authorsMap = new Map()
    if (blogs === undefined || blogs.length === 0) {
        return null
    } else {
        for (let i = 0; i < blogs.length; i++) {
            if (!authorsMap.has(blogs[i].author)) {
                authorsMap.set(blogs[i].author, blogs[i].likes)
            } else {
                authorsMap.set(blogs[i].author, authorsMap.get(blogs[i].author) + blogs[i].likes)
            }
        }
    }
    const winner = ([...authorsMap.entries()].reduce((a, e) => e[1] > a[1] ? e : a))
    return { author: winner[0], likes: winner[1] }
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}