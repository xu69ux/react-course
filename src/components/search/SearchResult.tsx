import React, { Component } from "react";
import "../../styles/SearchResult.css";

export interface ISearchResult {
  name: string;
  id: number;
  type: string;
  status: string;
}

interface SearchResultProps {
  searchResults: ISearchResult[];
}

class SearchResult extends Component<SearchResultProps> {
  render() {
    const { searchResults } = this.props;
    if (!searchResults || searchResults.length === 0) {
      return (
        <section className="search-result">
          <h2 className="search-result__title">search results:</h2>
          <p className="search-result__message">No results found.</p>
        </section>
      );
    }
    return (
      <section className="search-result">
        <h2 className="search-result__title">search results:</h2>
        <ul className="search-result__list">
          {searchResults.map((result) => (
            <li key={result.id}>
              <span>{`${result.id}. `}</span>
              <span>{`name: ${result.name}`}</span>
              {result.type && <span>{`, type: ${result.type}`}</span>}
              {result.status && <span>{`, status: ${result.status}`}</span>}
            </li>
          ))}
        </ul>
      </section>
    );
  }
}

export default SearchResult;
