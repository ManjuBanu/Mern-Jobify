// import cors from 'cors';
import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config()
import 'express-async-errors';
import morgan from 'morgan';

// db and authenticateUser
import connectDB from './db/connect.js';

// routers
import authRouter from './routes/authRoutes.js';
import jobsRouter from './routes/jobsRoutes.js';

// middleware
import errorHandlerMiddleware from './middleware/error-handler.js';
import notFoundMiddleware from './middleware/not-found.js';

if(process.env.NODE_ENV !== 'production'){
  app.use(morgan('dev'))
}

// app.use(cors());
app.use(express.json());

app.get('/',(req,res) =>{
    // throw new Error('error');
    res.send({msg: 'welcome!'})
})
app.get('/api/v1',(req,res) =>{
  // throw new Error('error');
  res.send({msg: 'API welcome!'})
})

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', jobsRouter);


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