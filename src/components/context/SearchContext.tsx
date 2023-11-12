import { createContext, useState, FC, ReactNode, useContext } from "react";
import { ISearchResponse } from "../../types/types";

interface ISearchProviderProps {
  children: ReactNode;
  value?: SearchContextType;
}

export interface SearchContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  searchResponse?: ISearchResponse;
  setSearchResponse?: (response: ISearchResponse) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  loadingResults: boolean;
  setLoadingResults: (loading: boolean) => void;
  loadingDetails: boolean;
  setLoadingDetails: (loadingDetails: boolean) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  isSideBarOpen: boolean;
  setSideBarOpen: (isSideBarOpen: boolean) => void;
}

const defaultSearchContext: SearchContextType = {
  searchTerm: "",
  setSearchTerm: () => {},
  searchResponse: undefined,
  setSearchResponse: () => {},
  pageSize: 10,
  setPageSize: () => {},
  loadingResults: false,
  setLoadingResults: () => {},
  loadingDetails: false,
  setLoadingDetails: () => {},
  currentPage: 1,
  setCurrentPage: () => {},
  isSideBarOpen: false,
  setSideBarOpen: () => {},
};

const SearchContext = createContext<SearchContextType>(defaultSearchContext);

export const useSearch = () => {
  return useContext(SearchContext);
};

export const SearchProvider: FC<ISearchProviderProps> = ({
  children,
  value,
}) => {
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem("searchTerm") || "",
  );
  const [searchResponse, setSearchResponse] = useState<
    ISearchResponse | undefined
  >();
  const [loadingResults, setLoadingResults] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isSideBarOpen, setSideBarOpen] = useState<boolean>(false);

  const setSearchContext: SearchContextType = {
    searchTerm,
    setSearchTerm,
    searchResponse,
    setSearchResponse,
    loadingResults,
    setLoadingResults,
    loadingDetails,
    setLoadingDetails,
    pageSize,
    setPageSize,
    currentPage,
    setCurrentPage,
    isSideBarOpen,
    setSideBarOpen,
  };

  return (
    <SearchContext.Provider value={value || setSearchContext}>
      {children}
    </SearchContext.Provider>
  );
};
