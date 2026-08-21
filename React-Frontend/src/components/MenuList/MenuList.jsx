import React from 'react'
import "./MenuList.css"
import { menu_list } from '../../assets/assets'
const MenuList = (props) => {
  // const category=props.category;
  // const setCategory=props.setCategory;
  return (
    <div className='menu-list' id='menu-list'>
        <h3>Explore Our Magnificant Menu</h3>
        <p className="menu-list-text">Explore our diverse menu, meticulously curated with a tantalizing selection of dishes crafted from the finest ingredients, each aimed at satisfying your cravings and enhancing your dining experience, one delicious meal at a time. Choose your culinary journey here!</p>
      <div className="menu-list-items">
        {menu_list.map((elem,idx)=>{
            return (
                <div onClick={()=>{props.setCategory(prev=>prev===elem.menu_name?"All":elem.menu_name)}} key={idx} className="menu-list-item">
                        <img className={props.category===elem.menu_name?"active":""} src={elem.menu_image} alt="" />
                        <p className={props.category===elem.menu_name?"active1":""}>{elem.menu_name}</p>
                </div>
            )
        })}
      </div>
      <hr />
    </div>
  )
}

export default MenuList
