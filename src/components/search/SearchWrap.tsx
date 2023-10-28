import React, { Component, ChangeEvent } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import SearchResult from "./SearchResult";
import { ISearchResult } from "./SearchResult";

import logo from "../../assets/rickandmorty.png";
import "../../styles/SearchWrap.css";

interface SearchWrapProps {}

interface SearchWrapState {
  searchTerm: string;
  searchResults: ISearchResult[];
  badRequest: boolean;
}

export class SearchWrap extends Component<SearchWrapProps, SearchWrapState> {
  constructor(props: SearchWrapProps) {
    super(props);
    this.state = {
      searchTerm: "",
      searchResults: [],
      badRequest: false,
    };
  }

  componentDidMount() {
    const savedSearchTerm = localStorage.getItem("searchTerm");
    if (savedSearchTerm) {
      this.setState({ searchTerm: savedSearchTerm }, () => this.search());
    } else {
      this.search();
    }
  }

  search = () => {
    const { searchTerm } = this.state;
    localStorage.setItem("searchTerm", searchTerm);
    this.setState({ badRequest: false });
    try {
      if (searchTerm.trim() === "") {
        axios
          .get("https://rickandmortyapi.com/api/character/?page=1")
          .then((response) => {
            console.log(response.data.results);
            this.setState({
              searchResults: response.data.results,
            });
          });
      } else {
        axios
          .get(`https://rickandmortyapi.com/api/character/?name=${searchTerm}`)
          .then((response) => {
            this.setState({ searchResults: response.data.results });
          })
          .catch((error) => {
            if (error.response.status === 404) {
              this.setState({ badRequest: true });
            }
          });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log("error message:", error.message);
      }
    }
  };

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  render() {
    const { searchTerm, searchResults } = this.state;

    return (
      <div className="search-wrap">
        <img className="search-wrap__logo" src={logo} />
        <h1 className="search-wrap__title">The Rick and Morty API</h1>
        <SearchBar
          searchTerm={searchTerm}
          onSearch={this.search}
          onInputChange={this.handleInputChange}
        />
        <SearchResult
          searchResults={searchResults}
          badRequest={this.state.badRequest}
        />
      </div>
    );
  }
}
