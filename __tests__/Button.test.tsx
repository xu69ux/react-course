import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import { Button } from '@components/Button';

describe('Button component', () => {
  test('click button', () => {
    const mockOnClick = jest.fn();
  
    render(
      <Button 
        className='test'
        text='test'
        onClick={mockOnClick}/>
    );
    const buttonElement = screen.getByText(/test/i);
    buttonElement.click();
  
    expect(mockOnClick).toHaveBeenCalled();
  });
});
