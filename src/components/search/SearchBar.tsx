import { useState } from "react";
import { ErrorBoundaryButton } from "../error-boundary/ErrorBoundaryButton";

import "../../styles/SearchBar.css";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = (props) => {
  const { searchTerm, setSearchTerm } = props;
  const [inputValue, setInputValue] = useState(searchTerm);

  const clearSearch = () => {
    localStorage.removeItem("searchTerm");
    setTimeout(() => {
      setSearchTerm("");
      setInputValue("");
    }, 100);
  };

  return (
    <>
      <section className="search-bar">
        <button className="search-bar__btn-clear" onClick={clearSearch}>
          &#10005;
        </button>
        <input
          className="search-bar__input"
          type="text"
          placeholder="please enter a name"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          className="search-bar__btn"
          onClick={() => setSearchTerm(inputValue)}
        >
          search
        </button>
        <ErrorBoundaryButton counter={0} />
      </section>
    </>
  );
};
