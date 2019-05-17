const express = require('express')
const User = require('../models/user')
const router = new express.Router()

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)

    } catch (err) {
        res.status(400).send(err)
    }
})
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (err) {
        res.status(500).send(err)
    }
})
router.get('/users/:id', async (req, res) => {
    const _id = req.params._id
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
router.patch('/users:/id', async (req, res) => {
    const _id = req.params._id
    try {
        const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidator: true })
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    }
    catch (err) {
        res.status(400).send(err)
    }
})
router.delete('/users/:id', async (seq, res) => {
    const _id = req.params._id
    try {
        const user = await User.findByIdAndDelete(_id)
        if (!user) {
            res.status(404).send()
        }
    }
    catch (err) {
        res.status(500).send()
    }
})


module.exports=router
