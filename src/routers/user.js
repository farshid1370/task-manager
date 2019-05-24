const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')
const { sendWelcomeEmail, sendCancelationEmail } = require('../emails/account')
router.post('/signUp', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        sendWelcomeEmail(user.email, user.firstName, user.lastName)
        const token = await user.getToken()
        res.status(201).send({ user, token })

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
        res.status(400).send(err)
    }
})

router.get('/profile', auth, async (req, res) => {
    res.send(req.user)
})
router.patch('/update', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    }
    catch (err) {
        res.status(400).send(err)
    }
})
router.delete('/delete', auth, async (req, res) => {
    try {
        await req.user.remove()
        sendCancelationEmail(req.user.email, req.user.firstName, req.user.lastName)
        res.send(req.user)
    }
    catch (err) {
        res.status(500).send(err)
    }
})
router.post('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send(req.user)
    }
    catch (err) {
        res.status(500).send(err)
    }
})
router.post('/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send(req.user)
    }
    catch (err) {
        res.status(500).send(err)
    }
})
const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }

        cb(undefined, true)
    }
})

router.post('/addAvatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})
router.delete('/deleteAvatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})
router.get('/getAvatar', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        if (!user || !user.avatar) {
            throw new Error()
        }
        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch (err) {
        res.status(404).send(err)
    }
})



module.exports = router
