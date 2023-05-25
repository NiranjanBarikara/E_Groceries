const mongoose = require("mongoose");
const { Schema} = mongoose;

const ProductSchema = new Schema({
   
    ProductName: {
        type:String,
        required:true
    },
    Image: {
        type:String,
        required:true
    },

    Price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    Quantity:{
        type:Number,
        required:true
    }

   
  
});

 module.exports= mongoose.model('product',ProductSchema);
