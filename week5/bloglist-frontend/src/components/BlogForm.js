import React from 'react'

const BlogForm = ({ addBlog, newBlog, newAuthor, newUrl, handleBlogChange, handleAuthorChange, handleUrlChange }) => {
    return (
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
}

export default BlogForm