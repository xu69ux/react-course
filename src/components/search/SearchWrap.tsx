import { useEffect, useState, useRef, FC } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { SearchBar } from "../indexComponents";
import { SearchResult } from "../indexComponents";
import { Pagination } from "../indexComponents";
import { ISearchResult } from "./SearchResult";

import {
  getAllPhilosophers,
  getPhilosopherByName,
} from "../../utils/usefulFuncs";

import logo from "../../assets/philosophy.svg";
import "../../styles/SearchWrap.css";

interface IResponse {
  results: ISearchResult[];
  total: number;
}
interface SearchWrapProps {
  page: number;
  searchWrapWidth: string;
  isSideBarOpen: boolean;
  setPage: (page: number) => void;
  toggleSideBar: () => void;
}

export const SearchWrap: FC<SearchWrapProps> = (props) => {
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem("searchTerm") || "",
  );
  const [searchResults, setSearchResults] = useState<ISearchResult[]>([]);
  const [noResults, setNoResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState<number>(10);
  const totalCount = useRef<number>(0);
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

  const handleResults = (response: IResponse) => {
    if (response.total === 0) {
      setNoResults(true);
    }
    totalCount.current = response.total;
    setSearchResults(response.results);
    setLoading(false);
  };

  const handleFetchError = (error: Error) => {
    if (error instanceof Error) {
      console.log("error message:", error.message);
    }
  };

  useEffect(() => {
    localStorage.setItem("searchTerm", searchTerm);
    setNoResults(false);
    setLoading(true);

    if (searchTerm.trim() === "") {
      getAllPhilosophers(currentPage, pageSize)
        .then(handleResults)
        .catch(handleFetchError);
    } else {
      getPhilosopherByName(searchTerm, currentPage, pageSize)
        .then(handleResults)
        .catch(handleFetchError);
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
        <h1 className="search-wrap__title">Filosofem API</h1>
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          currentPage={currentPage}
        />
        <Pagination
          setPage={setPage}
          totalCount={totalCount.current}
          loading={loading}
          pageSize={pageSize}
          setPageSize={setPageSize}
          noResults={noResults}
        />
        <SearchResult
          searchResults={searchResults}
          noResults={noResults}
          loading={loading}
          toggleSideBar={toggleSideBar}
          isSideBarOpen={isSideBarOpen}
        />
      </div>
      <Outlet />
    </>
  );
};
