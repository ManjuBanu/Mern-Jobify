import mongoose from 'mongoose';

// mongoose connect method returns a promise therefore in server setup async
mongoose.set('strictQuery', false);


const connectDB = (url) =>{
    return mongoose.connect(url)
}


// const connectionString = 'mongodb+srv://manjubanu0823:<password>@mernprojects.atfir4q.mongodb.net/?retryWrites=true&w=majority';

export default connectDB;