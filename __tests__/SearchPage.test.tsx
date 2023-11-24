import { render } from '@testing-library/react';
import SearchPage from './../pages/search/[page]';

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { page: '1' },
    push: jest.fn(),
  }),
}));

describe('SearchPage', () => {
  const mockProps = {
    total: 10,
    results: [
      { id: 1, name: 'Plato', birth_year: 427, death_year: 347, famous_work: 'The Republic', idea: 'Platonism' },
      { id: 2, name: 'Aristotle', birth_year: 384, death_year: 322, famous_work: 'Nicomachean Ethics', idea: 'Aristotelianism' },
    ],
    limit: 10,
    page: 1,
  };

  test('renders search page', () => {
    const { getByText } = render(<SearchPage {...mockProps} />);
    expect(getByText('Plato')).toBeInTheDocument();
    expect(getByText('Aristotle')).toBeInTheDocument();
  });

  test('renders components', () => {
    const { getByTestId } = render(<SearchPage {...mockProps} />);
    expect(getByTestId('search-input')).toBeInTheDocument();
    expect(getByTestId('limitation')).toBeInTheDocument();
    expect(getByTestId('search-list')).toBeInTheDocument();
    expect(getByTestId('pagination')).toBeInTheDocument();
    expect(getByTestId('error-boundary-button')).toBeInTheDocument();
  });

});