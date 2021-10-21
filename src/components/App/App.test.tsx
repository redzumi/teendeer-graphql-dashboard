import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../tools/store';
import { mockMatchMedia } from '../../tools/mocks/matchMedia';
import App from './App';

beforeEach(async () => {
  mockMatchMedia();
});

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByText(/learn/i)).toBeInTheDocument();
});
