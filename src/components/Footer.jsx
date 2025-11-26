// components/Footer.jsx
import './Footer.css';

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-container">
        <div className="footer-section about">
          <h2>TechSkillHub</h2>
          <p>
            TechSkillHub is your personalized platform to improve typing speed and accuracy — from beginners to advanced users.
          </p>
        </div>

        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Exercises</a></li>
            <li><a href="#">Typing Test</a></li>
            <li><a href="#">Progress</a></li>
            <li><a href="#">Support</a></li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p>Email: <a href="mailto:jyantithakor941@gmail.com">jyantithakor941@gmail.com</a></p>
          <p>Phone: +91 8160041921</p>
          <p>Location: Gandhinagar, Gujarat, India</p>
        </div>

        <div className="footer-section social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-github"></i></a>
            <a href="#"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} TechSkillHub. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
