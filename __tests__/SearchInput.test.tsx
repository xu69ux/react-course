import { render, fireEvent } from '@testing-library/react';
import { SearchInput } from '@components/index';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('SearchInput', () => {
  beforeEach(() => {
    localStorage.clear();
    (useRouter as jest.Mock).mockReturnValue({
      route: '/',
      pathname: '/',
      query: { page: '1' },
      asPath: '/',
      push: jest.fn(),
    });
  });

  it('saves the entered value to the local storage when the Search button is clicked', () => {
    const { getByText, getByPlaceholderText } = render(<SearchInput />);
    const input = getByPlaceholderText('enter a philosophical name');
    fireEvent.change(input, { target: { value: 'Plato' } });
    fireEvent.click(getByText('search'));
    expect(localStorage.getItem('savedInputValue')).toBe('Plato');
  });

  it('retrieves the value from the local storage upon mounting', () => {
    localStorage.setItem('savedInputValue', 'Aristotle');
    const { getByPlaceholderText } = render(<SearchInput />);
    const input = getByPlaceholderText('enter a philosophical name');
    expect((input as HTMLInputElement).value).toBe('Aristotle');
  });
});