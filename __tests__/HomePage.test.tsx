import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from '../pages/index';

describe('HomePage', () => {
  test('renders without crashing', () => {
    render(<HomePage />);

    expect(screen.getByRole('heading', { name: /search philosopher app/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /logo/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /let's search!/i })).toBeInTheDocument();
  });
  test('has a link to the search page', () => {
    render(<HomePage />);

    const link = screen.getByRole('link', { name: /let's search!/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'search/1');
  });
});