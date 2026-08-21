import React, { useContext, useEffect, useState } from 'react'
import "./MyOrders.css"
import {StoreContext} from "../../context/StoreContext.jsx"
import axios from 'axios';
import { assets } from '../../assets/assets.js';
const MyOrders = () => {

    const [data,setData]=useState([]);
    const {url,token}=useContext(StoreContext)

    // we will call the api
    // second bracket is body -->we dont need to send anything->give empty object
    const fetchOrders=async ()=>{
        const response=await axios.post(url+"/api/order/userorders",{},{headers:{token}})
        setData(response.data.data)
        console.log(response.data.data);        
    }
// when ever the token is updated the useEffect function will get called
    useEffect(()=>{
        if(token){
            fetchOrders();
        }
    },[token])
    
  return (
    <div className='myorders'>
        <div className="container">
            {data.map((order,idx)=>{
                return (
                    <div key={idx} className="myorders-order">
                        <img src={assets.parcel_icon} alt="" />
                        <p>{order.items.map((item,idx)=>{
                            // to access last item
                            if(idx===order.items.length-1){
                                return item.name+" x "+item.quantity
                            }
                            else{
                                return item.name+" x "+item.quantity+" , "
                            }
                        })}</p>
                        <p>${order.amount}.00</p>
                        <p>Items:{order.items.length}</p>
                        <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                        <button onClick={fetchOrders}>Track Order</button>
                    </div>

                )
            })}
        </div>
      
    </div>
  )
}

export default MyOrders
