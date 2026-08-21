import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/assets";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export const StoreContext = createContext("null");

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [token,setToken]=useState("")
    const url = import.meta.env.VITE_API_URL || "http://localhost:4000";
        // uncomment when there is data of food present in databae-->used to fetch the data from db
        // and we can remove the food_list compoent form assets
    const [food_list,setFoodList]=useState([])
    const fetchFoodList=async()=>{
        const response=await axios.get(url+"/api/food/list")
        console.log(response);
        setFoodList(response.data.data)  
    }

    const notify=()=>toast.warning("You Need to Login First");
    const addToCart = async (itemId) => {
        if (localStorage.getItem("token")) {
            try {
                await axios.post(url + "/api/cart/add", { itemId }, {
                    headers: { token: localStorage.getItem("token") },
                });
                        if (!cartItems[itemId]) {
                            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
                        } else {
                            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
                        }
            } catch (error) {
                console.error('Error adding to cart:', error);
            }
        }
        else {
            notify();
            console.log("User is not logged in");
        }
    };


    const removeFromCart = async (itemId) => {
        if (localStorage.getItem("token")) {
            try {
                await axios.post(url + "/api/cart/remove", { itemId }, {
                    headers: { token: localStorage.getItem("token") },
                });
                setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
            } catch (error) {
                console.error('Error removing from cart:', error);
            }
        } else {
            console.log("User is not logged in");
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const elem in cartItems) {
            if (cartItems[elem] > 0) {
                let elemInfo = food_list.find((product) => product._id === elem);
                totalAmount += elemInfo.price * cartItems[elem];
            }
        }
        return totalAmount;
    };





    const logout = () => {
        setIsLoggedIn(false);
        // setUser(null);
        localStorage.removeItem('token');
        console.log("User logged out and localStorage cleared.");
        setCartItems({});       
    };

    useEffect(() => {

        if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"));
        }

        // uncomment when there is data of food present in databae-->used to fetch the data from db
        async function loadData(){
            await fetchFoodList();
        }
        loadData();
    }, []); 

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        logout,
        token,
        setToken,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};
// localStorage.removeItem('test')
export default StoreContextProvider;
