import { render, screen } from "@testing-library/react";
import { SearchResult } from "../components/search/SearchResults";
import {
  SearchProvider,
  SearchContextType,
} from "../components/context/SearchContext";
import { BrowserRouter as Router } from "react-router-dom";

describe("SearchResult component", () => {
  test("renders the specified number of items", () => {
    const mockContextValues: SearchContextType = {
      searchTerm: "",
      setSearchTerm: jest.fn(),
      searchResponse: {
        results: [{ id: 1, name: "Test" }],
        total: 1,
      },
      setSearchResponse: jest.fn(),
      pageSize: 10,
      setPageSize: jest.fn(),
      loadingResults: false,
      setLoadingResults: jest.fn(),
      loadingDetails: false,
      setLoadingDetails: jest.fn(),
      currentPage: 1,
      setCurrentPage: jest.fn(),
      isSideBarOpen: false,
      setSideBarOpen: jest.fn(),
    };
    const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
      <Router>
        <SearchProvider value={mockContextValues}>{children}</SearchProvider>
      </Router>
    );
    render(<SearchResult />, { wrapper: Wrapper });

    const items = screen.getAllByTestId("search-result-item");
    expect(items.length).toBe(1);
  });
  test("renders no results message when no results are present", () => {
    const mockContextValues: SearchContextType = {
      searchTerm: "",
      setSearchTerm: jest.fn(),
      searchResponse: {
        results: [],
        total: 0,
      },
      setSearchResponse: jest.fn(),
      pageSize: 10,
      setPageSize: jest.fn(),
      loadingResults: false,
      setLoadingResults: jest.fn(),
      loadingDetails: false,
      setLoadingDetails: jest.fn(),
      currentPage: 1,
      setCurrentPage: jest.fn(),
      isSideBarOpen: false,
      setSideBarOpen: jest.fn(),
    };
    const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
      <Router>
        <SearchProvider value={mockContextValues}>{children}</SearchProvider>
      </Router>
    );
    render(<SearchResult />, { wrapper: Wrapper });
    const noResultsMessage = screen.getByText(/no search results/i);
    expect(noResultsMessage).toBeInTheDocument();
    const errorMessage = screen.getByText(/sorry, your request looks bad/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
