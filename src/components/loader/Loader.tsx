import { FC } from "react";

import logo from "../../assets/philosophy.svg";
import "../../styles/Loader.css";

export const Loader: FC = () => {
  return (
    <>
      <img className="loader" src={logo} />
      <p>metamorphosis...</p>
    </>
  );
};
