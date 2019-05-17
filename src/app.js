require('./db/mongoose')
const express=require('express')
const userRoute=require('./routers/user')
const taskRoute=require('./models/task')

const app=express()
const port=process.env.PORT ||3000

app.use(express.json())
app.use(userRoute)
app.use(taskRoute)


app.listen(port,()=>{
    console.log('Server is up on port '+port)
})