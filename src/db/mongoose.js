const mongoose = require('mongoose')
mongoose.connect('mongodb://sa:Abc1234$@ds123658.mlab.com:23658/task-manager', {
    useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false
}, (err) => {
    if (err) {
        return console.log('Can not connect to datebase' , err)
    }
    console.log('Connected to database successfuy')
})
