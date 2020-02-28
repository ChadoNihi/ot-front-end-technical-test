import React from 'react';
import { render } from '@testing-library/react';
import GeneAssociationTable from './GeneAssociationTable';


it('should render a table', () => {
	const { getByRole } = render(<GeneAssociationTable />);

	expect(getByRole('table')).toBeTruthy();
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
