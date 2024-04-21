import ProductModel from "./product.model.js";
export default class ProductController{

    getAllProducts(req,res){
        let products=ProductModel.getAll();
        res.status(200).send(products);
    }

    filterProduct(req,res){
        console.log(req.body);
        const minPrice=req.query.minPrice;
        const maxPrice=req.query.maxPrice;
        const category=req.query.category;

        console.log(minPrice  + maxPrice + category);

     const products= ProductModel.filterByOptions(minPrice,maxPrice,category);
     console.log(products);

     if(!products){
        console.log(req.body);
        
       // res.status(404).send("No product found");
     }else{

        res.status(200).send(products);
     }

    }

    rateProduct(req,res){
        const userId=req.query.userId;
        const productId=req.query.productId;
        const rating=req.query.rating;

        
       const error= ProductModel.rateProduct(userId,productId,rating);
       if(error){
        res.status(400).send(error);
       }else{
        res.status(200).send("Rating has been Added !")
       }

    }

    addProduct(req,res){
        
        const {name,desc,price,sizes,category,imageURL}=req.body; 
          
        console.log(imageURL);     

         const product=ProductModel.addProduct(name,desc,imageURL,category,price,sizes);

        res.status(201).send(product);

    }

    getProduct(req,res){

        const id=req.params.id;
        const product=ProductModel.getProductById(id);

        if(!product){
          //  res.status(404).send("Product Not Found !");
        }else{
            return res.status(200).send(product);
        }

    }
}