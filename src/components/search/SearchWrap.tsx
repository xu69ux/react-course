import { useEffect, useState } from "react";
import { SearchBar } from "./SearchBar";
import { SearchResult } from "./SearchResult";
import { ISearchResult } from "./SearchResult";

import { getAllCharacters, getCharactersByName } from "../../utils/usefulFuncs";

import logo from "../../assets/rickandmorty.png";
import "../../styles/SearchWrap.css";

export const SearchWrap: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem("searchTerm") || "",
  );
  const [searchResults, setSearchResults] = useState<ISearchResult[]>([]);
  const [badRequest, setBadRequest] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("searchTerm", searchTerm);
    setBadRequest(false);
    setLoading(true);

    if (searchTerm.trim() === "") {
      getAllCharacters()
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
      getCharactersByName(searchTerm)
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
  }, [searchTerm]);

  return (
    <div className="search-wrap">
      <img className="search-wrap__logo" src={logo} />
      <h1 className="search-wrap__title">The Rick and Morty API</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <SearchResult
        searchResults={searchResults}
        badRequest={badRequest}
        loading={loading}
      />
    </div>
  );
};
