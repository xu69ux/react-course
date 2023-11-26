import { render, fireEvent, screen } from '@testing-library/react';
import { Limitation } from '@components/index';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Limitation component', () => {
  test('renders the current limit', () => {
    (useRouter as jest.Mock).mockReturnValue({
      route: '/',
      pathname: '',
      query: { limit: '10' },
      asPath: '',
      push: jest.fn(),
    });

    render(<Limitation total={10} />);
    expect(screen.getByText('10 per page')).toBeInTheDocument();
  });

  it('calls router.push with the new limit when the + button is clicked', () => {
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      route: '/',
      pathname: '/',
      query: { limit: '10' },
      asPath: '/',
      push: pushMock,
    });

    render(<Limitation total={20} />);
    fireEvent.click(screen.getByText('+'));
    expect(pushMock).toHaveBeenCalledWith({
      pathname: '/',
      query: { limit: '11', page: '1' },
    });
  });
});
