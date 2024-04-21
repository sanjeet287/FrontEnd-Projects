import UserModel from "../features/user/user.model.js";
const basicAuthorize=(req,res,next)=>{

    //check if authorization  header exists
    const authHeader= req.header('authorization');
    
    if(!authHeader){
        res.status(401).send("No Authoriztion details found !");
    }

    console.log(authHeader);

    //Extract Credentials
    const base64Credentials=authHeader.replace("Basic ","");
    console.log(base64Credentials);    

    //Decode the credentials
    let decodeCredentials = Buffer.from(base64Credentials,'base64').toString('utf8');
    console.log("decode :"+decodeCredentials.toString());

    let [username,password]=decodeCredentials.split(":");    //username and password
    console.log(username +password);

    //check credentials
    const user=UserModel.getAllUsers().find((user) =>{return user.email==username && user.password == password});    
    console.log(UserModel.getAllUsers());
    
    if (!user) {
        return res.status(401).send("Incorrect Credentials !");
    }
        next();
    

}

export default basicAuthorize;