import { render, screen, fireEvent } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import { getServerSideProps } from '../pages/search/[page]';
import SearchPage from './../pages/search/[page]';

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { page: '1' },
    push: jest.fn(),
  }),
}));

fetchMock.enableMocks();


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
    render(<SearchPage {...mockProps} />);
    expect(screen.getByText('Plato')).toBeInTheDocument();
    expect(screen.getByText('Aristotle')).toBeInTheDocument();
  });

  test('renders components', () => {
    render(<SearchPage {...mockProps} />);
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByTestId('limitation')).toBeInTheDocument();
    expect(screen.getByTestId('search-list')).toBeInTheDocument();
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
    expect(screen.getByTestId('error-boundary-button')).toBeInTheDocument();
  });

  test('renders SearchPage with different props', () => {
    const differentProps = {
      total: 20,
      results: [
        { id: 3, name: 'Socrates', birth_year: 469, death_year: 399, famous_work: 'Socratic dialogues', idea: 'Socratic method' },
      ],
      limit: 10,
      page: 2,
    };

    render(<SearchPage {...differentProps} />);
    expect(screen.getByText('Socrates')).toBeInTheDocument();
    expect(screen.getByText('10 per page')).toBeInTheDocument();
  });

  test('renders SearchPage with no results', () => {
    const noResultsProps = {
      total: 0,
      results: [],
      limit: 10,
      page: 1,
    };

    render(<SearchPage {...noResultsProps} />);
    expect(screen.getByText('10 per page')).toBeInTheDocument();
    expect(screen.queryByText('Socrates')).not.toBeInTheDocument();
  });

  test('responds correctly when the user interacts with the SearchInput component', () => {
    render(<SearchPage {...mockProps} />);
    fireEvent.change(screen.getByTestId('input'), { target: { value: 'test' } });
    expect(screen.getByTestId('input')).toHaveValue('test');
  });

  test('fetches data correctly', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ total: 10, results: [], limit: 10, page: 1 }));

    const context = {
      params: { page: '1' },
      query: { limit: '10' },
    };
    const response = await getServerSideProps(context as any);
    expect(response).toEqual({
      props: {
        total: 10,
        results: [],
        limit: 10,
        page: 1,
      },
    });
  });
});