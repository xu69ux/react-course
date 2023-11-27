import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';
import { SearchList } from '../components/index';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('SearchList', () => {
  const mockResults = [
    { id: 1, name: 'Plato', birth_year: 438, death_year: 347, famous_work: 'The Republic', idea: 'Platonism' },
    { id: 2, name: 'Aristotle', birth_year: 384, death_year: 322, famous_work: 'Nicomachean Ethics', idea: 'Aristotelianism' },
  ];

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {},
    });
  });

  test('renders the specified number of items', () => {
    render(<SearchList results={mockResults} page={1} />);
    const items = screen.getAllByRole('listitem');
    expect(items.length).toBe(mockResults.length);
  });

  test('renders no results message when no results are present', () => {
    render(<SearchList results={[]} page={1} />);
    expect(screen.getByText('no search results:')).toBeInTheDocument();
    expect(screen.getByText('sorry, your request looks bad, please try again with correct name')).toBeInTheDocument();
  });
});