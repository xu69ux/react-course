import { useEffect, FC, useCallback, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useSearch } from "../context/SearchContext";
import { SearchBar } from "../indexComponents";
import { SearchResult } from "../indexComponents";
import { Pagination } from "../indexComponents";
import { ISearchResponse } from "../../types/types";

import {
  getAllPhilosophers,
  getPhilosopherByName,
} from "../../utils/usefulFuncs";

import logo from "../../assets/philosophy.svg";
import "../../styles/SearchWrap.css";

export const SearchWrap: FC = () => {
  const {
    setSearchResults,
    currentPage,
    pageSize,
    searchTerm,
    setNoResults,
    setLoadingResults,
    searchWrapWidth,
  } = useSearch();
  const [totalResults, setTotalResults] = useState<number>(0);

  const searchWrapStyle = {
    width: searchWrapWidth,
  };

  const handleFetchError = useCallback((error: Error) => {
    if (error instanceof Error) {
      console.log("error message:", error.message);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("searchTerm", searchTerm);
    setNoResults(false);
    setLoadingResults(true);

    const handleResults = (response: ISearchResponse) => {
      if (response.total === 0) {
        setNoResults(true);
      }
      setTotalResults(response.total);
      setSearchResults(response.results);
      setLoadingResults(false);
    };

    if (searchTerm.trim() === "") {
      getAllPhilosophers(currentPage, pageSize)
        .then(handleResults)
        .catch(handleFetchError);
    } else {
      getPhilosopherByName(searchTerm, currentPage, pageSize)
        .then(handleResults)
        .catch(handleFetchError);
    }
  }, [
    searchTerm,
    currentPage,
    pageSize,
    setNoResults,
    setLoadingResults,
    handleFetchError,
    setSearchResults,
    totalResults,
  ]);

  return (
    <>
      <div className="search-wrap" style={searchWrapStyle}>
        <Link to="/search/page/1" className="search-wrap__home-link">
          <img className="search-wrap__logo" src={logo} alt="logo" />
        </Link>
        <h1 className="search-wrap__title">Filosofem API</h1>
        <SearchBar />
        <Pagination totalResults={totalResults} />
        <SearchResult />
      </div>
      <Outlet />
    </>
  );
};
