import React, { useState } from 'react'
const Blog = ({ blog, likeBlog }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 2,
        marginBottom: 5
    }

    const [fullStyle, setFullStyle] = useState(false)

    if (!fullStyle) {
        return (
            <div style={blogStyle}>
                {blog.title}
                <button onClick={() => setFullStyle(true)}>view</button>
            </div>
        )
    }

    return (
        <div style={blogStyle}>
            {blog.title}
            <button onClick={() => setFullStyle(false)}>hide</button>
            <br></br>{blog.url}
            <br></br>{blog.likes}
            <button onClick={() => likeBlog(blog)}>like</button>
            <br></br>{blog.author}
        </div>
    )
}

export default Blog