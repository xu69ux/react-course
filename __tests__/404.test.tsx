import { render } from '@testing-library/react';
import NotFound from '../pages/404';

describe('Custom 404 Page', () => {
  test('renders NotFound component for invalid route', () => {
    const { getByText } = render(<NotFound  />);
    expect(getByText('Page not found')).toBeInTheDocument();
  });
});