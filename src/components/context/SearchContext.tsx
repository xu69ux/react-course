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
  loading: boolean;
  setLoading: (loading: boolean) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  noResults: boolean;
  setNoResults: (noResults: boolean) => void;
  isSideBarOpen: boolean;
  setSideBarOpen: (isSideBarOpen: boolean) => void;
  toggleSideBar: () => void;
}

const defaultSearchContext: SearchContextType = {
  searchTerm: "",
  setSearchTerm: () => {},
  searchResults: [],
  setSearchResults: () => {},
  pageSize: 10,
  setPageSize: () => {},
  loading: false,
  setLoading: () => {},
  currentPage: 1,
  setCurrentPage: () => {},
  noResults: false,
  setNoResults: () => {},
  isSideBarOpen: false,
  setSideBarOpen: () => {},
  toggleSideBar: () => {},
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
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isSideBarOpen, setSideBarOpen] = useState<boolean>(false);
  const toggleSideBar = () => {
    setSideBarOpen((prevState) => !prevState);
  };

  const setSearchContext: SearchContextType = {
    searchTerm,
    setSearchTerm,
    searchResponse,
    setSearchResponse,
    searchResults,
    setSearchResults,
    noResults,
    setNoResults,
    loading,
    setLoading,
    pageSize,
    setPageSize,
    currentPage,
    setCurrentPage,
    isSideBarOpen,
    setSideBarOpen,
    toggleSideBar,
  };

  return (
    <SearchContext.Provider value={setSearchContext}>
      {children}
    </SearchContext.Provider>
  );
};
