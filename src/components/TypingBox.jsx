// components/TypingBox.jsx
import { useState, useEffect, useRef } from 'react';
import './TypingBox.css';
import Keyboard from './Keyboard';

const TypingBox = ({ paragraph, onRestart, onNext }) => {
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [finished, setFinished] = useState(false);
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, [paragraph]);

  useEffect(() => {
    if (startTime && !finished) {
      const id = setInterval(() => {
        setTimer(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      setIntervalId(id);

      return () => clearInterval(id);
    }
  }, [startTime, finished]);

  const handleChange = (e) => {
    const value = e.target.value;
    const currentTime = Date.now();

    if (!startTime) {
      setStartTime(currentTime);
      setTimer(0);
    }

    setUserInput(value);

    // Live WPM and Accuracy calculation
    const timeElapsed = (currentTime - (startTime || currentTime)) / 60000;
    const wordCount = value.trim().split(/\s+/).length;
    const correctChars = paragraph.split('').filter((char, i) => value[i] === char).length;
    const accuracyPercent = (correctChars / value.length) * 100 || 0;

    setWpm(Math.round(wordCount / timeElapsed));
    setAccuracy(Math.round(accuracyPercent));

    // Completion check
    if (value === paragraph) {
      clearInterval(intervalId);
      setFinished(true);
    }
  };

  const renderColoredText = () => {
    return paragraph.split('').map((char, index) => {
      const inputChar = userInput[index];
      let className = '';
      if (!inputChar) className = '';
      else if (inputChar === char) className = 'correct';
      else className = 'incorrect';
      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  const correctChars = paragraph.split('').filter((char, i) => userInput[i] === char).length;
  const totalChars = paragraph.length;
  const incorrectChars = userInput.length - correctChars;

  return (
    <div className="typing-box">
      <p className="paragraph">{renderColoredText()}</p>

      <div className="live-stats">
        <p><strong>Timer:</strong> {timer}s</p>
        <p><strong>WPM:</strong> {isNaN(wpm) ? 0 : wpm}</p>
        <p><strong>Accuracy:</strong> {isNaN(accuracy) ? 100 : accuracy}%</p>
        <p><strong>Characters:</strong> {correctChars}/{totalChars}</p>
        <p><strong>Incorrect:</strong> {incorrectChars > 0 ? incorrectChars : 0}</p>
      </div>

      <textarea
        ref={inputRef}
        rows="5"
        placeholder="Start typing here..."
        value={userInput}
        onChange={handleChange}
        disabled={finished}
      />

      {finished && (
        <div className="results finished-message">
          <h3>🎉 Typing Completed!</h3>
          <p><strong>Total Time:</strong> {timer}s</p>
          <p><strong>Final WPM:</strong> {wpm}</p>
          <p><strong>Final Accuracy:</strong> {accuracy}%</p>
          <div className="result-buttons">
            <button onClick={onNext}>➡️ Next Exercise</button>
            <button onClick={onRestart}>🔙 Back to Exercise List</button>
          </div>
        </div>
      )}

      {!finished && <Keyboard activeKey={userInput.slice(-1)} />}
    </div>
  );
};

export default TypingBox;
