import React from 'react';

const BlockchainNotaryFooter = () => {
  const twitterHandle = process.env.TWITTER_HANDLE;
  const facebookHandle = process.env.FACEBOOK_HANDLE;
  const instagramHandle = process.env.INSTAGRAM_HANDLE;

  return (
    <footer style={{ background: "#f0f0f0", textAlign: "center", padding: "20px", marginTop: "20px" }}>
      <p>© 2023 BlockchainNotary. All rights reserved.</p>

      <p>
        <a href="#">Home</a> | 
        <a href="#about">About Us</a> | 
        <a href="#services">Services</a> | 
        <a href="#contact">Contact Us</a>
      </p>

      <p>
        Follow us on
        <a href={`https://twitter.com/${twitterHandle}`}> Twitter</a>, 
        <a href={`https://www.facebook.com/${facebookHandle}`}> Facebook</a>, and 
        <a href={`https://www.instagram.com/${instagramHandle}`}> Instagram</a>
      </p>
    </footer>
  );
}

export default BlockchainNotaryFooter;