import React, { Component } from "react";
import "../../styles/Search.css";

interface SearchProps {}

interface SearchState {
  searchValue: string;
}

export class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      searchValue: "",
    };
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchValue: event.target.value });
  };

  clearInput = () => {
    this.setState({ searchValue: "" });
  };

  render() {
    return (
      <div>
        <input
          className="search-input"
          type="text"
          placeholder="Enter your awesome search query here"
          value={this.state.searchValue}
          onChange={this.handleInputChange}
        />
        <button className="btn search">search</button>
        <button className="btn search-clear" onClick={this.clearInput}>
          clear
        </button>
      </div>
    );
  }
}
