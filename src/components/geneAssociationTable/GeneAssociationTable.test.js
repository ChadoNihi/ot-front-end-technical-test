import React from 'react';
import { act, render } from '@testing-library/react';
import GeneAssociationTable from './GeneAssociationTable';


afterEach(() => {
	global.fetch.mockRestore?.();
});


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


it('should show error msg on fetch error', async () => {
	let queryByText;

	jest.spyOn(global, 'fetch')
		.mockImplementation(fetchWithError);

	await act(async () => {
		({ queryByText } = render(<GeneAssociationTable />));
	});

	expect(queryByText(/error occured/)).toBeTruthy();
});


it('should handle no results', async () => {
	let queryByText;

	jest.spyOn(global, 'fetch')
		.mockImplementation(fetchEmptyData);

	await act(async () => {
		({ queryByText } = render(<GeneAssociationTable />));
	});

	expect(queryByText(/no results/i)).toBeTruthy();
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

		jest.spyOn(global, 'fetch')
			.mockImplementation(fetchEmptyData);

		await act(async () => {
	    ({ queryByText } = render(<GeneAssociationTable />));
	  });

		expect(queryByText(loadingText)).toBeFalsy();
	});


	it('should not show loading on error', async () => {
		let queryByText;

		jest.spyOn(global, 'fetch')
			.mockImplementation(fetchWithError);

		await act(async () => {
	    ({ queryByText } = render(<GeneAssociationTable />));
	  });

		expect(queryByText(loadingText)).toBeFalsy();
	});
});


function fetchEmptyData() {
	return Promise.resolve({
		json: () => Promise.resolve([])
	});
}


function fetchWithError() {
	return Promise.reject();
}
