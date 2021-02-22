const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3
    },
    author: String,
    url: String,
    likes: Number
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Blog', blogSchema)

// const mongoose = require('mongoose')
// const uniqueValidator = require('mongoose-unique-validator')
// const config = require('./../utils/config')

// console.log(`Server running on port ${config.PORT}`)

// const url = config.MONGODB_URI
// console.log(url)

// console.log('connecting to', url)
// mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
//     .then(result => {
//         console.log('connected to MongoDB')
//     })
//     .catch((error) => {
//         console.log('error connecting to MongoDB:', error.message)
//     })

// const blogSchema = mongoose.Schema({
//     title: String,
//     author: String,
//     url: String,
//     likes: Number
// })

// blogSchema.plugin(uniqueValidator)


// blogSchema.set('toJSON', {
//     transform: (document, returnedObject) => {
//         returnedObject.id = returnedObject._id.toString()
//         delete returnedObject._id
//         delete returnedObject.__v
//     }
// })

// module.exports = mongoose.model('Blog', blogSchema)