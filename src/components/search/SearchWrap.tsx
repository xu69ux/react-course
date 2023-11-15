import { useEffect, FC, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../redux/slices/searchSlice";
import { RootState } from "../../redux/store";
import { SearchBar } from "../indexComponents";
import { SearchResult } from "../indexComponents";
import { Pagination } from "../indexComponents";
import {
  useGetAllPhilosophersQuery,
  useGetPhilosopherByNameQuery,
} from "../../services/api";
import { IPhilosophersResponse, ISearchResponse } from "../../types/types";
import logoUrl from "../../assets/philosophy.svg";

import "../../styles/SearchWrap.css";

export const SearchWrap: FC = () => {
  const dispatch = useDispatch();
  const { page } = useParams();
  const currentPage = page ? parseInt(page, 10) : 1;
  const { pageSize, searchTerm, isSideBarOpen, viewMode } = useSelector(
    (state: RootState) => state.search,
  );
  const { data: allPhilosophersData } = useGetAllPhilosophersQuery({
    page: currentPage,
    pageSize,
  }) as { data?: IPhilosophersResponse };
  const { data: philosopherByNameData } = useGetPhilosopherByNameQuery({
    searchTerm,
    page: currentPage,
    pageSize,
  }) as { data?: IPhilosophersResponse };
  const [totalResults, setTotalResults] = useState<number>(0);
  const searchWrapStyle = {
    width: viewMode,
  };

  useEffect(() => {
    if (isSideBarOpen) {
      dispatch(actions.setViewMode("65%"));
    } else {
      dispatch(actions.setViewMode("100%"));
    }
  }, [isSideBarOpen, dispatch]);

  const hadleClickLogo = () => {
    dispatch(actions.setSideBarOpen(false));
  };

  useEffect(() => {
    dispatch(actions.setCurrentPage(currentPage));
  }, [currentPage, dispatch]);

  useEffect(() => {
    dispatch(actions.setSideBarOpen(false));
    dispatch(actions.setLoadingResults(true));

    const handleResults = (response: ISearchResponse) => {
      setTotalResults(response.total);
      dispatch(actions.setLoadingResults(false));
      dispatch(actions.setSearchResponse(response));
    };
    if (searchTerm.trim() === "") {
      if (allPhilosophersData) {
        handleResults(allPhilosophersData as unknown as ISearchResponse);
      }
    } else {
      if (philosopherByNameData) {
        handleResults(philosopherByNameData as unknown as ISearchResponse);
      }
    }
  }, [allPhilosophersData, philosopherByNameData, searchTerm, dispatch]);

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
