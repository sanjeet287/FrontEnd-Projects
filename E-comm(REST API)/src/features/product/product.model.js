import UserModel from "../user/user.model.js";

export default class ProductModel{

    constructor(id,name,desc,imageURL,category,price,sizes){
        this.id=id;
        this.name=name;
        this.desc=desc;
        this.imageURL=imageURL;
        this.category=category;
        this.price=price;
        this.sizes=sizes;
    }

    static getAll(){
        return products;
    }

    static addProduct(name,desc,imageURL,category,price,sizes){
        const newProduct=new  ProductModel(products.length+1,name,desc,imageURL,category,price,sizes);
        products.push(newProduct);       
        return newProduct;
    }

   static getProductById(id){
        const product=products.find((product)=>product.id==id);
        return product;
    }

    static filterByOptions(minPrice,maxPrice,category){
        const result=products.filter((product)=>{

           return ( 
              (!minPrice || product.price>=minPrice) && 
              (!maxPrice || product.price<= maxPrice)&&
              (!category || product.category==category)
           );
        });


        return result;
    }

    static rateProduct(userId,productId,rating){

        //validate the user
        const user=UserModel.getAllUsers().find((user)=>user.id==userId);
        if(!user){
            return {
                "success": false,
                "msg": "user not found"
              };
        }
        
        //validate the product
        const product=products.find((product)=>product.id==productId);

        if(!product){
            return {
                "success": false,
                "msg": "product not found"
              };
        }

          // Validate the rating
        if (rating < 0 || rating > 5) {
              return {
                "success": false,
                  "msg": "rating should be between 0 and 5"
                     };
        }

        //check if product has no rating then add new rating
        if(!product.rating){
            
            product.ratings=[];
            product.ratings.push({UserId:userId,rating:rating,});
        }else{

            //check if existing user has already rated
            const existingRatingIndex=product.ratings.find((rating)=>rating.UserId==userId);
            if(existingRatingIndex>=0){
                //update the rating
                product.ratings[existingRatingIndex]={userId:userId,rating:rating};
            }else{
                //add new rating
                product.ratings.push({userId:userId,rating:rating});

            }
        }

        return products;
    }
}

var products=[
    new ProductModel("1",
    "T-Shirt",
     "This is a Tshirt with black color and white logo on it.", 
     "https://m.media-amazon.com/images/I/317Jvwy8toL.jpg",
     "Clothing",
     247,
     ['S','M','L'] ),
    
     new ProductModel("2",
    "Jeans" ,
    "These are the best jeans",  
    "https://m.media-amazon.com/images/I/618XjDOM0sL._SX679_.jpg",  
    "Clothing",
    657,    
    ["S","M","XL"] ),

    new ProductModel(3,
        "OnePlus EarPhone",
        "This is OnePlus Earphones ",
        "https://m.media-amazon.com/images/I/5171kgKguGL._SX569_.jpg",
        "Audio",
         2000,
        ["S","M","L"] ),
     
];