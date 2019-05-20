const express = require('express')
const Task = require('../models/task')
const router = new express.Router()
const auth = require('../middleware/auth')

router.post('/addTask', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task)

    } catch (err) {
        res.status(400).send(e)
    }
})
router.get('/getAllMyTasks', auth, async (req, res) => {
    try {
        const match = {}
        const sort = {}
        if (req.query.completed) {
            match.completed = req.query.completed === 'true'
        }
        if (req.query.sortBy) {
            const parts = req.query.sortBy.split(':')
            sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
        }
        await req.user.populate(
            {
                path: 'tasks',
                match,
                options: {
                    limit: parseInt(req.query.limit),
                    skip: parseInt(req.query.skip),
                    sort
                }
            }
        ).execPopulate()
        res.send(req.user.tasks)
    } catch (err) {
        res.status(500).send(err)
    }
})
router.get('/getMyTask/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findOne({ _id, owner: req.user._id })

        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    }
    catch (err) {
        res.status(500).send(err)
    }
})
router.patch('/updateTask/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findOneAndUpdate({ _id, owner: req.user._id }, req.body, { new: true, runValidator: true })
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    }
    catch (err) {
        res.status(400).send(err)
    }
})
router.delete('/deleteTask/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findOneAndDelete({ _id, owner: req.user._id })
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    }
    catch (err) {
        res.status(500).send(err)
    }
})


module.exports = router
