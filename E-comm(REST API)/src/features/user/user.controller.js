import UserModel from './user.model.js';
import jwt from  'jsonwebtoken';

export default class UserController{

    signUp(req,res){

        const {name,email,password,type}=req.body;
        const user=UserModel.signUp(name,email,password,type);
        res.status(201).send(user);

    }

    signIn(req,res){
        const {email,password}=req.body;
        const user=UserModel.signIn(email, password);
        console.log(user);
        if(user==null) {
            return res.status(404).send('Invalid Credentials !');
        }else{
            const token=jwt.sign({userId:user.id,email:user.email},"kFRVkYBVPM9xXrAAAPfNGENZJhMrRccL",{
                expiresIn:'1h'
            });
            res.status(200).send(token);
        }

    }
}