import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookieParser from "cookie-parser";

export const register = async (request, response) =>{
        
    try{
    
        console.log('BODY:', request.body);

        const {firstName, lastName, email, password} = request.body;
        
        if(!(firstName && lastName && email && password)){
            response.status(400).send("Please enter all the information");
        }

        const isExistingUser = await User.findOne({email});
        if(isExistingUser){
            return response.status(400).send("User Already Exists with the same email!!!");
        }

        var hashedPassword = await bcrypt.hash(password, 2);

        const user = await User.create({
            firstName,
            lastName,
            email,
            password : hashedPassword
        });

        console.log("S " , process.env.SECRET_KEY);

        const token = jwt.sign({id:user._id, email}, process.env.SECRET_KEY, {
            expiresIn : '1h'
        });

        user.token = token;
        user.password = undefined;
        response.status(200).json({message: "You have successfully Registered!!!", user});
    
    } catch (error) {
        response.status(400).json({message:"Internal server error while registering!!" + error});
    }
}

    export const login = async (request, response) => {
    try {
        const { email, password } = request.body;
        console.log(request.body);

        const user = await User.findOne({ email });

        if (!user) {
        return response
            .status(400)
            .send("You don't have a registered User with this email, Please register!!");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
        return response.status(400).send("Invalid password");
        }

        const token = jwt.sign({ id: user._id, email }, process.env.SECRET_KEY, {
        expiresIn: "1h",
        });

        response.cookie("token", token, {
        httpOnly: true, // prevents JavaScript access
        secure: process.env.NODE_ENV === "production", // HTTPS only in prod
        sameSite: "strict", // prevents CSRF
        maxAge: 60 * 60 * 1000, // 1 hour
        });

        user.token = token;
        user.password = undefined;

        return response.status(200).json({
        message: "You have successfully logged in!",
        user,
        });
    } catch (error) {
        response
        .status(500)
        .json({ message: "Internal server error while logging In!! " + error });
    }
    };


    export const logout = async (req, res) =>{
        res.clearCookie("token");
        return res.status(200).json({ message: "Logged out successfully" });
    };
