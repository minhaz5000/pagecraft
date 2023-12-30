import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

import {addUser,getUser} from "../controllers/Users.js"

const saltRounds = 10;


export const register = async(req, res, next) => {
  const {handle, email, firstName, lastName, password} = req.body;
  try {
    const hashPassword = bcrypt.hashSync(password, saltRounds);
    const response = await addUser(handle, email, firstName, lastName, hashPassword)

    if(response) return res.json({message: response});

    return res.status(400).json({error :"Invalid entry"});
  } catch (error) {
    console.log(error);
    res.status(400).json({error: error});
  }
}

export const login = async(req, res, next) => {
  if(req.user) {
      console.log(req.user.handle, "already logged in");
      return res.json(req.user);
  }

  const {emailOrHandle, password} = req.body;
  try {
    const user = await getUser(emailOrHandle);
   
    // ERROR: User not found 
    if(user.length === 0) return res.status(401).json({error: "User not found"});

    const match = await bcrypt.compare(password, user[0].password);
    
    // ERROR: Wrong password
    if(!match) return res.status(401).json({error: "Wrong Password"});

    const handle = user[0].handle;

    // Create access token (24 hours)
    const accessToken = jwt.sign({handle}, process.env.ACCESS_TOKEN_SECRET,{
        expiresIn: '1d'
    });

    console.log('Entered Password:', password);
    console.log('Hashed Password in Database:', user[0].password);
    console.log('Password Comparison Result:', match);

    // const refreshToken = jwt.sign({userId, name, email}, process.env.REFRESH_TOKEN_SECRET,{
    //     expiresIn: '1d'
    // });
    //   await Users.update({refresh_token: refreshToken},{
    //       where:{
    //           id: userId
    //       }
    //   });

    // Set cookie (24 hours)
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });

    console.log('Authentication Success');
    return res.json(user[0]);  

  } catch (error) {
    console.log(error);
    return res.status(400).json({error: error});
  }
}

export const verifyToken = async(req, res, next) => {
  const accessToken = req.cookies['access_token'];
  if(accessToken) {
    try {
      const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      const handle = payload.handle;
      const user = await getUser(handle);

      if(user.length != 0) {
          console.log('Token Verified');
          req.user = user[0];
      }
    } catch (error) {
        console.log(error);
    }
  }
  next();
}

export const logout = async(req, res) => {
  let msg;  
  if(req.user) {
    msg = "User logged out successfully.";
    res.clearCookie('access_token');
  } else {
    msg = "No user logged in";
  }
  console.log(msg);
  res.json({
    message: msg
  });
}