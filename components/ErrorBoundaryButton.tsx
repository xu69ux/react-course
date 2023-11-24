import React from "react";
import { useState } from "react";
import { FC } from "react";

import { Button } from "@components/Button";

interface ErrorBoundaryButtonProps {
  counter: number;
}

export const ErrorBoundaryButton: FC<ErrorBoundaryButtonProps> = () => {
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
    <Button
      data-testid="error-boundary-button"
      text="error generator"
      className="error-boundary__btn"
      onClick={handleClick}
    />
  );
};
