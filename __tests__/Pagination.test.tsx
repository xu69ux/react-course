import { render, fireEvent } from '@testing-library/react';
import { Pagination } from '@components/index';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Pagination', () => {
  it('updates URL query parameter when page number changes', () => {
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      route: '/',
      pathname: '/',
      query: { page: '1' },
      asPath: '/',
      push: pushMock,
    });

    const { getByText } = render(<Pagination totalPages={10} />);
    fireEvent.click(getByText('>'));
    expect(pushMock).toHaveBeenCalledWith({
      pathname: '/',
      query: { page: '2' },
    });
  });

  it('updates URL query parameter when page size changes', () => {
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      route: '/',
      pathname: '/',
      query: { page: '1', limit: '10' },
      asPath: '/',
      push: pushMock,
    });

    const { getByText } = render(<Pagination totalPages={20} />);
    fireEvent.click(getByText('>'));
    expect(pushMock).toHaveBeenCalledWith({
      pathname: '/',
      query: { page: '2', limit: '10' },
    });
  });
});