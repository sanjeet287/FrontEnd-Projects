import express from 'express';
import {upload } from "../../middlewares/fileupload.middleware.js";
import ProductController from  '../product/product.controller.js';
//C:\Users\SANJEET KUMAR\OneDrive\Desktop\Projects\E-comm(REST API)\src\middlewares\fileupload.middleware.js

//create router
const ProductRouter=express.Router();


const productController =new ProductController();



ProductRouter.get("/",productController.getAllProducts);
//ProductRouter.get("/:id",productController.getProduct);
ProductRouter.get("/filter",productController.filterProduct);

ProductRouter.post("/rate",productController.rateProduct);
ProductRouter.post("/add",upload.single('imageURL'),productController.addProduct);

export default ProductRouter;