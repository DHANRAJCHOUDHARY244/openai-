const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookie = require('cookie')
// models
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'UserName is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minlength: [6, 'password length should be 6 char long']
    },
    customerId: {
        type: String,
        default: ''
    },
    subscription: {
        type: String,
        default: ''
    }
})

// hash password
userSchema.pre('save', async function (next) {
    // update
    if (!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

// match password
userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}
// sign token
userSchema.methods.getSignedToken = function (res) {
    const accessToken = jwt.sign({ id: this._id }, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.JWT_ACCESS_EXPIRE })
    const refreshToken = jwt.sign({ id: this._id }, process.env.JWT_REFRESH_TOKEN, { expiresIn: process.env.JWT_REFRESH_EXPIREIN })
    res.cookie('refreshToken', `${refreshToken}`, { maxAge: 86400 * 7000, httpOnly: true })
}

const User = mongoose.model('user', userSchema)

module.exports = User