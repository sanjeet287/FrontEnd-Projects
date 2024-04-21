import express from 'express';
import CartController from  '../cart/cart.controller.js';


//create router
const cartRouter=express.Router();


const cartController =new CartController();


cartRouter.post("/add",cartController.create);
cartRouter.get("/",cartController.getItems);
cartRouter.delete("/delete/:id",cartController.delete);

export default cartRouter;