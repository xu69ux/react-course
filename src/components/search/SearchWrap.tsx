import { useEffect, useState } from "react";
import { SearchBar } from "./SearchBar";
import { SearchResult } from "./SearchResult";
import { ISearchResult } from "./SearchResult";

import { getAllCharacters, getCharactersByName } from "../../utils/usefulFuncs";

import logo from "../../assets/rickandmorty.png";
import "../../styles/SearchWrap.css";

interface SearchWrapProps {
  searchWrapWidth: string;
  isSideBarOpen: boolean;
  toggleSideBar: () => void;
}

export const SearchWrap: React.FC<SearchWrapProps> = (props) => {
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem("searchTerm") || "",
  );
  const [searchResults, setSearchResults] = useState<ISearchResult[]>([]);
  const [badRequest, setBadRequest] = useState(false);
  const [loading, setLoading] = useState(false);
  const { searchWrapWidth, isSideBarOpen, toggleSideBar } = props;
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
    <div className="search-wrap" style={searchWrapStyle} onClick={closeSideBar}>
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
