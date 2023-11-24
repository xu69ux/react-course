import { render } from '@testing-library/react';
import DetailPage from '../pages/search/[page]/detail/[id]';

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { page: '1' },
    push: jest.fn(),
  }),
}));

describe('DetailPage', () => {
  const mockData = {
    id: 1,
    name: 'Plato',
    birth_year: 428,
    death_year: 347,
    famous_work: 'The Republic',
    idea: 'Platonism',
  };

  test('renders philosopher details', () => {
    const { getByText } = render(<DetailPage data={mockData} />);
    expect(getByText(`name: ${mockData.name}`)).toBeInTheDocument();
    expect(getByText(`born: ${mockData.birth_year}`)).toBeInTheDocument();
    expect(getByText(`died: ${mockData.death_year}`)).toBeInTheDocument();
    expect(getByText(`idea: ${mockData.idea}`)).toBeInTheDocument();
    expect(getByText(`famous work: ${mockData.famous_work}`)).toBeInTheDocument();
  });
});