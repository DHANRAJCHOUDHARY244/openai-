const express=require('express')
const { registerController, loginController, logoutConroller } = require('../controllers/authController')

// router
const router=express.Router()

// register
router.post('/register',registerController)

// login
router.post('/login',loginController)

// logout
router.post('/logout',logoutConroller)

module.exports=router