import React, { Component } from "react";
import "../../styles/SearchResult.css";
import { Loader } from "../loader/Loader";

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
          <Loader />
        </section>
      );
    }
    return (
      <section className="search-result">
        <h2 className="search-result__title">search results:</h2>
        <ul className="search-result__list">
          {searchResults.map((result) => (
            <li key={result.id}>
              <div className="list__id">{`id: ${result.id}`}</div>
              <div className="list__name">{`name: ${result.name}`}</div>
              {result.type && (
                <div className="list__type">{`type: ${result.type}`}</div>
              )}
              {result.status && (
                <div className="list__status">{`status: ${result.status}`}</div>
              )}
            </li>
          ))}
        </ul>
      </section>
    );
  }
}

export default SearchResult;
