import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import {BadRequestError, UnAuthenticatedError}  from '../errors/index.js';

//using try catch methods & imported express-async-errors packages no need of passing next , this package will take care
// const register =async (req,res,next) => {
//     try {
//         const user = await User.create(req.body);
//         res.status(201).json({ user })
//     }catch(error){
//         // res.status(500).json({msg: 'There was an erron' })
//         next(error)
//         //express has this can pass the error from controller to error handler with the next
//     }
// }

const register =async (req,res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new BadRequestError('please provide all values');
    }

    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      throw new BadRequestError('Email already in use');
    }
        const user = await User.create({ name, email, password });
        const token = user.createJWT();

        res.status(StatusCodes.CREATED).json({ user:{ 
          email: user.email,
          lastName: user.lastName,
          location: user.location,
          name: user.name,
         },
         token,
         location: user.location, })
}

const login =  async (req,res) => {
const {email, password} = req.body;

  if(!email || !password){
    throw new BadRequestError("Please Provide all values")
  }

  //we are adding password to our user object to compare password
const user = await User.findOne({email}).select('+password')

  if(!user){
    throw new UnAuthenticatedError('Invalid Credentials')
  }

  const isPasswordCorrect = await user.comparePassword(password)

  if(!isPasswordCorrect){
    throw new UnAuthenticatedError('Invalid Credentials')
  }

  const token = user.createJWT()

  //we are removing password key from our object for security purpose
  user.password = undefined;

  res.status(StatusCodes.OK).json({ user,token,location:user.location })
}


const updateUser = async (req,res) => {
    res.send('update user');
    user.save();
}


export {register, login, updateUser}