import React, { Component, ChangeEvent } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import SearchResult from "./SearchResult";
import "../../styles/SearchWrap.css";
import { ISearchResult } from "./SearchResult";

interface SearchAppProps {}

interface SearchAppState {
  searchTerm: string;
  searchResults: ISearchResult[];
}

class SearchApp extends Component<SearchAppProps, SearchAppState> {
  constructor(props: SearchAppProps) {
    super(props);
    this.state = {
      searchTerm: "",
      searchResults: [],
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
    if (searchTerm.trim() === "") {
      axios
        .get("https://pokeapi.co/api/v2/pokemon?limit=20")
        .then((response) => {
          this.setState({
            searchResults: response.data.results,
          });
        });
    } else {
      axios
        .get(`https://pokeapi.co/api/v2/berry/${searchTerm}`)
        .then((response) => {
          this.setState({ searchResults: response.data.results });
        });
    }
  };

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  render() {
    const { searchTerm, searchResults } = this.state;

    return (
      <div className="search-wrap">
        <SearchBar
          searchTerm={searchTerm}
          onSearch={this.search}
          onInputChange={this.handleInputChange}
        />
        <SearchResult searchResults={searchResults} />
      </div>
    );
  }
}

export default SearchApp;
