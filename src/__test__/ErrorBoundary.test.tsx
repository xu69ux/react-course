import { render } from "@testing-library/react";
import { ErrorBoundary } from "../components/indexComponents";

const ChildComponent = () => {
  throw new Error("Test error");
};

const FallbackComponent = () => <div>the application crashed</div>;

describe("ErrorBoundary", () => {
  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterAll(() => {
    (console.error as jest.Mock).mockRestore();
  });

  it("catches error and displays fallback UI", () => {
    const { getByText } = render(
      <ErrorBoundary fallback={<FallbackComponent />}>
        <ChildComponent />
      </ErrorBoundary>,
    );

    expect(getByText(/the application crashed/i)).toBeInTheDocument();
  });
});
