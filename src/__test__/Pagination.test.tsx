import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { SearchProvider } from "../components/context/SearchContext";
import { Pagination } from "../components/indexComponents";

describe("Pagination component", () => {
  test("updates URL query parameter when page number changes", () => {
    const totalResults = 100;

    render(
      <MemoryRouter initialEntries={["/search/page/1"]}>
        <SearchProvider>
          <Routes>
            <Route
              path="search/page/:page/*"
              element={<Pagination totalResults={totalResults} />}
            />
          </Routes>
        </SearchProvider>
      </MemoryRouter>,
    );

    const nextPageButton = screen.getByTestId("next-page");
    fireEvent.click(nextPageButton);

    expect(screen.getByText(/Page 2/i)).toBeInTheDocument();
  });

  test("updates URL query parameter when page size changes", () => {
    const totalResults = 100;

    render(
      <MemoryRouter initialEntries={["/search/page/1"]}>
        <SearchProvider>
          <Routes>
            <Route
              path="search/page/:page/*"
              element={<Pagination totalResults={totalResults} />}
            />
          </Routes>
        </SearchProvider>
      </MemoryRouter>,
    );

    const incrementButton = screen.getByText("+");
    fireEvent.click(incrementButton);

    expect(screen.getByText(/Page 1/i)).toBeInTheDocument();
  });
});
