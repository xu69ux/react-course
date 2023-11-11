import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { SearchResultItem } from "../components/indexComponents";

const mockResult = {
  id: 5,
  name: "Mock Result",
};

describe("SearchResultItem component", () => {
  test("renders the relevant item data", () => {
    const { getByText } = render(
      <Router>
        <SearchResultItem result={mockResult} onClick={() => {}} />
      </Router>,
    );

    expect(getByText(`id: ${mockResult.id}`)).toBeInTheDocument();
    expect(getByText(`name: ${mockResult.name}`)).toBeInTheDocument();
  });

  test("opens a detailed item component when clicked", () => {
    const mockClick = jest.fn();

    const { getByText } = render(
      <Router>
        <SearchResultItem result={mockResult} onClick={mockClick} />
      </Router>,
    );

    fireEvent.click(getByText(`id: ${mockResult.id}`));

    expect(mockClick).toHaveBeenCalled();
  });
});
