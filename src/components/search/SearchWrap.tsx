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

interface ISearchWrapProps {
  searchWrapWidth: string;
}

export const SearchWrap: FC<ISearchWrapProps> = (props) => {
  const {
    toggleSideBar,
    isSideBarOpen,
    setSearchResults,
    currentPage,
    pageSize,
    searchTerm,
    setNoResults,
    setLoading,
  } = useSearch();
  const { searchWrapWidth } = props;
  const [totalResults, setTotalResults] = useState<number>(0);

  const searchWrapStyle = {
    width: searchWrapWidth,
  };

  const closeSideBar = () => {
    if (isSideBarOpen) {
      toggleSideBar();
    }
  };

  const handleFetchError = useCallback((error: Error) => {
    if (error instanceof Error) {
      console.log("error message:", error.message);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("searchTerm", searchTerm);
    setNoResults(false);
    setLoading(true);

    const handleResults = (response: ISearchResponse) => {
      if (response.total === 0) {
        setNoResults(true);
      }
      setTotalResults(response.total);
      setSearchResults(response.results);
      setLoading(false);
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
    setLoading,
    handleFetchError,
    setSearchResults,
    totalResults,
  ]);

  return (
    <>
      <div
        className="search-wrap"
        style={searchWrapStyle}
        onClick={closeSideBar}
      >
        {" "}
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
