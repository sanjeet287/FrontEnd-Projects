export default class CartItemModel{

    constructor(userId,productId,quantity,id){
        this.productId=productId;
        this.userId=userId;
        this.quantity=quantity;
        this.id=id;
    }

    static addItem(userId,productId,quantity){
        const cartItem=new CartItemModel(userId,productId,quantity,cartItems.length+1);    
        cartItems.push(cartItem);

        return cartItem;
    }

    static get(userId){
        return  cartItems.filter((i)=>i.userId==userId);
       
    }
    static deleteItem(userId,cartItemId){
        const cartItemIndex=cartItems.findIndex((i)=>i.id==cartItemId && i.userId==userId);

        if(cartItemIndex==-1){
            return "Item Not found !"
        }else{
            cartItems.splice(cartItemIndex,1);
            
        }
    }
}

let cartItems=[new CartItemModel(1,1,1,1),
    new CartItemModel(2,2,1,2),];