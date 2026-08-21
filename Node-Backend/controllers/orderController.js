import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js"
import Stripe from "stripe"
// to access dotenv file
import dotenv from 'dotenv'
import { response } from "express";
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// placing user order from frontend

const placeOrder=async (req,res)=>{

    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    try {
        const newOrder=new orderModel({
            // we will get the id from auth middleware
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })
        // order data is saved in database
        await newOrder.save();
        // we need to claear the data from users cart
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}})

        // to create payment link using stripe
        const line_items=req.body.items.map((item)=>({
            price_data:{
                currency:"inr",
                product_data:{
                    name:item.name,
                },
                unit_amount:item.price*80
            },
            quantity:item.quantity
        }))

        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:10*80
            },
            quantity:1,
        })
// why session?
        const session =await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:"payment",
            metadata: {
                orderId: newOrder._id.toString(),
            },
            success_url:`${frontendUrl}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontendUrl}/verify?success=false&orderId=${newOrder._id}`,
        })
        console.log("he");
        res.json({success:true,session_url:session.url})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

const verifyOrder =async (req,res)=>{
    const {orderId,success}=req.body;
    try{
        const order = await orderModel.findById(orderId);
        if (!order || order.userId.toString() !== req.body.userId) {
            return res.status(404).json({success:false,message:"Order not found"});
        }
        if(success!=="true"){
            await orderModel.findByIdAndDelete(orderId)
            res.json({success:false,message:"Not Paid"})
        } else if (order.payment) {
            res.json({success:true,message:"Paid"})
        } else {
            res.json({success:false,message:"Payment is still being confirmed"})
        }
    }catch(error){
       console.log(error);
       res.json({success:false,message:"Error"})
    }
}

const stripeWebhook = async (req, res) => {
    const signature = req.headers["stripe-signature"];

    if (!process.env.STRIPE_WEBHOOK_SECRET) {
        return res.status(500).send("Stripe webhook is not configured");
    }

    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, signature, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (error) {
        return res.status(400).send(`Webhook signature verification failed: ${error.message}`);
    }

    try {
        if (event.type === "checkout.session.completed") {
            const orderId = event.data.object.metadata?.orderId;
            if (orderId) {
                await orderModel.findByIdAndUpdate(orderId, { payment: true });
            }
        }
        return res.json({ received: true });
    } catch (error) {
        console.error("Stripe webhook processing failed", error);
        return res.status(500).send("Webhook processing failed");
    }
};

// users order for frontend-->we are connecting backend data to frontend
const userOrders=async (req,res)=>{
    try {
        // we will get the userId from the middleware
        const orders=await orderModel.find({userId:req.body.userId})
        res.json({success:true,data:orders});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
        
    }

}
// getting list of all orders for admin panel
const listOrders=async (req,res)=>{
    try {
        const orders=await orderModel.find({});
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}

// api for updating order status from admin panel
const updateStatus =async (req,res)=>{
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        res.json({success:true,message:"Status updated"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}
export {placeOrder,verifyOrder,userOrders,listOrders,updateStatus,stripeWebhook}
