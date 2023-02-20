import express from 'express';
import connectDB from './db/connect.js';

import errorHandlerMiddleware from './middleware/error-handler.js';
import notFoundMiddleware from './middleware/not-found.js';
import dotenv from 'dotenv';

const app = express();

dotenv.config()

app.get('/',(req,res) =>{
    throw new Error('error');
    res.send('welcome!')
})

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

// app.listen(port, () =>{
//     console.log(`server is listening on ${port}...`)
// })

// mongoose connect method returns a promise therefore in server setup async
const start = async () => {
    try {
      await connectDB(process.env.MONGO_URL);
      app.listen(port, () => {
        console.log(`Server is listening on port ${port}...`);
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  start();