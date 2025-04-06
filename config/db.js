import mongoose from 'mongoose'

const connectDB = async () =>{
  try{
    await mongoose.connect(`${process.env.MONGO_URL}/${process.env.MONGO_DB_NAME}`)
    console.log(`Connected to database! - ${mongoose.connection.host}`)
  }
  catch (e){
    console.log(`Error establishing connection - ${e}`)
  }
} 

export default connectDB