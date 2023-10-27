import React, { Component } from "react";
import "../../styles/SearchResult.css";

export interface ISearchResult {
  name: string;
}

interface SearchResultProps {
  searchResults: ISearchResult[];
}

class SearchResult extends Component<SearchResultProps> {
  render() {
    const { searchResults } = this.props;
    console.log(searchResults);
    return (
      <section className="search-result">
        <h2 className="search-result__title">search results:</h2>
        <ul className="search-result__list">
          {searchResults.map((result, index) => (
            <li key={index}>
              <span>{`${index}. `}</span>
              <span>{result.name}</span>
            </li>
          ))}
        </ul>
      </section>
    );
  }
}

export default SearchResult;
