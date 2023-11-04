import logo from "../../assets/rickandmorty-white.png";

import "../../styles/Loader.css";

export const Loader = () => {
  return (
    <>
      <img className="loader" src={logo} />
      <p>loading...</p>
    </>
  );
};
