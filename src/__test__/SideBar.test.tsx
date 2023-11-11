import { render, fireEvent, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { waitFor } from "@testing-library/dom";
import { SideBar } from "../components/indexComponents";
import { SearchProvider } from "../components/context/SearchContext";
import { act } from "react-dom/test-utils";

jest.mock("../utils/usefulFuncs", () => ({
  getPhilosopherById: jest.fn(() =>
    Promise.resolve({
      name: "Test Philosopher",
      birth_year: "2000",
      death_year: "2050",
      idea: "Test Idea",
      famous_work: "Test Work",
    }),
  ),
}));

describe("SideBar component", () => {
  test("displays detailed card data correctly", async () => {
    const mockContextValues = {
      searchTerm: "",
      setSearchTerm: jest.fn(),
      searchResponse: undefined,
      setSearchResponse: jest.fn(),
      pageSize: 10,
      setPageSize: jest.fn(),
      loadingResults: false,
      setLoadingResults: jest.fn(),
      loadingDetails: false,
      setLoadingDetails: jest.fn(),
      currentPage: 1,
      setCurrentPage: jest.fn(),
      isSideBarOpen: true,
      setSideBarOpen: jest.fn(),
    };
    const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
      <Router>
        <SearchProvider value={mockContextValues}>{children}</SearchProvider>
      </Router>
    );

    render(<SideBar />, { wrapper: Wrapper });

    await act(async () => {
      await waitFor(() => {
        expect(screen.getByText(/name:/i).textContent).toBeTruthy();
        expect(screen.getByText(/born:/i).textContent).toBeTruthy();
        expect(screen.getByText(/died:/i).textContent).toBeTruthy();
        expect(screen.getByText(/idea:/i).textContent).toBeTruthy();
        expect(screen.getByText(/famous work:/i).textContent).toBeTruthy();
      });
    });
  });

  test("clicking the close button hides the SideBar component", async () => {
    jest.mock("../utils/usefulFuncs", () => ({
      getPhilosopherById: jest.fn(),
    }));
    const mockContextValues = {
      searchTerm: "",
      setSearchTerm: jest.fn(),
      searchResponse: undefined,
      setSearchResponse: jest.fn(),
      pageSize: 10,
      setPageSize: jest.fn(),
      loadingResults: false,
      setLoadingResults: jest.fn(),
      loadingDetails: false,
      setLoadingDetails: jest.fn(),
      currentPage: 1,
      setCurrentPage: jest.fn(),
      isSideBarOpen: true,
      setSideBarOpen: jest.fn(),
    };
    const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
      <Router>
        <SearchProvider value={mockContextValues}>{children}</SearchProvider>
      </Router>
    );

    render(<SideBar />, { wrapper: Wrapper });

    await waitFor(() => {
      expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    });

    act(() => {
      fireEvent.click(screen.getByTestId("close-btn"));
    });

    await waitFor(() => {
      expect(screen.queryByTestId("sidebar")).toBeNull;
    });
  });
  test("displays loading indicator while fetching data", async () => {
    const mockContextValues = {
      searchTerm: "",
      setSearchTerm: jest.fn(),
      searchResponse: undefined,
      setSearchResponse: jest.fn(),
      pageSize: 10,
      setPageSize: jest.fn(),
      loadingResults: false,
      setLoadingResults: jest.fn(),
      loadingDetails: true,
      setLoadingDetails: jest.fn(),
      currentPage: 1,
      setCurrentPage: jest.fn(),
      isSideBarOpen: true,
      setSideBarOpen: jest.fn(),
    };
    const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
      <Router>
        <SearchProvider value={mockContextValues}>{children}</SearchProvider>
      </Router>
    );

    render(<SideBar />, { wrapper: Wrapper });

    await act(async () => {
      await waitFor(() => {
        expect(screen.getByTestId("sidebar")).toBeInTheDocument();
        expect(screen.getByTestId("loader")).toBeInTheDocument();
      });
    });
  });
});
