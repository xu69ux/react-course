import { FC } from "react";
import logoUrl from "../../assets/philosophy.svg";

import "../../styles/Loader.css";

export const Loader: FC = () => {
  return (
    <div data-testid="loader">
      <img className="loader" src={logoUrl} alt="loader" />
      <p>metamorphosis...</p>
    </div>
  );
};
