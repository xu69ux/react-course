import { screen, render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { SearchBar } from "../components/search/SearchBar";

const mockStore = configureMockStore();
const store = mockStore({
  search: {
    searchTerm: "",
  },
});

describe("SearchBar component", () => {
  test("saves the entered value to the local storage when the Search button is clicked", () => {
    Storage.prototype.setItem = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <SearchBar />
      </Provider>,
    );
    fireEvent.change(getByPlaceholderText("enter a philosophical name"), {
      target: { value: "test" },
    });
    fireEvent.click(getByText(/search/i));
    expect(localStorage.setItem).toHaveBeenCalledWith("searchTerm", "test");
  });

  test("retrieves the value from the local storage upon mounting", () => {
    Storage.prototype.getItem = jest.fn(() => "test");
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>,
    );
    expect(localStorage.getItem).toHaveBeenCalledWith("searchTerm");
    const input = screen.getByPlaceholderText(
      "enter a philosophical name",
    ) as HTMLInputElement;
    expect(input.value).toBe("test");
  });
});
