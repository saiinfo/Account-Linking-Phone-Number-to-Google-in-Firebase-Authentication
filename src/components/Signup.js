import React, { useState } from "react";
import '../App.css';

const Signup = () => {
  const [isStarted, setIsStarted] = useState(false);

  const handleGetStarted = () => {
    setIsStarted(true);
  };

  return (
    <div className="welcome-container">
      <h2>Welcome to Our Website</h2>
      <p>This is an example of an attractive welcome page in React.</p>
      {isStarted ? (
        <p>Great! You have started. Happy exploring!</p>
      ) : (
        <button onClick={handleGetStarted}>Get Started</button>
      )}
    </div>
  );
};

export default Signup;
