import { render, screen } from "@testing-library/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NotFound } from "../components/pages/NotFoundPage";
import { App } from "../App";

test("renders NotFound component for invalid route", () => {
  render(
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>,
  );

  expect(screen.getByText(/not found/i)).toBeInTheDocument();
});

test("renders NotFound component for invalid route in the entire app", () => {
  render(<App />);
  window.history.pushState({}, "Fake Page", "/fake-route");
  expect(screen.getByText(/not found/i)).toBeInTheDocument();
});
