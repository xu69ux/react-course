import { createContext, useState, FC, ReactNode, useContext } from "react";
import { ISearchResponse, ISearchResult } from "../../types/types";

interface ISearchProviderProps {
  children: ReactNode;
}

interface SearchContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  searchResponse?: ISearchResponse[];
  setSearchResponse?: (response: ISearchResponse[]) => void;
  searchResults: ISearchResult[];
  setSearchResults: (results: ISearchResult[]) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  loadingResults: boolean;
  setLoadingResults: (loading: boolean) => void;
  loadingDetails: boolean;
  setLoadingDetails: (loadingDetails: boolean) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  searchWrapWidth: string;
  setSearchWrapWidth: (width: string) => void;
  noResults: boolean;
  setNoResults: (noResults: boolean) => void;
  isSideBarOpen: boolean;
  setSideBarOpen: (isSideBarOpen: boolean) => void;
}

const defaultSearchContext: SearchContextType = {
  searchTerm: "",
  setSearchTerm: () => {},
  searchResponse: [],
  setSearchResponse: () => {},
  searchResults: [],
  setSearchResults: () => {},
  pageSize: 10,
  setPageSize: () => {},
  loadingResults: false,
  setLoadingResults: () => {},
  loadingDetails: false,
  setLoadingDetails: () => {},
  currentPage: 1,
  setCurrentPage: () => {},
  searchWrapWidth: "100%",
  setSearchWrapWidth: () => {},
  noResults: false,
  setNoResults: () => {},
  isSideBarOpen: false,
  setSideBarOpen: () => {},
};

const SearchContext = createContext<SearchContextType>(defaultSearchContext);

export const useSearch = () => {
  return useContext(SearchContext);
};

export const SearchProvider: FC<ISearchProviderProps> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem("searchTerm") || "",
  );
  const [searchResponse, setSearchResponse] = useState<
    ISearchResponse[] | undefined
  >();
  const [searchResults, setSearchResults] = useState<ISearchResult[]>([]);
  const [noResults, setNoResults] = useState(false);
  const [loadingResults, setLoadingResults] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchWrapWidth, setSearchWrapWidth] = useState("100%");
  const [isSideBarOpen, setSideBarOpen] = useState<boolean>(false);

  const setSearchContext: SearchContextType = {
    searchTerm,
    setSearchTerm,
    searchResponse,
    setSearchResponse,
    searchResults,
    setSearchResults,
    noResults,
    setNoResults,
    loadingResults,
    setLoadingResults,
    loadingDetails,
    setLoadingDetails,
    pageSize,
    setPageSize,
    currentPage,
    setCurrentPage,
    searchWrapWidth,
    setSearchWrapWidth,
    isSideBarOpen,
    setSideBarOpen,
  };

  return (
    <SearchContext.Provider value={setSearchContext}>
      {children}
    </SearchContext.Provider>
  );
};
