import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorBoundaryButton } from "../error-boundary/ErrorBoundaryButton";

import "../../styles/SearchBar.css";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  currentPage: number;
}

export const SearchBar: React.FC<SearchBarProps> = (props) => {
  const { searchTerm, setSearchTerm, currentPage } = props;
  const [inputValue, setInputValue] = useState(searchTerm);
  const navigate = useNavigate();

  const handleSearch = () => {
    setSearchTerm(inputValue);
    if (currentPage !== 1) {
      navigate(`/search/page/1`);
    }
  };
  const clearSearch = () => {
    localStorage.removeItem("searchTerm");
    setTimeout(() => {
      setSearchTerm("");
      setInputValue("");
    }, 100);
    if (currentPage !== 1) {
      navigate(`/search/page/1`);
    }
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
        <button className="search-bar__btn" onClick={handleSearch}>
          search
        </button>
        <ErrorBoundaryButton counter={0} />
      </section>
    </>
  );
};
