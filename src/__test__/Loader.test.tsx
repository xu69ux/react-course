import { render } from "@testing-library/react";
import { Loader } from "../components/indexComponents";

describe("Loader", () => {
  test("renders without crashing", () => {
    const { getByTestId } = render(<Loader />);
    expect(getByTestId("loader")).toBeInTheDocument();
  });

  test("displays the correct text", () => {
    const { getByText } = render(<Loader />);
    expect(getByText(/metamorphosis/i)).toBeInTheDocument();
  });

  test("renders the correct image", () => {
    const { getByAltText } = render(<Loader />);
    expect(getByAltText(/loader/i)).toHaveAttribute("src", "test-file-stub");
  });
});
