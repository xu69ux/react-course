import { render, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';
import HomeSearchPage from '../pages/search/index';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('HomeSearchPage', () => {
  test('redirects to the search page', async () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push,
    });

    render(<HomeSearchPage />);

    await waitFor(() => {
      expect(push).toHaveBeenCalledWith('/search/1');
    });
  });
});