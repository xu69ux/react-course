import { render, fireEvent, screen } from "@testing-library/react";
import { Routes, Route, MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import * as ReactRouterDom from "react-router-dom";

import { Pagination } from "../components/indexComponents";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("../services/api", () => ({
  getAllPhilosophers: jest.fn().mockResolvedValue({
    data: {
      name: "Test Philosopher",
      birth_year: "2000",
      death_year: "2050",
      idea: "Test Idea",
      famous_work: "Test Work",
    },
  }),
}));
const mockStore = configureMockStore();
const store = mockStore({
  search: {
    searchTerm: "",
    pageSize: 10,
    loadingResults: false,
    loadingDetails: false,
    currentPage: 1,
    isSideBarOpen: true,
  },
});
const totalResults = 100;
const initialRoute = "/search/page/1";

describe("Pagination component", () => {
  test("updates URL query parameter when page number changes", async () => {
    const navigate = jest.fn();
    jest.spyOn(ReactRouterDom, "useNavigate").mockReturnValue(navigate);
    render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <Provider store={store}>
          <Routes>
            <Route
              path="search/page/:page/*"
              element={<Pagination totalResults={totalResults} />}
            />
          </Routes>
        </Provider>
      </MemoryRouter>,
    );

    const nextPageButton = await screen.findByTestId("next-page");
    fireEvent.click(nextPageButton);
    expect(navigate).toHaveBeenCalledWith("/search/page/2");
  });

  test("updates URL query parameter when page size changes", async () => {
    const navigate = jest.fn();
    jest.spyOn(ReactRouterDom, "useNavigate").mockReturnValue(navigate);
    render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <Provider store={store}>
          <Routes>
            <Route
              path="search/page/:page/*"
              element={<Pagination totalResults={totalResults} />}
            />
          </Routes>
        </Provider>
      </MemoryRouter>,
    );

    const incrementButton = await screen.findByText("+");
    fireEvent.click(incrementButton);
    expect(navigate).toHaveBeenCalledWith("/search/page/1");
  });
});
