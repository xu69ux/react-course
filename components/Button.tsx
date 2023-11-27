import React from "react";
import { FC } from "react";

interface IButtonProps {
  "data-testid"?: string;
  text: string;
  className: string;
  onClick: () => void;
}

export const Button: FC<IButtonProps> = ({
  "data-testid": dataTestId,
  text,
  className,
  onClick,
}) => {
  return (
    <button data-testid={dataTestId} className={className} onClick={onClick}>
      {text}
    </button>
  );
};
