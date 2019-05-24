require('./db/mongoose')
const express=require('express')
const userRoute=require('./routers/user')
const taskRoute=require('./routers/task')

const app=express()
app.use(express.json())
app.use('/user',userRoute)
app.use('/task',taskRoute)
app.get('*',(req,res)=>{
    res.status(404).send({error:'Route not found'})
})

module.exports =app