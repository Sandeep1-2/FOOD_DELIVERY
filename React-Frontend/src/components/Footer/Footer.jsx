import React from 'react'
import "./Footer.css"
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
            <h3 className="logo">Swiggato</h3>
            <p>Your one-stop food delivery solution bringing delicious meals straight to your doorstep.  
            Fast, reliable, and convenient - order your favorite dishes anytime, anywhere. </p>
            <div className="footer-social-icons">
                <a 
                    href="https://www.linkedin.com/in/chukka-sandeep-a9022a289/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    >
                    <img src={assets.linkedin_icon} alt="LinkedIn" />
                </a>
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
            </div>
            </div>
            <div className="footer-content-center">
                    <h3>Company</h3>
                    <ul>
                       <li>Home</li>
                        <li>AboutUs</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
            </div>
            <div className="footer-content-right">
                    <h3>Get In Touch</h3>
                    <ul>
                        <li>+91-7674896698</li>
                        <li>chukkasandeep@gmail.com</li>
                    </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copyright">Copyright 2024 &#169; Swiggato.com - All Right Reserved.</p>
      
    </div>
  )
}

export default Footer
