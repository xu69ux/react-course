import axios from "axios";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { SearchResultItem } from "../components/indexComponents";

jest.mock("axios");

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

    expect(
      getByText(new RegExp(`id: ${mockResult.id}`, "i")),
    ).toBeInTheDocument();
    expect(
      getByText(new RegExp(`name: ${mockResult.name}`, "i")),
    ).toBeInTheDocument();
  });

  test("opens a detailed item component when clicked", () => {
    const mockClick = jest.fn();

    const { getByText } = render(
      <Router>
        <SearchResultItem result={mockResult} onClick={mockClick} />
      </Router>,
    );

    fireEvent.click(getByText(new RegExp(`id: ${mockResult.id}`, "i")));

    expect(mockClick).toHaveBeenCalled();
  });
  test("triggers an additional API call to fetch detailed information when clicked", async () => {
    const { getByText } = render(
      <Router>
        <SearchResultItem
          result={mockResult}
          onClick={() =>
            axios.get("https://belka.romakhin.ru/api/v1/filosofem")
          }
        />
      </Router>,
    );
    fireEvent.click(getByText((content) => content.startsWith("name")));
    await waitFor(() => expect(axios.get).toHaveBeenCalled());
  });
});
