import React, { useContext } from 'react'
import "./FoodItem.css"
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
const FoodItem = (props) => {
  // const [itemCount, setItemCount] = useState(0)
  const {cartItems,addToCart,removeFromCart,url}=useContext(StoreContext)

  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        {/* <img src={props.image} alt="" className="food-item-img" /> */}
        {/* to get images form data base */}
        <img src={url+"/images/"+props.image} alt="" className="food-item-img" />
        {
          !cartItems[props.id] ? <img onClick={() => addToCart(props.id)} src={assets.add_icon_white} alt="" className="add" />
            : <div className="food-item-counter">
              <img onClick={() => removeFromCart(props.id)} src={assets.remove_icon_red} alt="" className="sub1" />
              <p>{cartItems[props.id]}</p>
              <img onClick={() => addToCart(props.id)} src={assets.add_icon_green} alt="" className="add1" />
            </div>
        }
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{props.name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-descp">{props.description}</p>
        <p className="food-item-price">&#8377;{props.price}</p>

      </div>

    </div>
  )
}

export default FoodItem
