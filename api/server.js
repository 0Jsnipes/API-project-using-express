// BUILD YOUR SERVER HERE
const express = require('express')
const User = require('./users/model')

const server = express()
server.use(express.json())

server.get('/api/users', async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
        
    } catch(err){
      res.status(500).json({message: `Error fetching users: ${err.message}`})

    }
})
server.get('/api/users/:id', async (req,res) => {
    try {
        const {id }= req.params
        const findUser = await User.findById(id)
        if(!User){
            res.status(404).json({message: "The user with the specified ID does not exist"})
        } else {
    
        res.status(200).json(findUser)
        }
    } catch(err) {
        res.status(500).json({  message: "The user information could not be retrieved"})
    }
})
// [GET]    /api/dogs/:id (R of CRUD, fetch dog by :id)
server.post('/api/users', async (req,res) => {
    try {
        const { name, bio }= req.body
        const createUser = await User.insert({name, bio})
        res.status(201).json({
            message: 'success creating dog',
            data: createUser
        })}
     catch(err) {
        res.status(500).json({ message: `Error creating ${req.params.name}: ${err.message}`})
    }
})
// [POST]   /api/dogs     (C of CRUD, create new dog from JSON payload)
server.put('/api/users/:id', async (req,res) => {
    try {
        const { id }= req.params
        const {name, bio }= req.body
        if (!name || !bio){
            res.status(422).json({
                message: "dogs need name and weight"
            })
        } else {
        const updateUser = await User.update(id, {name, bio})
        if(!updateUser){
            res.status(404).json({
                message: `dog ${id} not found, sorry`
            })
        } else {
        res.status(200).json({
            message: 'success updating dog',
            data: updateUser
        })
    }
    }
    } catch(err) {
        res.status(500).json({ message: `Error updating ${req.params.name}: ${err.message}`})
    }
})
// [PUT]    /api/dogs/:id (U of CRUD, update dog with :id using JSON payload)
server.delete('/api/users/:id', async (req,res) => {
    try {
        const { id }= req.params
        const deleteUser = await User.remove({id})
        if(!deleteUser){
            res.status(404).json({
               message: "The user with the specified ID does not exist" 
            })
        }else {
        res.status(200).json({
            deleteUser
        })
    }
    } catch(err) {
        res.status(500).json({ message: "The user could not be removed"})
    }
})


module.exports = server; // EXPORT YOUR SERVER instead of {}
