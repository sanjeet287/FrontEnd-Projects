import CartItemModel from "./cart.model.js";
export default class CartController{

    create(req,res){
        const {productId,quantity}=req.query;
        const userId=req.userId;
        console.log("userId"+userId+"productid "+productId+"quantity ="+quantity);

        const item=CartItemModel.addItem(userId,productId,quantity);
        if(item){
        res.status(201).send("Item has been Added !");
        }else{
            res.status(404).send("item not found !")
        }

    }

    getItems(req,res){
        const userId=req.userId;
       const items= CartItemModel.get(userId);
       return res.status(200).send(items);
    }

    delete(req,res){
        const userId=req.userId;
        const cartItemId=req.params.id;
        const error=CartItemModel.deleteItem(userId,cartItemId);
        if(error){
            res.status(404).send("item not found !");
        }else{
            res.status(200).send("item has been deleted !");
        }
    }
}