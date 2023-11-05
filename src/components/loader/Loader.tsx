import logo from "../../assets/philosophy.svg";

import "../../styles/Loader.css";

export const Loader = () => {
  return (
    <>
      <img className="loader" src={logo} />
      <p>metamorphosis...</p>
    </>
  );
};
