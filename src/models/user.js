const mongoose = require('mongoose')
const validator = require('validator')
const bcrype = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task=require('./task')
const userSchema = new mongoose.Schema({
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
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email Format uncurrect')
            }
        }
    },
    password: {
        type: String,
        require: true,
        trim: true,
        minlength: 8
    },
    tokens: [
        {
            token: {
                type: String,
                require: true
            }
        }
    ]
})
userSchema.virtual('tasks',{
    ref:'Task',
    localField:'_id',
    foreignField:'owner'
})
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    delete userObject.tokens
    delete userObject.password
    return userObject
}
userSchema.statics.findUserByEmail = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('Email or password incurrect !')
    }
    const isMatch = await bcrype.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Email or password incurrect !')
    }
    return user
}
userSchema.methods.getToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id }, 'Hele dan dan dan hele ye dane', { expiresIn: '7 days' })
    user.tokens = user.tokens.concat({ token })
    user.save()
    return token
}


userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrype.hash(user.password, 8)
    }
    next()
})
userSchema.pre('remove',async function(next){
    const user = this
    Task.deleteMany({owner:user._id})
})
const User = mongoose.model('User', userSchema)
module.exports = User