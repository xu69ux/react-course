import { FC } from "react";

import "../../styles/Loader.css";

export const Loader: FC = () => {
  return (
    <div data-testid="loader">
      <img className="loader" src="../../assets/philosophy.svg" alt="loader" />
      <p>metamorphosis...</p>
    </div>
  );
};
