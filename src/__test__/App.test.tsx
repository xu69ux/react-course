import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { AppContent } from "../App";

describe("App", () => {
  test("navigates to SearchWrap on /search/page/1", () => {
    render(
      <MemoryRouter initialEntries={["/search/page/1"]}>
        <AppContent />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("search-wrap")).toBeInTheDocument();
  });

  test("navigates to NotFound on non-existent route", () => {
    render(
      <MemoryRouter initialEntries={["/non-existent-route"]}>
        <AppContent />
      </MemoryRouter>,
    );

    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });
});
