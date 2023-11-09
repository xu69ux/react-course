import { render, screen } from "@testing-library/react";
import { SearchResult } from "../components/search/SearchResults";

jest.mock("../components/context/SearchContext", () => ({
  useSearch: () => ({
    searchResponse: { results: [], total: 0 },
    loadingResults: false,
    setSideBarOpen: jest.fn(),
  }),
}));

describe("SearchResult component", () => {
  test("renders no results message when no results are present", () => {
    render(<SearchResult />);
    const noResultsMessage = screen.getByText(/no search results/i);
    expect(noResultsMessage).toBeInTheDocument();
    const errorMessage = screen.getByText(/sorry, your request looks bad/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
