import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { SearchResultItem } from "../components/indexComponents";

jest.mock("../services/api", () => ({
  ...jest.requireActual("../services/api"),
  getPhilosopherByIdQuery: jest.fn(),
}));

const mockResult = {
  id: 5,
  name: "Mock Result",
};

const mockStore = configureMockStore([thunk]);
const store = mockStore({
  search: {
    loadingDetails: false,
    isSideBarOpen: false,
  },
});

jest.mock("../services/api", () => ({
  getPhilosopherByIdQuery: jest.fn().mockResolvedValue({
    data: {
      id: 5,
      name: "Mock Result",
      details: "Mock details",
    },
    isLoading: false,
  }),
}));

describe("SearchResultItem component", () => {
  test("renders the relevant item data", () => {
    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <SearchResultItem result={mockResult} onClick={() => {}} />
        </Router>
      </Provider>,
    );

    expect(
      getByText(new RegExp(`id: ${mockResult.id}`, "i")),
    ).toBeInTheDocument();
    expect(
      getByText(new RegExp(`name: ${mockResult.name}`, "i")),
    ).toBeInTheDocument();
  });
});
