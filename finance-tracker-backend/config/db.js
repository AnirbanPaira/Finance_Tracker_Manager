import mongoose from 'mongoose';

const connectDB = async()=>{
    try{
        const uri = process.env.MONGODB_URI + '/' + process.env.DB_NAME;
        console.log('Connecting to MongoDB at:', uri);
        
        const conn = await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`MongoDB Connected: ${conn.connection?.host}`);
    }catch(error){
        console.error(`Error Connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
}

export { connectDB };