import { useState, FC } from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../context/SearchContext";
import { ErrorBoundaryButton } from "../indexComponents";
import { Button } from "../indexComponents";

import "../../styles/SearchBar.css";

export const SearchBar: FC = () => {
  const { searchTerm, setSearchTerm, currentPage } = useSearch();
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
        <Button
          text="&#10005;"
          className="search-bar__btn-clear"
          onClick={clearSearch}
        />
        <input
          className="search-bar__input"
          type="text"
          placeholder="enter a philosophical name"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button
          text="search"
          className="search-bar__btn"
          onClick={handleSearch}
        />
        <ErrorBoundaryButton counter={0} />
      </section>
    </>
  );
};
