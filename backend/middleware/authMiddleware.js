import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) =>{

    try{
       const token = req.cookies?.token || req.headers["authorization"]?.split(" ")[1];
     
        if(!token){
            return res.status(401).json({message: "Access denied. No token provided."});
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
        
    }catch(err){
        console.log("ERR", err);
        res.status(401).json({ message: "Invalid or expired token." });
    }
}