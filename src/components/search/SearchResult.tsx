import { Component } from "react";
import "../../styles/SearchResult.css";
import { Loader } from "../loader/Loader";

export interface ISearchResult {
  name: string;
  id: number;
  type: string;
  status: string;
}

interface SearchResultProps {
  searchResults: ISearchResult[];
  badRequest: boolean;
  loading: boolean;
}

export class SearchResult extends Component<SearchResultProps> {
  renderSearchResults() {
    const { searchResults } = this.props;
    return (
      <ul className="search-result__list">
        {searchResults.map((result) => (
          <li key={result.id}>
            <div className="list__id">{`id: ${result.id}`}</div>
            <div className="list__name">{`name: ${result.name}`}</div>
            {result.type && (
              <div className="list__type">{`type: ${result.type}`}</div>
            )}
            {result.status && (
              <div className="list__status">{`status: ${result.status}`}</div>
            )}
          </li>
        ))}
      </ul>
    );
  }

  renderNoResults() {
    return (
      <section className="search-result">
        <h2 className="search-result__title">no search results:</h2>
        <div className="search-result__bad">
          sorry, your request looks bad, please try again with correct name
        </div>
      </section>
    );
  }

  renderLoading() {
    return (
      <section className="search-result">
        <h2 className="search-result__title">search results:</h2>
        <Loader />
      </section>
    );
  }

  render() {
    const { badRequest, loading } = this.props;

    if (badRequest) {
      return this.renderNoResults();
    }
    if (loading) {
      return this.renderLoading();
    }
    return this.renderSearchResults();
  }
}
