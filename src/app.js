require('./db/mongoose')
const express=require('express')
const userRoute=require('./routers/user')
const taskRoute=require('./models/task')

const app=express()
const port=process.env.PORT ||3000

app.use(express.json())
app.use('/user',userRoute)
app.use('/task',taskRoute)
app.get('*',(req,res)=>{
    res.status(404).send({error:'Route not found'})
})

app.listen(port,()=>{
    console.log('Server is up on port '+port)
})