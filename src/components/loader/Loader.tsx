import { Component } from "react";
import logo from "../../assets/rickandmorty.png";

import "../../styles/Loader.css";

export class Loader extends Component {
  render() {
    return (
      <>
        <img className="loader" src={logo} />
        <p>loading...</p>
      </>
    );
  }
}
