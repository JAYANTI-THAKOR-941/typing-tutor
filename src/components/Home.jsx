// components/Home.jsx
import './Home.css';
import { FaKeyboard, FaRocket, FaCheckCircle } from 'react-icons/fa';
import { GiAchievement, GiBrain } from 'react-icons/gi';
import { MdOutlineLightbulb } from 'react-icons/md';
import TypingEffect from './TypingEffect';

const Home = ({ onStart }) => {
  return (
    <div className="home-container">
      <div className="matrix-bg"></div>

      <div className="hero-section">
        <FaKeyboard className="main-icon" />
        <h1 className="title">TechSkillHub Typing Trainer</h1>
        <TypingEffect text='"Level up your typing skill from Beginner to Pro!"' />
        <button className="start-btn neon-glow" onClick={onStart}>
          🚀 Start Typing
        </button>
      </div>

      <div className="features">
        <h2>💡 Why Practice Here?</h2>
        <ul>
          <li><FaCheckCircle /> 50 Exercises — from basic to advanced</li>
          <li><GiAchievement /> Track your WPM & accuracy live</li>
          <li><GiBrain /> Boost memory and keyboard mastery</li>
          <li><FaRocket /> Perfect for developers, students & job-seekers</li>
        </ul>
      </div>

      <div className="levels-preview">
        <h2>🎯 Typing Levels</h2>
        <div className="levels">
          <div className="level beginner">
            <h3>🔰 Beginner</h3>
            <p>Simple words, basic drills and muscle memory practice.</p>
          </div>
          <div className="level intermediate">
            <h3>⚙️ Intermediate</h3>
            <p>Full sentences and performance tracking with feedback.</p>
          </div>
          <div className="level advanced">
            <h3>🚀 Advanced</h3>
            <p>Challenging paragraphs, coding practice and speed boost.</p>
          </div>
        </div>
      </div>

      <div className="quote-section">
        <MdOutlineLightbulb className="quote-icon" />
        <blockquote>
          “The only way to type faster is to practice smarter.”<br />
          <span>- Jayanti Thakor</span>
        </blockquote>
      </div>
    </div>
  );
};

export default Home;
