import { render, fireEvent, screen } from '@testing-library/react';
import { ErrorBoundaryButton } from '@components/index';

describe('ErrorBoundaryButton', () => {
  it('renders without crashing', () => {
    render(<ErrorBoundaryButton counter={0}/>);
    expect(screen.getByTestId('error-boundary-button')).toBeInTheDocument();
  });

  it('throws error when counter is 1', () => {
    render(<ErrorBoundaryButton counter={0}/>);
    expect(() => {
      fireEvent.click(screen.getByTestId('error-boundary-button'));
      fireEvent.click(screen.getByTestId('error-boundary-button'));
    }).toThrow('the application crashed because you clicked the error generator!');
  });
});