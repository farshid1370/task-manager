const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const auth=require('../middleware/auth')
router.post('/signUp', async (req, res) => {
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

router.get('/profile',auth, async (req, res) => {
        res.send(req.user)
})
router.patch('/update',auth, async (req, res) => {
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
router.delete('/delete',auth, async (req, res) => {
    try {
       await req.user.remove()
        res.send(req.user)
    }
    catch (err) {
        res.status(500).send(err)
    }
})
router.post('/logout',auth, async (req, res) => {
    try {
       req.user.tokens= req.user.tokens.filter((token)=>{
          return token.token!==req.token
        })
        await req.user.save()
        res.send(req.user)
    }
    catch (err) {
        res.status(500).send(err)
    }
})
router.post('/logoutAll',auth, async (req, res) => {
    try {
       req.user.tokens=[]
        await req.user.save()
        res.send(req.user)
    }
    catch (err) {
        res.status(500).send(err)
    }
})


module.exports = router
