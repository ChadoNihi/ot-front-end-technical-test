import React from 'react';
import { render } from '@testing-library/react';
import Table from './Table';

it('should render a table', () => {
	const { container } = render(<Table />);

	expect(container.querySelector('table')).toBeTruthy();
});
