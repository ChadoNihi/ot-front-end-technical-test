import React from 'react';
import { render } from '@testing-library/react';
import GeneAssociationTable from './GeneAssociationTable';

it('should render a table', () => {
	const { getByRole } = render(<GeneAssociationTable />);

	expect(getByRole('table')).toBeTruthy();
});
