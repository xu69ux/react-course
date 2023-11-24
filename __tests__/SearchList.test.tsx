import { render } from '@testing-library/react';
import { SearchList } from '@components/index';

describe('SearchList', () => {
  const mockResults = [
    { id: 1, name: 'Plato', birth_year: 438, death_year: 347, famous_work: 'The Republic', idea: 'Platonism' },
    { id: 2, name: 'Aristotle', birth_year: 384, death_year: 322, famous_work: 'Nicomachean Ethics', idea: 'Aristotelianism' },
  ];

  it('renders the specified number of items', () => {
    const { getAllByRole } = render(<SearchList results={mockResults} page={1} />);
    const items = getAllByRole('listitem');
    expect(items.length).toBe(mockResults.length);
  });

  it('renders no results message when no results are present', () => {
    const { getByText } = render(<SearchList results={[]} page={1} />);
    expect(getByText('no search results:')).toBeInTheDocument();
    expect(getByText('sorry, your request looks bad, please try again with correct name')).toBeInTheDocument();
  });
});