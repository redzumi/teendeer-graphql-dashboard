import React from 'react';
import { render } from '@testing-library/react';
import { mockMatchMedia } from '../../tools/mocks/matchMedia';
import App from './App';

beforeEach(async () => {
  mockMatchMedia();
});

test('renders learn react link', () => {
  const { getByText } = render(<App />);

  expect(getByText(/graphql/i)).toBeInTheDocument();
});
