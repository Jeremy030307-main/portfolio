// src/components/Footer.jsx
import "./footer.css";
import React from "react";

const Footer = () => {
  return (
    <footer>

      <div className="footer-text">
        Teng Kong Cheng - {new Date().getFullYear()}
      </div>
        
      <div>
        <ul className="footer-links">
          <li><a>Github</a></li>
          <li><a>Linkedin</a></li>
          <li><a>Email</a></li>
        </ul>
      </div>
    </footer>
  );
};



export default Footer;
