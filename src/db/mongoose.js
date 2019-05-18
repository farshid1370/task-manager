const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/task-manager', {
    useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false
}, (err) => {
    if (err) {
        return console.log('Can not connect to datebase' , err)
    }
    console.log('Connected to database successfuy')
})
