import { useState, FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../redux/slices/searchSlice";
import { RootState } from "../../redux/store";
import { ErrorBoundaryButton } from "../indexComponents";
import { Button } from "../indexComponents";

import "../../styles/SearchBar.css";

export const SearchBar: FC = () => {
  const dispatch = useDispatch();
  const { searchTerm, currentPage } = useSelector(
    (state: RootState) => state.search,
  );
  const [inputValue, setInputValue] = useState(searchTerm);

  useEffect(() => {
    const searchTerm = localStorage.getItem("searchTerm");
    if (searchTerm) {
      dispatch(actions.setSearchTerm(searchTerm));
      setInputValue(searchTerm);
    }
  }, [searchTerm, dispatch]);

  const handleSearch = () => {
    localStorage.setItem("searchTerm", inputValue);
    dispatch(actions.setSearchTerm(inputValue));
    dispatch(actions.setCurrentPage(1));
  };
  const clearSearch = () => {
    localStorage.removeItem("searchTerm");
    setTimeout(() => {
      dispatch(actions.setSearchTerm(""));
      setInputValue("");
    }, 100);
    if (currentPage !== 1) {
      dispatch(actions.setCurrentPage(1));
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
          value={inputValue || ""}
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
