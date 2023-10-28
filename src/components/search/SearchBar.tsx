import React, { Component, ChangeEvent } from "react";
import { ErrorBoundaryButton } from "../error-boundary/ErrorBoundaryButton";

import "../../styles/SearchBar.css";

interface SearchBarProps {
  searchTerm: string;
  onSearch: () => void;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

class SearchBar extends Component<SearchBarProps> {
  render() {
    const { searchTerm, onSearch, onInputChange } = this.props;

    return (
      <section className="search-bar">
        <input
          className="search-bar__input"
          type="text"
          placeholder="please enter a name"
          value={searchTerm}
          onChange={onInputChange}
        />
        <button className="search-bar__btn" onClick={onSearch}>
          search
        </button>
        <ErrorBoundaryButton />
      </section>
    );
  }
}

export default SearchBar;
