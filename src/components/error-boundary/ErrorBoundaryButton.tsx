import { useState } from "react";
import "../../styles/ErrorBoundaryButton.css";

interface ErrorBoundaryButtonProps {
  counter: number;
}

export const ErrorBoundaryButton: React.FC<ErrorBoundaryButtonProps> = () => {
  const [counter, setCounter] = useState(0);

  const handleClick = () => {
    setCounter(counter + 1);
  };

  if (counter === 1) {
    throw new Error(
      "the application crashed because you clicked the error generator!",
    );
  }
  return (
    <button className="error-boundary__btn" onClick={handleClick}>
      error generator
    </button>
  );
};
