import { render, screen } from "@testing-library/react";
import { ErrorBoundary } from "../components/indexComponents";

const ErrorComponent = () => {
  throw new Error("Test error");
};

describe("ErrorBoundary", () => {
  test("displays fallback UI when child component throws an error", () => {
    render(
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <ErrorComponent />
      </ErrorBoundary>,
    );

    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
  });

  it("does not display fallback UI when child component does not throw an error", () => {
    render(
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <div>Everything is fine</div>
      </ErrorBoundary>,
    );

    expect(screen.getByText(/Everything is fine/i)).toBeInTheDocument();
    expect(screen.queryByText(/Something went wrong/i)).not.toBeInTheDocument();
  });
});
