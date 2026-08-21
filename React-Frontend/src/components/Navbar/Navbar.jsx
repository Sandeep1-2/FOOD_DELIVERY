import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';
import './Navbar.css';

const Navbar = (props) => {
    const { getTotalCartAmount, logout,setToken,token } = useContext(StoreContext);
    const [menu,setMenu]=useState("home")
    const navigate=useNavigate();
    const { food_list } = useContext(StoreContext)
    const [showSearch, setShowSearch] = useState(false);
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const foods=food_list;
    const handleSearch = () => {
        setShowSearch(!showSearch);
        // console.log(food_list);     
    };
    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);
      
        if (value.trim() === "") {
          setSuggestions([]);
          return;
        }  
        // split input into words like ["rolls", "paneer"]
        const queryWords = value.toLowerCase().split(" ").filter(Boolean);
      
        const filtered = foods.filter((item) => {
          const name = item.name.toLowerCase();
          // check if every query word exists in the name
          return queryWords.every((word) => name.includes(word));
        }).slice(0, 3);
      
        setSuggestions(filtered);
      };
      
      const handleNavigate = (slug) => {
        // console.log(slug);
        
        props.setSearchName(slug);  
        setShowSearch(false);
        setQuery("");
        setSuggestions([]);
        navigate("/");
        setTimeout(() => {
            props.setSearchName("");
          }, 6000);
      };
    const handleLogOut = () => {
        localStorage.removeItem("token")
        setToken("")
        logout();
    };
    
    return (
        <div  className='navbar' style={{width:"100%"}}>
            <Link to='/' onClick={()=>{setMenu("home")}} className="logo">Swiggato</Link>
            <ul className="navbar-menu">
                <Link to='/' onClick={()=>{setMenu("home")}} className={menu=="home"?"active":""}>Home</Link>
                <a href='#menu-list' onClick={()=>{setMenu("menu")}} className={menu=="menu"?"active":""}>Menu</a>
                <a href='#app-download' onClick={()=>{setMenu("mobile-app")}} className={menu=="mobile-app"?"active":""}>Mobile-App</a>
                <a href='#footer' onClick={()=>{setMenu("contact-us")}} className={menu=="contact-us"?"active":""}>Contact Us</a>
            </ul>
            <div className="navbar-right">
                <img onClick={handleSearch} className='search-icon' src={assets.search_icon} alt="Search" />
                {showSearch && (
                    <div className="search-box">
                        <input
                            type="text"
                            value={query}
                            onChange={handleChange}
                            placeholder="Search food..."
                            className="search-input"
                        />
                        {suggestions.length > 0 && (
                            <ul className="suggestion-list">
                                {suggestions.map((item, idx) => (
                                    <li
                                        key={idx}
                                        onClick={() => handleNavigate(item.name)}
                                        className="suggestion-item"
                                    >
                                        {item.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
                {token?
                    <div className="navbar-search-icon">
                        <Link to="/cart"><img src={assets.basket_icon} alt="Cart" /></Link>
                        <div className={getTotalCartAmount() > 0 ? "dot" : ""}></div>
                    </div>:null
                }
                {!token ?
                    <button onClick={() => props.setShowLogin(true)}>Sign In</button>
                    :
                    <div className='navbar-profile'>
                        <img src={assets.profile_icon} alt="Profile" />
                        <ul className="navbar-profile-dropdown">
                            <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="Orders" /><div>Orders</div></li>
                            <hr />
                            <li onClick={handleLogOut}><img src={assets.logout_icon} alt="Logout" /><div>Logout</div></li>
                        </ul>
                    </div>
                }
            </div>
        </div>
    );
};

export default Navbar;
