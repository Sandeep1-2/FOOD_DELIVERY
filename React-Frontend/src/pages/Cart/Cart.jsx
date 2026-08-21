import React, { useContext } from 'react';
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-item-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
          <br />
        </div>
        {food_list.map((elem) => {
          if (cartItems[elem._id] > 0) {
            return (
              <div key={elem._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={`${url}/images/${elem.image}`} alt={elem.name} />
                  <p>{elem.name}</p>
                  <p>&#8377;{elem.price}</p>
                  <p>{cartItems[elem._id]}</p>
                  <p>&#8377;{elem.price * cartItems[elem._id]}</p>
                  <p onClick={() => removeFromCart(elem._id)} className='cross'>x</p>
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h3>Cart Total</h3>
          <div>
            <div className="cart-total-details">
              <p>SubTotal</p>
              <p>&#8377;{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>&#8377;{getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>&#8377;{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
            <button onClick={() => navigate("/order")}>Proceed To Checkout</button>
          </div>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder='Promo code' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
