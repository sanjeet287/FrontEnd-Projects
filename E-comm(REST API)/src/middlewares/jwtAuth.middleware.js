import jwt from'jsonwebtoken';
const jwtAuth=(req,res,next)=>{

    //fetching header
    const token=req.headers['authorization']; 

    console.log(token);

    //if no token return error
    if(!token){
        return res.status(401).send("UnAuthorized !");
    }

    //verify the token
    try {
        const payload=jwt.verify(token,"kFRVkYBVPM9xXrAAAPfNGENZJhMrRccL");
        req.userId=payload.userId;
        console.log(payload);
    } catch (error) {
       return  res.status(401).send("Invalid token !");
    }

    next();
}

export default jwtAuth;