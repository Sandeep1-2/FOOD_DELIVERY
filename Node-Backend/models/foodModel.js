import mongoose from "mongoose";
// mongoose.connect("mongodb://127.0.0.1:27017/FOODDELIVERYAPP");

const foodSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },

    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    }
})

const foodModel=mongoose.models.food || mongoose.model("food",foodSchema);

export default foodModel