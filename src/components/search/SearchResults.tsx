import { FC } from "react";
import { Loader } from "../indexComponents";
import { SearchResultItem } from "./SearchResultItem";
import { useSearch } from "../context/SearchContext";
import { ISearchResult } from "../../types/types";

import "../../styles/SearchResult.css";

export const SearchResult: FC = () => {
  const { searchResponse, loadingResults, setSideBarOpen } = useSearch();
  const handleOpenSideBar = () => {
    setSideBarOpen(true);
  };

  const renderSearchResults = () => {
    return (
      <>
        <h2 className="search-result__title">search results:</h2>
        <ul className="search-result__list">
          {searchResponse?.results.map((result: ISearchResult) => (
            <SearchResultItem
              key={result.id}
              result={result}
              onClick={handleOpenSideBar}
            />
          ))}
        </ul>
      </>
    );
  };

  const renderNoResults = () => {
    return (
      <section className="search-result">
        <h2 className="search-result__title">no search results:</h2>
        <div className="search-result__bad">
          sorry, your request looks bad, please try again with correct name
        </div>
      </section>
    );
  };

  const renderLoading = () => {
    return (
      <section className="search-result">
        <h2 className="search-result__title">search results:</h2>
        <Loader />
      </section>
    );
  };

  if (searchResponse?.total === 0) {
    return renderNoResults();
  }
  if (loadingResults) {
    return renderLoading();
  }
  return renderSearchResults();
};
