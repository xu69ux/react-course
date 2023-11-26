import { render, screen } from '@testing-library/react';
import NotFound from '../pages/404';

describe('Custom 404 Page', () => {
  test('renders NotFound component for invalid route', () => {
    render(<NotFound  />);
    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });
});