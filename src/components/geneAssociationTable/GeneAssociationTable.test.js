import React from 'react';
import { render } from '@testing-library/react';
import GeneAssociationTable from './GeneAssociationTable';


it('should render a table', () => {
	const { getByRole } = render(<GeneAssociationTable />);

	expect(getByRole('table')).toBeTruthy();
});

it('should have 5 columns', () => {
	const numColumnsExpected = 5;
	const { container } = render(<GeneAssociationTable />);

	expect(container.querySelectorAll('thead th'))
		.toHaveLength(numColumnsExpected);
});

describe('caption', () => {
	it('should have a caption by default', () => {
		const { container } = render(<GeneAssociationTable />);

		expect(container.querySelector('caption')).toBeTruthy();
	});

	it('should not render a caption', () => {
		const { container } = render(<GeneAssociationTable
			showCaption={false}
		/>);

		expect(container.querySelector('caption')).toBeFalsy();
	});
});
