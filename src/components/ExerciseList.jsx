// components/ExerciseList.jsx
import './ExerciseList.css';

const ExerciseList = ({ onSelect }) => {
  return (
    <div className="exercise-list">
      <h2>Select an Exercise</h2>
      <div className="card-grid">
        {[...Array(50)].map((_, i) => (
          <div key={i} className="exercise-card" onClick={() => onSelect(i)}>
            <img
              src={`https://www.openaccessgovernment.org/wp-content/uploads/2019/12/dreamstime_xxl_143548247.jpg`}
              alt={`Exercise ${i + 1}`}
              className="card-image"
            />
            <div className="card-content">
              <h3>Exercise {i + 1}</h3>
              <p>Boost your typing skills with this challenge.</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExerciseList;
