import React from 'react';
import { render } from '@testing-library/react';
import BarChart from './BarChart.js';


it('should be rendered', () => {
	const { containder } = render(<BarChart />);

	expect(containder.querySelector('svg')).toBeTruthy();
});
