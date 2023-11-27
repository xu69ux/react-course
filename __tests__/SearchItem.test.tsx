import { render, screen } from '@testing-library/react';
import { SearchItem } from '@components/index';

const mockResult = {
  id: 5,
  name: "Mock Result",
  birth_year: 0,
  death_year: 0,
  famous_work: "Mock Work",
  idea: "Mock Idea",
};

jest.mock('next/router', () => ({
  useRouter: () => ({
    route: '/',
    pathname: '',
    query: '',
    asPath: '',
  }),
}));

describe("SearchItem component", () => {
  test("renders the relevant item data", () => {
    render(
      <SearchItem philosopher={mockResult} page={1} />
    );

    expect(
      screen.getByText(new RegExp(`${mockResult.id}`, "i")),
    ).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(`${mockResult.name}`, "i")),
    ).toBeInTheDocument();
  });
});