const jwt = require("jsonwebtoken");
const TokenBlacklistModel = require("../models/blacklist.model")

async function authUser(req,res,next){
    console.log("Auth middleware entered");

    const token = req.cookies.token;
    if(!token) {
        console.log("Auth failed: no token");
        return res.status(401).json({message: "token not provided yet"});
    }
    const isTokenBlacklisted = await TokenBlacklistModel.findOne({token});
    if(isTokenBlacklisted) {
        console.log("Auth failed: blacklisted token");
        return res.status(401).json({message:"Token invalid"});
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        console.log("Auth success");
        next();
    }catch(err){
        console.log("Auth failed:", err.message);
        return res.status(401).json({message: "token invalid"});
    }

}
module.exports = {authUser}