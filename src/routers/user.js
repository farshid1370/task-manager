const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const auth=require('../middleware/auth')
router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token=await user.getToken()
        res.status(201).send({user,token})

    } catch (err) {
        res.status(400).send(err)
    }
})
router.post('/login', async (req, res) => {
    try {
        const user = await User.findUserByEmail(req.body.email, req.body.password)
        const token = await user.getToken()
        res.send({ user, token })
    }
    catch (err) {
        res.status(401).send(err)
        console.log(err)
    }
})
router.get('/users',auth, async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (err) {
        res.status(500).send(err)
    }
})
router.get('/users/:id',auth, async (req, res) => {
    const _id = req.params.id
    try {
        if (!user) {
            return res.status(404).send()
        }
        const user = await User.findById(_id)
        res.send(user)
    }
    catch (err) {
        res.status(500).send(err)
    }
})
router.patch('/users/:id',auth, async (req, res) => {
    const _id = req.params.id
    const updates = Object.keys(req.body)
    try {
        const user = await User.findById(_id)
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    }
    catch (err) {
        res.status(400).send(err)
    }
})
router.delete('/users/:id',auth, async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findByIdAndDelete(_id)
        if (!user) {
            res.status(404).send()
        }
        res.send(user)
    }
    catch (err) {
        res.status(500).send(err)
    }
})


module.exports = router
