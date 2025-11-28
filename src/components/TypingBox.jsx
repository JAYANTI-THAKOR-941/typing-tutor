import { useState, useEffect, useRef } from "react";
import "./TypingBox.css";
import Keyboard from "./Keyboard";

const TypingBox = ({ paragraph, onRestart, onNext }) => {
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [finished, setFinished] = useState(false);
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const inputRef = useRef();

  const paragraphWords = paragraph.split(" ");

  // Focus on textarea when paragraph changes
  useEffect(() => {
    setUserInput("");
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setFinished(false);
    setTimer(0);
    inputRef.current.focus();
  }, [paragraph]);

  // Timer
  useEffect(() => {
    if (startTime && !finished) {
      const id = setInterval(() => {
        setTimer(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      setIntervalId(id);

      return () => clearInterval(id);
    }
  }, [startTime, finished]);

  // Handle typing input
  const handleChange = (e) => {
    const value = e.target.value;
    const currentTime = Date.now();

    if (!startTime) setStartTime(currentTime);

    setUserInput(value);

    const inputWords = value.trim().split(/\s+/);
    let correctWords = 0;

    inputWords.forEach((word, idx) => {
      if (word === paragraphWords[idx]) correctWords++;
    });

    const timeElapsed = (currentTime - (startTime || currentTime)) / 60000; // in minutes
    setWpm(Math.round(inputWords.length / timeElapsed));
    setAccuracy(Math.round((correctWords / inputWords.length) * 100) || 0);

    // Finished check
    if (value.trim() === paragraph) {
      clearInterval(intervalId);
      setFinished(true);
    }
  };

  // Render colored words
  const renderColoredWords = () => {
    const inputWords = userInput.split(/\s+/);
    return paragraphWords.map((word, idx) => {
      let className = "";
      if (inputWords[idx] === undefined) className = "";
      else if (inputWords[idx] === word) className = "correct";
      else className = "incorrect";

      return (
        <span key={idx} className={className}>
          {word}{" "}
        </span>
      );
    });
  };

  return (
    <div className="typing-box">
      <p
        className="paragraph"
        onCopy={(e) => e.preventDefault()}
        onCut={(e) => e.preventDefault()}
        onPaste={(e) => e.preventDefault()}
        onContextMenu={(e) => e.preventDefault()}
      >
        {renderColoredWords()}
      </p>

      <div className="live-stats">
        <p>
          <strong>Timer:</strong> {timer}s
        </p>
        <p>
          <strong>WPM:</strong> {isNaN(wpm) ? 0 : wpm}
        </p>
        <p>
          <strong>Accuracy:</strong> {isNaN(accuracy) ? 100 : accuracy}%
        </p>
      </div>

      <textarea
        ref={inputRef}
        rows="5"
        placeholder="Start typing here..."
        value={userInput}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Backspace") e.preventDefault(); // Disable backspace
          if ((e.ctrlKey || e.metaKey) && ["x", "c", "v"].includes(e.key.toLowerCase())) {
            e.preventDefault(); // Disable Ctrl+X/C/V
          }
        }}
        disabled={finished}
      />

      {finished && (
        <div className="results finished-message">
          <h3>🎉 Typing Completed!</h3>
          <p>
            <strong>Total Time:</strong> {timer}s
          </p>
          <p>
            <strong>Final WPM:</strong> {wpm}
          </p>
          <p>
            <strong>Final Accuracy:</strong> {accuracy}%
          </p>
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
