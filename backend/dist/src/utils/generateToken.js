import jwt from "jsonwebtoken";
const generateToken = (res, userId) => {
    var _a;
    const secretKey = (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : "defaultSecret";
    const token = jwt.sign({ userId }, secretKey, {
        expiresIn: '30d'
    });
    res.clearCookie('jwt', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
    });
    // Set JWT as HTTP-Only cookie
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30days represented in ms
    });
};
export default generateToken;
//# sourceMappingURL=generateToken.js.map