const express = require('express')
const Task = require('../models/task')
const router = new express.Router()

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)
    try {
        await Task.save()
        res.status(201).send(task)

    } catch (err) {
        res.status(400).send(e)
    }
})
router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (err) {
        res.status(500).send(err)
    }
})
router.get('/tasks/:id', async (req, res) => {
    const _id = req.params._id
    try {
        if (!task) {
            return res.status(404).send()
        }
        const task = await Task.findById(_id)
        res.send(task)
    }
    catch (err) {
        res.status(500).send(err)
    }
})
router.patch('/tasks:/id', async (req, res) => {
    const _id = req.params._id
    try {
        const task = await Task.findByIdAndUpdate(_id, req.body, { new: true, runValidator: true })
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    }
    catch (err) {
        res.status(400).send(err)
    }
})
router.delete('/tasks/:id', async (seq, res) => {
    const _id = req.params._id
    try {
        const task = await Task.findByIdAndDelete(_id)
        if (!task) {
            res.status(404).send()
        }
    }
    catch (err) {
        res.status(500).send()
    }
})


module.exports=router
