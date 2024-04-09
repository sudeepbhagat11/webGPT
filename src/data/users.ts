import bcrypt from "bcrypt";

const users = [
    {
        name : "Admin Users",
        email : "admin@gmail.com",
        password : bcrypt.hashSync('123456',10),
        isAdmin : true,
    },

    {
        name : "Sumit Bhagat",
        email : "sumit@gmail.com",
        password : bcrypt.hashSync('12345678',10),
        isAdmin : false,
    },

    {
        name : "Sudeep Bhagat",
        email : "sudeep@gmail.com",
        password : bcrypt.hashSync('12345678',10),
        isAdmin : false,
    }

];

export default users;