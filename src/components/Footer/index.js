import './index.css'

import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

const Footer = () => (
  <div className="footer-container">
    <div className="footer-icon-container">
      <FaGoogle className="footer-icons" />
      <FaTwitter className="footer-icons" />
      <FaInstagram className="footer-icons" />
      <FaYoutube className="footer-icons" />
    </div>
    <p className="footer-contact-us-text">Contact Us</p>
  </div>
)

export default Footer
