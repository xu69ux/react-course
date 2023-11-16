import { render, screen } from "@testing-library/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NotFound } from "../components/pages/NotFoundPage";

describe("NotFoundPage component", () => {
  test("renders NotFound component for invalid route", () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<div>home</div>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>,
    );
    window.history.pushState({}, "", "/invalid-route");
    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });
});
