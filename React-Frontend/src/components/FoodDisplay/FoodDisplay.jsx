import React, { useContext } from 'react'
import "./FoodDisplay.css"
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'
const FoodDisplay = (props) => {

    const { food_list } = useContext(StoreContext)
    return (
        <div className='food-display' id='food-display' >
            <h3>Top Dishes near</h3>
            <div className="food-display-list">
                {food_list.map((elem, idx) => {
                    if(props.searchName){
                        // console.log(props.searchName);                       
                        if(elem.name.toLowerCase().includes(props.searchName.toLowerCase())){
                            // console.log("Inside if",elem._id);                          
                            return <FoodItem key={idx} id={elem._id} name={elem.name} description={elem.description} price={elem.price} image={elem.image} category={elem.category} />
                        }
                        return null;
                    }
                    if(props.category==="All" || props.category===elem.category){
                      return <FoodItem key={idx} id={elem._id} name={elem.name} description={elem.description} price={elem.price} image={elem.image} category={elem.category} />
                    }
                })}
            </div>
        </div>
    )
}

export default FoodDisplay
