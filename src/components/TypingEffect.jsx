// components/TypingEffect.jsx
import { useEffect, useState } from 'react';
import './TypingEffect.css';

const TypingEffect = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [i, setI] = useState(0);

  useEffect(() => {
    if (i < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(displayedText + text[i]);
        setI(i + 1);
      }, 60);
      return () => clearTimeout(timeout);
    }
  }, [i, displayedText, text]);

  return <p className="typing-effect">{displayedText}</p>;
};

export default TypingEffect;
