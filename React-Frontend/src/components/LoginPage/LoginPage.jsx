import React, { useContext, useState } from 'react';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';
import './LoginPage.css';

const LoginPage = (props) => {
    const [currState, setCurrState] = useState("Sign Up");
    const { url, setIsLoggedIn, setUser,setToken } = useContext(StoreContext);
    const [data, setData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData({ ...data, [name]: value });
    };

    const onLogin = async (event) => {
        event.preventDefault();
        const new_url = currState === "Login" ? `${url}/api/user/login` : `${url}/api/user/register`;
        try {
            const response = await axios.post(new_url, data);
            if (response.data.success) {
                // alert(response.data.message);
                setToken(response.data.token)
                props.setShowLogin(false);
                setIsLoggedIn(true);
                setUser(response.data.user);
                localStorage.setItem("token",response.data.token);
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Error during login or registration:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className='login-page'>
            <form onSubmit={onLogin} className="login-page-container">
                <div className="login-page-title">
                    <h3>{currState}</h3>
                    <img onClick={() => props.setShowLogin(false)} src={assets.cross_icon} alt="Close" />
                </div>
                <div className="login-page-input">
                    <input name='username' onChange={onChangeHandler} value={data.username} type="text" placeholder='Your Username' required />
                    {currState === "Login" ? null : <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your Email' required />}
                    <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
                </div>
                <button type='submit'>{currState === "Sign Up" ? "Create Account" : "Login"}</button>
                {currState === "Sign Up" ?
                    <div className="login-page-condition">
                        <input type="checkbox" required />
                        <p>By continuing, I agree to the terms of use & privacy policy.</p>
                    </div>
                    : null}
                {currState === "Login" ?
                    <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click Here</span></p>
                    :
                    <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login Here</span></p>}
            </form>
        </div>
    );
};

export default LoginPage;
