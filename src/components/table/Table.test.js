import React from 'react';
import { render } from '@testing-library/react';
import Table from './Table';

it('should render a table', () => {
	const { getByRole } = render(<Table />);

	expect(getByRole('table')).toBeTruthy();
});
