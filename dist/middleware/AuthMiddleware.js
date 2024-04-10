var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from "jsonwebtoken";
import User from "../src/Model/userModel";
// Protect  Middleware
const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    // Read the Jwt from token
    token = req.cookies.jwt; // the cookie is set and called as jwt in userController.js which is being used here.
    // Here our goal to use asynchandler and calling jwt is to use/parse the cookie that is saved in the 
    // http read only 
    if (token) {
        try {
            // we decode the token to get the user id because when we created the token 
            // we paased the user id as payload
            const JWT_SEC = process.env.JWT_SECTRE || 'default-mongodb-uri';
            const decoded = jwt.verify(token, JWT_SEC);
            req.user = yield User.findById(decoded._userId).select('-password');
            // password is already hashed so subtracting password as it is of no use
            // we added the USER to the user object as req.user
            next(); // to move to the next piece of middleware
        }
        catch (error) {
            console.log(error);
            res.status(401);
            console.log("Not authorized, token failed");
        }
    }
    else {
        res.status(401);
        console.log("Not authorized, no token");
    }
});
export { protect };
//# sourceMappingURL=AuthMiddleware.js.map