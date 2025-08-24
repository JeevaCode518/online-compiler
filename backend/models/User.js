import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        default: null,
        required: true,
    },
    lastName:{
        type:String,
        default: null,
        required: true,
    },
    email:{
        type:String,
        default: null,
        required: true,
        unique:true,
    },
    password:{
        type:String,
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"], // only two roles
        default: "user", // new users are normal users
    },

});

const User = mongoose.model("user", userSchema);
export default User;