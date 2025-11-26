// App.jsx
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import ExerciseList from './components/ExerciseList';
import TypingBox from './components/TypingBox';
import { exercises } from './data/exercises';
import About from './components/About';

function App() {
  const navigate = useNavigate();
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(null);

  const handleStart = () => navigate('/exercises');

  const handleStartExercise = (index) => {
    setCurrentExerciseIndex(index);
    navigate(`/exercise/${index}`);
  };

  const handleNextExercise = () => {
    const nextIndex = currentExerciseIndex + 1;
    if (nextIndex < exercises.length) {
      setCurrentExerciseIndex(nextIndex);
      navigate(`/exercise/${nextIndex}`);
    }
  };

  const handleBackToList = () => {
    setCurrentExerciseIndex(null);
    navigate('/exercises');
  };

  return (
    <div className="container">
      <Header />

      <Routes>
        <Route path="/" element={<Home onStart={handleStart} />} />
        <Route path="/exercises" element={<ExerciseList onSelect={handleStartExercise} />} />
        <Route path="/exercise/:id" element={
          currentExerciseIndex !== null &&
          <TypingBox
            paragraph={exercises[currentExerciseIndex]}
            onRestart={handleBackToList}
            onNext={handleNextExercise}
          />
        } />
        <Route path="/about" element={<About />} />  
        
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
