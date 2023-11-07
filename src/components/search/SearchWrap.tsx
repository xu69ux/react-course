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
    currentPage,
    pageSize,
    searchTerm,
    setLoadingResults,
    setSearchResponse,
    isSideBarOpen,
  } = useSearch();

  const [totalResults, setTotalResults] = useState<number>(0);

  const searchWrapStyle = {
    width: "100%",
  };

  if (isSideBarOpen) {
    searchWrapStyle.width = "65%";
  }

  const handleFetchError = useCallback((error: Error) => {
    if (error instanceof Error) {
      console.log("error message:", error.message);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("searchTerm", searchTerm);
    setLoadingResults(true);

    const handleResults = (response: ISearchResponse) => {
      setTotalResults(response.total);
      setLoadingResults(false);
      if (setSearchResponse) {
        setSearchResponse(response);
      }
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
    setLoadingResults,
    handleFetchError,
    totalResults,
    setSearchResponse,
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
