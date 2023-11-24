import { redirect } from 'next/navigation';
import HomeSearchPage from '../pages/search/index';

jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

describe('HomeSearchPage', () => {
  it('redirects to the search page', async () => {
    await HomeSearchPage();

    expect(redirect).toHaveBeenCalledWith('/search/1');
  });
});