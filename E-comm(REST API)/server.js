import  express from 'express';
import swagger from 'swagger-ui-express';
import swaggerDocument from './swagger.json' assert{type:'json'};
import cors from 'cors';

import bodyParser from 'body-parser';
import  ProductRouter from './src/features/product/product.routes.js';
import  userRouter from './src/features/user/user.routes.js';
import  cartRouter from './src/features/cart/cart.routes.js';
import jwtAuth from './src/middlewares/jwtAuth.middleware.js';


//create server
const server=express();

server.use(bodyParser.json());

//CORS Policy configuration w/o library

// server.use((req,res,next)=>{
//     res.setHeader("Access-Control-Allow-Origin","*");
//     res.setHeader("Access-Control-Allow-Methods","GET,POST,PUT,DELETE,PATCH");
//     res.setHeader("Access-Control-Allow-Headers","Content-Type,Authorization");
//     if(req.method=='OPTIONS'){
//         return res.sendStatus(200);
//     }

//     next();
// });


//we can create origin to which it is allowed or accessible  || allowed headers
var corsOption={
    origin:'http://localhost:4200',
    optionSuccessStatus:200
}

//CORS configuration  using library & then we can pass this to cors(corsOption) 
server.use(cors());



//get API docs in Swagger-UI
server.use('/api-docs',swagger.serve,swagger.setup(swaggerDocument));

//default path
server.use("/api/products",jwtAuth,ProductRouter);
server.use("/api/users",userRouter);
server.use("/api/cartItems/",jwtAuth,cartRouter);

//handling 404 eror
server.use((req,res)=>{
    res.status(404).send("API not Found. Please check our documentation on http://localhost:3000/api-docs")
})

//default welcome api
server.get('/',(req,res)=>{
   res.send('Welcome to E-commerce APIs');
} );

//specify the port 
server.listen(3000,()=>{
    console.log("Server is running at port 3000");
});

