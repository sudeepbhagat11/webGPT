import { Request,Response, NextFunction } from "express";
import  jwt  from "jsonwebtoken";
import User from "../src/Model/userModel";




// Protect  Middleware

const protect = async(req:Request,res:Response,next:NextFunction) => {
    let token;

    // Read the Jwt from token

    token = req.cookies.jwt; // the cookie is set and called as jwt in userController.js which is being used here.
    // Here our goal to use asynchandler and calling jwt is to use/parse the cookie that is saved in the 
    // http read only 

    if(token){
        try {
            // we decode the token to get the user id because when we created the token 
            // we paased the user id as payload
            const JWT_SEC = process.env.JWT_SECTRE || 'default-mongodb-uri';
            const decoded = jwt.verify(token,JWT_SEC)as { _userId: string };
            req.user = await User.findById(decoded._userId).select('-password');
            // password is already hashed so subtracting password as it is of no use
            // we added the USER to the user object as req.user

            next(); // to move to the next piece of middleware

            
        } catch (error) {
            console.log(error);
            res.status(401);
            console.log("Not authorized, token failed");
            
        }

    }
    else{
        res.status(401);
        console.log("Not authorized, no token");
    }
}






export {protect};