import { screen, render, fireEvent } from "@testing-library/react";
import { SearchBar } from "../components/search/SearchBar";

jest.mock("../components/context/SearchContext", () => ({
  useSearch: () => ({
    setSearchResponse: jest.fn(),
    setLoadingResults: jest.fn(),
    setSearchTerm: jest.fn(),
    setCurrentPage: jest.fn(),
  }),
}));

describe("SearchBar component", () => {
  test("saves the entered value to the local storage when the Search button is clicked", () => {
    Storage.prototype.setItem = jest.fn();
    const { getByPlaceholderText, getByText } = render(<SearchBar />);
    fireEvent.change(getByPlaceholderText("enter a philosophical name"), {
      target: { value: "test" },
    });
    fireEvent.click(getByText("search"));
    expect(localStorage.setItem).toHaveBeenCalledWith("searchTerm", "test");
  });

  test("retrieves the value from the local storage upon mounting", () => {
    Storage.prototype.getItem = jest.fn(() => "test");
    render(<SearchBar />);
    expect(localStorage.getItem).toHaveBeenCalledWith("searchTerm");
    const input = screen.getByPlaceholderText(
      "enter a philosophical name",
    ) as HTMLInputElement;
    expect(input.value).toBe("test");
  });
});
