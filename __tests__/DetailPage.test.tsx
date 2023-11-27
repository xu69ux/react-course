import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { useRouter } from 'next/router';
import DetailPage from '../pages/search/[page]/detail/[id]';


jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('DetailPage', () => {
  const mockData = {
    id: 1,
    name: 'Mock Philosopher',
    birth_year: 1900,
    death_year: 2000,
    idea: 'Mock idea',
    famous_work: 'Mock work',
  };

  const mockResults = [
    { id: 1, name: 'Plato', birth_year: 438, death_year: 347, famous_work: 'The Republic', idea: 'Platonism' },
    { id: 2, name: 'Aristotle', birth_year: 384, death_year: 322, famous_work: 'Nicomachean Ethics', idea: 'Aristotelianism' },
  ];

  (global.fetch as jest.Mock) = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ results: [], total: 0 }),
  })
  );

  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  test('renders without crashing', () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {},
    });

    render(<DetailPage data={mockData} results={mockResults} total={0} totalPages={0} />);
    expect(screen.getByText('details:')).toBeInTheDocument();
  });

  test('redirects to the correct page when close button is clicked', async () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      query: {},
      push,
    });

    render(<DetailPage data={mockData} results={mockResults} total={0} totalPages={0} />);
    fireEvent.click(screen.getByTestId('btn_close'));

    await waitFor(() => {
      expect(push).toHaveBeenCalled();
    });
  });

  test('displays philosopher details correctly', () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {},
    });

    render(<DetailPage data={mockData} results={mockResults} total={0} totalPages={0} />);
    expect(screen.getByText(`name: ${mockData.name}`)).toBeInTheDocument();
    expect(screen.getByText(`born: ${mockData.birth_year}`)).toBeInTheDocument();
    expect(screen.getByText(`died: ${mockData.death_year}`)).toBeInTheDocument();
    expect(screen.getByText(`idea: ${mockData.idea}`)).toBeInTheDocument();
    expect(screen.getByText(`famous work: ${mockData.famous_work}`)).toBeInTheDocument();
  });

  test('renders SearchInput, Limitation, SearchList, Pagination, and ErrorBoundaryButton', () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {},
    });
  
    render(<DetailPage data={mockData} results={mockResults} total={0} totalPages={0} />);
    expect(screen.getByTestId('input')).toBeInTheDocument();
    expect(screen.getByTestId('limitation')).toBeInTheDocument();
    expect(screen.getByTestId('search-list')).toBeInTheDocument();
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
    expect(screen.getByTestId('error-boundary-button')).toBeInTheDocument();
  });

  test('closeDetailHandler redirects to the correct page with query parameters', async () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      query: { 'search.name': 'test', limit: 10 },
      push,
    });
  
    render(<DetailPage data={mockData} results={[]} total={0} totalPages={0} />);
    fireEvent.click(screen.getByTestId('btn_close'));
  
    await waitFor(() => {
      expect(push).toHaveBeenCalledWith(
        {
          pathname: '/search/[page]',
          query: { 'search.name': 'test', limit: 10 },
        },
        '/search/1?search.name=test&limit=10'
      );
    });
  });

  test('closeDetailHandler redirects to the correct page with query parameters', async () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      query: { 'search.name': 'test', limit: 10 },
      push,
    });
  
    render(<DetailPage data={mockData} results={[]} total={0} totalPages={0} />);
    fireEvent.click(screen.getByTestId('btn_close'));
  
    await waitFor(() => {
      expect(push).toHaveBeenCalledWith(
        {
          pathname: '/search/[page]',
          query: { 'search.name': 'test', limit: 10 },
        },
        '/search/1?search.name=test&limit=10'
      );
    });
  });

  test('responds correctly when the user interacts with the SearchInput component', () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {},
    });
  
    render(<DetailPage data={mockData} results={mockResults} total={0} totalPages={0} />);
  
    fireEvent.change(screen.getByTestId('input'), { target: { value: 'test' } });
  
    expect(screen.getByTestId('input')).toHaveValue('test');
  });

  test('updates correctly when it receives new props', () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {},
    });
  
    const { rerender } = render(<DetailPage data={mockData} results={mockResults} total={0} totalPages={0} />);
  
    const newMockData = { ...mockData, name: 'New Mock Philosopher' };
    rerender(<DetailPage data={newMockData} results={mockResults} total={0} totalPages={0} />);
  
    expect(screen.getByText(`name: ${newMockData.name}`)).toBeInTheDocument();
  });

  test('displays appropriate message when fetch returns an empty list', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve({ results: [], total: 0 }),
    }));
  
    (useRouter as jest.Mock).mockReturnValue({
      query: {},
    });
  
    render(<DetailPage data={mockData} results={[]} total={0} totalPages={0} />);
  
    await waitFor(() => {
      expect(screen.getByText('sorry, your request looks bad, please try again with correct name')).toBeInTheDocument();
    });
  });
});