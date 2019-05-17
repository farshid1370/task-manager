const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User', {
    firstName: {
        type: String,
        require: true,
        trim: true
    }, lastName: {
        type: String,
        require: true,
        trim: true
    }, age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must positive number')
            }
        },
    },
    email:{
        type:String,
        require:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error ('Email Format uncurrect')
            }
        }
    },
    password:{
        type:String,
        require:true,
        trim:true,
        minlength:8
    }
})
module.exports=User