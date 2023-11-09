import { FC } from "react";

import logo from "../../assets/philosophy.svg";
import "../../styles/Loader.css";

export const Loader: FC = () => {
  return (
    <div data-testid="loader">
      <img className="loader" src={logo} />
      <p>metamorphosis...</p>
    </div>
  );
};
