import foodModel from "../models/foodModel.js";
import fs from 'fs'
import path from "path";
import { uploadsDirectory } from "../config/paths.js";


// add food item

const addFood=async (req,res)=>{
        const image_filename=`${req.file.filename}`;

        const food = new foodModel({
            name:req.body.name,
            description:req.body.description,
            price:req.body.price,
            category:req.body.category,
            image:image_filename,
        })
        try {
            await food.save();
            res.json({success:true,message:"Food Added"})
        } catch (error) {
            console.log(error)
            res.json({success:false,mesage:"ERROR"})
        }
}

// displaying all foodlist->
const listFood=async (req,res)=>{
    try {
        const foods=await foodModel.find({});
        res.json({success:true,data:foods})
    } catch (error) {
        console.log("error")
        res.json({success:false,message:"ERROR"})
        
    }
}

// Removing food items
const removeFood=async (req,res)=>{
    try {
        const food=await foodModel.findById(req.body.id)
        fs.unlink(path.join(uploadsDirectory, food.image),()=>{})
        await foodModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Food Removed"})
    } catch (error) {
        console.log("error")
        res.json({success:false,message:"ERROR"})
    }

}


export {addFood,listFood,removeFood}
