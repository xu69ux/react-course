import { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import { SearchResult } from "./SearchResult";
import { ISearchResult } from "./SearchResult";
import { Pagination } from "../pagination/Pagination";

import {
  getAllPhilosophers,
  getPhilosopherByName,
} from "../../utils/usefulFuncs";

import logo from "../../assets/rickandmorty-white.png";
import "../../styles/SearchWrap.css";

interface SearchWrapProps {
  searchWrapWidth: string;
  isSideBarOpen: boolean;
  toggleSideBar: () => void;
  page: number;
  setPage: (page: number) => void;
}

export const SearchWrap: React.FC<SearchWrapProps> = (props) => {
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem("searchTerm") || "",
  );
  const [searchResults, setSearchResults] = useState<ISearchResult[]>([]);
  const [badRequest, setBadRequest] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState<number>(10);
  const params = useParams();
  const currentPage = Number(params.page);
  const { searchWrapWidth, isSideBarOpen, toggleSideBar, setPage } = props;
  const searchWrapStyle = {
    width: searchWrapWidth,
  };
  const closeSideBar = () => {
    if (isSideBarOpen) {
      toggleSideBar();
    }
  };

  useEffect(() => {
    localStorage.setItem("searchTerm", searchTerm);
    setBadRequest(false);
    setLoading(true);

    if (searchTerm.trim() === "") {
      getAllPhilosophers(currentPage, pageSize)
        .then((results) => {
          setSearchResults(results);
          setLoading(false);
        })
        .catch((error) => {
          if (error instanceof Error) {
            console.log("error message:", error.message);
          }
        });
    } else {
      getPhilosopherByName(searchTerm, currentPage, pageSize)
        .then((results) => {
          setSearchResults(results);
          setLoading(false);
        })
        .catch((error) => {
          if (error instanceof Error) {
            console.log("error message:", error.message);
          }
        });
    }
  }, [searchTerm, currentPage, pageSize]);

  return (
    <>
      <div
        className="search-wrap"
        style={searchWrapStyle}
        onClick={closeSideBar}
      >
        {" "}
        <Link to="/search/page/1" className="search-wrap__home-link">
          <img className="search-wrap__logo" src={logo} />
        </Link>
        <h1 className="search-wrap__title">The Rick and Morty API</h1>
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          currentPage={currentPage}
        />
        <Pagination
          setPage={setPage}
          totalPages={4}
          loading={loading}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
        <SearchResult
          searchResults={searchResults}
          badRequest={badRequest}
          loading={loading}
          toggleSideBar={toggleSideBar}
          isSideBarOpen={isSideBarOpen}
        />
      </div>
      <Outlet />
    </>
  );
};
