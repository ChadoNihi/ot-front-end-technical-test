import React from 'react';
import { act, render } from '@testing-library/react';
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


describe('loading', () => {
	const loadingText = 'Loading...';

	it('should show loading before data is fetched', () => {
		const { getByText } = render(<GeneAssociationTable />);

		expect(getByText(loadingText)).toBeTruthy();
	});

	it('should not show loading on data fetched', async () => {
		let queryByText;

		jest.spyOn(global, 'fetch').mockImplementation(() =>
	    Promise.resolve({
	      json: () => Promise.resolve([])
	    })
	  );

		await act(async () => {
	    ({ queryByText } = render(<GeneAssociationTable />));
	  });

		expect(queryByText(loadingText)).toBeFalsy();
	});

	it('should not show loading on error', async () => {
		let queryByText;

		jest.spyOn(global, 'fetch').mockImplementation(() =>
	    Promise.reject()
	  );

		await act(async () => {
	    ({ queryByText } = render(<GeneAssociationTable />));
	  });

		expect(queryByText(loadingText)).toBeFalsy();
	});
});
