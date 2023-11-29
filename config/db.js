const mongoose=require('mongoose')
const color=require('colors')

const connectDb=async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log(`Connected to MongoDb ${mongoose.connection.host}`.bgGreen.white);
    } catch (error) {
        console.log(`Mongodb Database Error ${error}`.bgRed.white);
    }
}

module.exports=connectDb