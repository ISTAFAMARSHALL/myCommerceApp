// Footer.js

import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: info@mycommerce.com</p>
          <p>Phone: (123) 456-7890</p>
        </div>

        <div className="footer-section">
          <h3>Follow Us</h3>
          <p>Facebook</p>
          <p>Twitter</p>
          <p>Instagram</p>
        </div>

        <div className="footer-section">
          <h3>Company</h3>
          <p>About Us</p>
          <p>Careers</p>
          <p>Privacy Policy</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2023 MyCommerce. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
