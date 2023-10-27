import React, { Component, ChangeEvent } from "react";
import axios from "axios";

interface SearchPageState {
  searchTerm: string;
  searchResults: SearchResult[];
}

interface SearchResult {
  name: string;
}

class SearchPage extends Component<object, SearchPageState> {
  constructor(props: object) {
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
          this.setState({ searchResults: response.data.results });
          console.log("Response:", response.data);
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
      <div>
        <div>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={this.handleInputChange}
          />
          <button onClick={this.search}>Search</button>
        </div>
        <div>
          <h2>Search Results</h2>
          <ul>
            {searchResults.map((result) => (
              <li key={result.name}>
                <h3>{result.name}</h3>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default SearchPage;
