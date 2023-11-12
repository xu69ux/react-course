import { useEffect, FC, useCallback, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { useSearch } from "../context/SearchContext";
import { SearchBar } from "../indexComponents";
import { SearchResult } from "../indexComponents";
import { Pagination } from "../indexComponents";
import { ISearchResponse } from "../../types/types";

import logoUrl from "../../assets/philosophy.svg";

import {
  getAllPhilosophers,
  getPhilosopherByName,
} from "../../utils/usefulFuncs";

import "../../styles/SearchWrap.css";

export const SearchWrap: FC = () => {
  const {
    setCurrentPage,
    pageSize,
    searchTerm,
    setLoadingResults,
    setSearchResponse,
    isSideBarOpen,
    setSideBarOpen,
  } = useSearch();

  const [totalResults, setTotalResults] = useState<number>(0);
  const { page } = useParams();

  const currentPage = page ? parseInt(page, 10) : 1;

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

  const hadleClickLogo = () => {
    setSideBarOpen(false);
  };

  useEffect(() => {
    setCurrentPage(currentPage);
  }, [currentPage, setCurrentPage]);

  useEffect(() => {
    setSideBarOpen(false);
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
    setSideBarOpen,
  ]);

  return (
    <>
      <div
        data-testid="search-wrap"
        className="search-wrap"
        style={searchWrapStyle}
      >
        <Link
          to="/"
          className="search-wrap__home-link"
          onClick={hadleClickLogo}
        >
          <img className="search-wrap__logo" src={logoUrl} alt="logo" />
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
