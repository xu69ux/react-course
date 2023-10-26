import React, { Component } from "react";
import axios from "axios";
import "../../styles/Search.css";

interface SearchProps {}

interface SearchState {
  searchValue: string;
  searchResults: [] | null;
}

export class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      searchValue: localStorage.searchValue ?? "",
      searchResults: null,
    };
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchValue: event.target.value });
  };

  handleSearch = () => {
    localStorage.setItem("searchValue", this.state.searchValue);
    console.log(localStorage);
    axios
      .get(`https://pokeapi.co/api/v2/berry/${this.state.searchValue}`)
      .then((response) => {
        this.setState({ searchResults: response.data });
        console.log("Response:", response);
      })
      .catch((error) => {
        console.error("Error while executing the GET request:", error);
      });
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
        <button className="btn search" onClick={this.handleSearch}>
          search
        </button>
        <button className="btn search-clear" onClick={this.clearInput}>
          clear
        </button>
      </div>
    );
  }
}
