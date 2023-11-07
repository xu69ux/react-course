import { FC } from "react";

interface IButtonProps {
  text: string;
  className: string;
  onClick: () => void;
}

export const Button: FC<IButtonProps> = ({ text, className, onClick }) => {
  return (
    <button className={className} onClick={onClick}>
      {text}
    </button>
  );
};
