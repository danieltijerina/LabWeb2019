const mongoose = require('mongoose')

const characterSchema = mongoose.Schema({
    name: {
        type: String
    },
    age: {
        type: Number
    },
    born: {
        type: String
    },
    timeline: {
        type: String
    },
    allegiance: [{
        type: String
    }],
    playedBy: {
        type: String
    }, 
    titles: [{
        type: String
    }],
    father: {
        type: String
    },
    mother: {
        type: String
    },
    spouse: {
        type: String
    }
})

const Character = mongoose.model('Character', characterSchema)

module.exports = Character