import React, { Component } from "react";
import "../styles/MainPage.css";
import { Search } from "../components/search/Search";

export class MainPage extends Component {
  render() {
    return (
      <div className="main-page">
        <h1>Week1 – Components</h1>
        <section className="section-1">
          <Search />
        </section>
        <section className="section-2">
          <div className="search-results"></div>
          <button className="btn error">error plz</button>
        </section>
      </div>
    );
  }
}
