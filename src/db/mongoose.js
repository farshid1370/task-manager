const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false
}, (err) => {
    if (err) {
        return console.log('Can not connect to datebase' , err)
    }
    console.log('Connected to database successfuy')
})
