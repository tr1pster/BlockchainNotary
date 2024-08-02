import React from 'react';

const Footer = () => {
  return (
    <footer style={{background: "#f0f0f0", textAlign: "center", padding: "20px", marginTop: "20px"}}>
      <p>© 2023 BlockchainNotary. All rights reserved.</p>
      <p>
        <a href="#">Home</a> | 
        <a href="#about">About Us</a> | 
        <a href="#services">Services</a> | 
        <a href="#contact">Contact Us</a>
      </p>
      <p>
        Follow us on 
        <a href={`https://twitter.com/${process.env.TWITTER_HANDLE}`}> Twitter</a>, 
        <a href={`https://www.facebook.com/${process.env.FACEBOOK_HANDLE}`}> Facebook</a>, and 
        <a href={`https://www.instagram.com/${process.env.INSTAGRAM_HANDLE}`}> Instagram</a>
      </p>
    </footer>
  );
}

export default Footer;