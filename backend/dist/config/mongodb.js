import mongoose from "mongoose";
const mongoUri = process.env.MONGODB_URI || 'default-mongodb-uri';
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(mongoUri);
        console.log(`Mongodb connected to :  ${conn.connection.host}`);
    }
    catch (err) {
        console.log(`Error : ${err.message}`);
        process.exit(1);
    }
};
export default connectDB;
//# sourceMappingURL=mongodb.js.map