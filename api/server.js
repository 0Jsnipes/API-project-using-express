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
        if(!findUser){
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
        const user= req.body
        if(!user.name || !user.bio){
            res.status(400).json({ message: "Please provide name and bio for the user" })
        }else {
            User.insert(user)
            .then(createUser => {
                res.status(201).json(createUser)
            }) 
        }
    }
     catch(err) {
        res.status(500).json({ message: "There was an error while saving the user to the database" })
    }
})
// [POST]   /api/dogs     (C of CRUD, create new dog from JSON payload)
server.put('/api/users/:id', async (req,res) => {
    try {
        const { id }= req.params
        const {name, bio }= req.body
        if (!name || !bio){
            res.status(400).json({
                message:  "Please provide name and bio for the user"
            })
        } else {
        const updateUser = await User.update(id, {name, bio})
        if(!updateUser){
            res.status(404).json({
                message:"The user with the specified ID does not exist"
            })
        } else{
        res.status(200).json(updateUser)
    }
    }
    } catch(err) {
        res.status(500).json({ message:  "The user information could not be modified"})
    }
})
// [PUT]    /api/dogs/:id (U of CRUD, update dog with :id using JSON payload)
server.delete('/api/users/:id', async (req,res) => {
    try {
        const deleteUser = await User.findById(req.params.id)
        if(!deleteUser){
            res.status(404).json({
               message: "The user with the specified ID does not exist" 
            })
        }else {
            const deletedUser =await User.remove(deleteUser.id)
        res.status(200).json(deletedUser)
    }
    } catch(err) {
        res.status(500).json({ message: "The user could not be removed"})
    }
})


module.exports = server; // EXPORT YOUR SERVER instead of {}
