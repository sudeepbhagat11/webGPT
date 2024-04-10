import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";
const chatSchema = new mongoose.Schema({
    id: {
        type: String,
        default: randomUUID(),
    },
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
    chats: [chatSchema],
});
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
// .pre allows to do something before it is saved in the database.
// save means we want to do something before save i.e save is the action
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) { // if the password is not modified then 
        //  we call next piece of middleware
        next();
    }
    // If modifing the password then encrypting the password before saving it into the database
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});
const User = mongoose.model('User', userSchema);
export default User;
//# sourceMappingURL=userModel.js.map