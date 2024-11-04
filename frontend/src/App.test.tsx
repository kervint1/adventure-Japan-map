import { render, screen } from '@testing-library/react';
import App from './App';

test('renders animap text', () => {
  render(<App />);
  const linkElement = screen.getByText(/animap/i);
  expect(linkElement).toBeInTheDocument();
});
