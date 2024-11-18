import mongoose from "mongoose";


const connectDB = async ()=>{


    mongoose.connection.on('connected',()=>{

        console.log("DB CONNECTEd")
    })
    await mongoose.connect(`${process.env.MONGODB_URI}/bgg-removal`)
}

export default connectDB