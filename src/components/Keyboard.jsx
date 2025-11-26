// src/components/Keyboard.jsx
import './Keyboard.css';

const rows = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
  ['CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', '\'', 'Enter'],
  ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'Shift'],
  ['Space'],
];

const Keyboard = ({ activeKey }) => {
  return (
    <div className="keyboard">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((key, keyIndex) => {
            const isActive = activeKey === key.toLowerCase() || (key === 'Space' && activeKey === ' ');
            return (
              <div
                key={keyIndex}
                className={`key key-${key.toLowerCase()} ${isActive ? 'active' : ''}`}
              >
                {key === 'Space' ? '' : key}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;