// components/ExerciseList.jsx
import './ExerciseList.css';

const ExerciseList = ({ onSelect }) => {
  return (
    <div className="exercise-list">
      <h2>Available Exercises</h2>

      <div className="card-grid">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="exercise-card"
            onClick={() => onSelect(i)}
          >
            <h3>Exercise {i + 1}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExerciseList;
