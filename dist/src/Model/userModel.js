var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose from "mongoose";
import bcrypt from "bcrypt";
const chatSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    }
});
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    chats: [chatSchema]
});
userSchema.methods.matchPassword = function (enteredPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt.compare(enteredPassword, this.password);
    });
};
// .pre allows to do something before it is saved in the database.
// save means we want to do something before save i.e save is the action
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified('password')) { // if the password is not modified then 
            //  we call next piece of middleware
            next();
        }
        // If modifing the password then encrypting the password before saving it into the database
        const salt = yield bcrypt.genSalt(10);
        this.password = yield bcrypt.hash(this.password, salt);
    });
});
const User = mongoose.model('User', userSchema);
export default User;
//# sourceMappingURL=userModel.js.map