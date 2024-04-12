import jwt from "jsonwebtoken";
export const generateToken = (id, email, expiresIn) => {
    var _a;
    const secretKey = (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : "defaultSecret";
    const payload = { id, email };
    const token = jwt.sign(payload, secretKey, {
        expiresIn,
    });
    return token;
};
export const verifyToken = (req, res, next) => {
    var _a;
    const secretKey = (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : "defaultSecret";
    const token = req.signedCookies[`jwt`];
    if (!token || token.trim() === "") {
        return res.status(401).json({ message: "Token Not Received" });
    }
    return new Promise((resolve, reject) => {
        //@ts-ignore
        return jwt.verify(token, secretKey, (err, success) => {
            if (err) {
                reject(err.message);
                return res.status(401).json({ message: "Token Expired" });
            }
            else {
                resolve();
                res.locals.jwtData = success;
                return next();
            }
        });
    });
};
//# sourceMappingURL=generateToken.js.map