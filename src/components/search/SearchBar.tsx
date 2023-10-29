import { Component, ChangeEvent } from "react";
import { ErrorBoundaryButton } from "../error-boundary/ErrorBoundaryButton";

import "../../styles/SearchBar.css";

interface SearchBarProps {
  searchTerm: string;
  onSearch: () => void;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export class SearchBar extends Component<SearchBarProps> {
  render() {
    const { searchTerm, onSearch, onInputChange } = this.props;
    const clearSearch = () => {
      onInputChange({ target: { value: "" } } as ChangeEvent<HTMLInputElement>);
      localStorage.removeItem("searchTerm");
      setTimeout(() => {
        onSearch();
      }, 100);
    };

    return (
      <section className="search-bar">
        <button className="search-bar__btn-clear" onClick={clearSearch}>
          &#10005;
        </button>
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
