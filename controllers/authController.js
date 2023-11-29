const userModel = require('../models/userModel.js')
const errorResponse = require('../utils/errorResponse.js')

exports.sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken(res)
    res.status(statusCode).json({
        success: true,
        token
    })
}

exports.registerController = async (req, res, next) => {
    try {
        const { username, email, password } = req.body
        // existing user
        const existingEmail = await userModel.findOne({ email })
        if (existingEmail) {
            return next(new errorResponse('Email is already register', 500))
        }
        const user = await userModel.create({ username, email, password })
        this.sendToken(user, 201, res)
    } catch (error) {
        console.log(error);
        next(error)
    }
};

exports.loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body
        // validation
        if (!email || !password) {
            return next(new errorResponse('Please Provide email or password'))
        }
        const user = await userModel.findOne({ email })
        if (!user) {
            return next(new errorResponse('Invalid Creditial', 401))
        }
        const isMatch = await user.matchPassword(password)
        if (!isMatch) {
            return next(new errorResponse('Invalid Creditial', 401))
        }
        // res
        this.sendToken(user, 200, res )
    } catch (error) {
        console.log(error);
        next(error)
    }
}

exports.logoutConroller = async (req, res) => {
    res.clearCookie('refreshToken')
    return res.status(200).json({
        success:true,
        message:'Logout Successfully'
    })
 }