import { Link } from "react-router-dom";
import { Loader } from "../loader/Loader";

import "../../styles/SearchResult.css";

export interface ISearchResult {
  name: string;
  id: number;
}

interface SearchResultProps {
  searchResults: ISearchResult[];
  badRequest: boolean;
  loading: boolean;
  toggleSideBar: () => void;
  isSideBarOpen: boolean;
}

export const SearchResult: React.FC<SearchResultProps> = (props) => {
  const { searchResults, badRequest, loading, toggleSideBar } = props;
  const renderSearchResults = () => {
    return (
      <>
        <h2 className="search-result__title">search results:</h2>
        <ul className="search-result__list">
          {searchResults.map((result: ISearchResult) => (
            <li key={result.id}>
              <Link
                to={`details/${result.id}`}
                className="list__link"
                onClick={toggleSideBar}
              >
                <div className="list__id">{`id: ${result.id}`}</div>
                <div className="list__name">{`name: ${result.name}`}</div>
              </Link>
            </li>
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

  if (badRequest) {
    return renderNoResults();
  }
  if (loading) {
    return renderLoading();
  }
  return renderSearchResults();
};
