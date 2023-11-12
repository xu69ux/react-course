import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { SearchWrap } from "../components/indexComponents";
import { useSearch } from "../components/context/SearchContext";

jest.mock("../components/context/SearchContext");

describe("SearchWrap", () => {
  beforeEach(() => {
    (useSearch as jest.Mock).mockReturnValue({
      setCurrentPage: jest.fn(),
      pageSize: 10,
      searchTerm: "",
      setLoadingResults: jest.fn(),
      setSearchResponse: jest.fn(),
      isSideBarOpen: false,
      setSideBarOpen: jest.fn(),
    });
  });

  test("renders without crashing", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <SearchWrap />
      </BrowserRouter>,
    );
    expect(getByTestId("search-wrap")).toBeInTheDocument();
  });
});
