import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "../redux/store";
import { SearchWrap } from "../components/indexComponents";

test("renders without crashing", () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <Router>
        <SearchWrap />
      </Router>
    </Provider>,
  );
  expect(getByTestId("search-wrap")).toBeInTheDocument();
});
