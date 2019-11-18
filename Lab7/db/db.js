const mongoose = require('mongoose')
const connectionURL = "mongodb+srv://m001-student:m001-mongodb-basics@cluster0-l4pp1.mongodb.net/labWeb?retryWrites=true&w=majority"

mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true
})