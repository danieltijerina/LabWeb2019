const Character = require('../models/character.js')

const createPerson = function (req, res) {
    data = req.body
    Character.create(data, function (err, r) {
        if (err) {
            return res.send(err)
        }
        return res.send('Success')
    })
}

const getPersons = function(req, res) {
    Character.find({}).then(function(chars) {
        return res.send(chars)
    }).catch(function(err) {
        return res.status(500).send(err)
    })
}

const getPerson = function(req, res) {
    _id = req.params.id
    Character.findById(_id).then(function(char) {
        return res.send(char)
    }).catch(function(err) {
        return res.status(404).send(err)
    })
}

const deletePerson = function(req, res) {
    _id = req.params.id
    Character.findByIdAndDelete(_id).then(function(char) {
        if(!char) {
            return res.status(404).send({})
        }
        return res.send(char)
    }).catch(function(err) {
        return res.status(500).send(err)
    })
}

const updatePerson = function(req, res) {
    _id = req.params.id
    data = req.body
    Character.findByIdAndUpdate(_id, {name: data.name, father: data.father, mother: data.mother}).then(function(char) {
        if(!char) {
            res.status(404).send({})
        }
        res.send(char)
    }).catch(function(err) {
        res.status(500).send(err)
    })
}

module.exports = {
    createPerson,
    getPersons,
    getPerson,
    deletePerson,
    updatePerson
}