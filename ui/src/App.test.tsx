import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import store from './data/store';

test('renders Blog Spaces', () => {
  render(<Provider store={store}><App /></Provider>);
  const linkElement = screen.getByText(/Blog Spaces/i);
  expect(linkElement).toBeInTheDocument();
});
