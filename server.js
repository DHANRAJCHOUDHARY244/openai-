const express=require('express')
const cors=require('cors')
const morgan=require('morgan')
const bodyParser=require('body-parser')
const colors=require('colors')
const dotenv=require('dotenv')
const connectDb=require('./config/db.js')
const port=process.env.PORT || 9080

// routes path
const authRoutes=require('./routes/authRoute.js')
const errorHandler = require('./middlewares/errorMiddleware.js')

// dotenv
dotenv.config() 

// rest object
const app=express()

// mongodb connection
connectDb()

// middlewares
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(morgan('dev'))
app.use(errorHandler)

// api routes
app.use('/api/v1/auth',authRoutes)
app.use("/api/v1/openai", require("./routes/openaiRoutes.js"));

// listen server
app.listen(port,()=>{
    console.log(`server running on port: `.bgYellow, (`${port}`).rainbow);
})