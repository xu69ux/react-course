import { render, fireEvent, waitFor } from "@testing-library/react";
import { SearchBar } from "../components/indexComponents";
import { act } from "react-dom/test-utils";

describe("SearchBar component", () => {
  test("saves the entered value to local storage when Search button is clicked", () => {
    const { getByPlaceholderText, getByText } = render(<SearchBar />);
    const input = getByPlaceholderText("enter a philosophical name");
    const searchButton = getByText("search");
    jest.spyOn(Storage.prototype, "setItem");
    fireEvent.change(input, { target: { value: "TestValue" } });
    fireEvent.click(searchButton);
    expect(Storage.prototype.setItem).toHaveBeenCalledTimes(1);
    jest.clearAllMocks();
  });
  test("component retrieves the value from the local storage upon mounting", async () => {
    window.localStorage.setItem("SearchTerm", "TestValue");
    let getByPlaceholderTextResult: (text: string) => HTMLElement;
    act(() => {
      getByPlaceholderTextResult = render(<SearchBar />).getByPlaceholderText;
    });

    await waitFor(() => {
      const input = getByPlaceholderTextResult(
        "enter a philosophical name",
      ) as HTMLInputElement;

      act(() => {
        input.value = window.localStorage.getItem("SearchTerm") || "";
        fireEvent.input(input);
      });

      expect(input).toHaveValue("TestValue");
    });
  });
});
