import { render, screen } from "@testing-library/react";
import { SearchResult, SearchResultItem } from "../components/indexComponents";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();
const store = mockStore({
  search: {
    loadingDetails: false,
    isSideBarOpen: false,
    searchResponse: {
      total: 0,
      results: [],
    },
  },
});

describe("SearchResult component", () => {
  test("renders the specified number of items", () => {
    const mockResult = {
      id: 5,
      name: "Mock Result",
    };
    render(
      <Provider store={store}>
        <Router>
          <SearchResultItem result={mockResult} onClick={() => {}} />
        </Router>
      </Provider>,
    );

    const items = screen.getAllByTestId("search-result-item");
    expect(items.length).toBe(1);
  });
  test("renders no results message when no results are present", () => {
    render(
      <Provider store={store}>
        <Router>
          <SearchResult />
        </Router>
      </Provider>,
    );
    const noResultsMessage = screen.getByText(/no search results/i);
    expect(noResultsMessage).toBeInTheDocument();
    const errorMessage = screen.getByText(/sorry, your request looks bad/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
