import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

it('should render one table', () => {
  const { getByRole } = render(<App />);

  expect(getByRole('table')).toBeTruthy();
});
