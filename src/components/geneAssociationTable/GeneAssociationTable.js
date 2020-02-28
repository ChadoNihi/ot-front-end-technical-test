import React, { useEffect } from "react";
import PropTypes from 'prop-types';

const DATA_ENDPOINT = 'https://demo6922545.mockable.io/';


function GeneAssociationTable({
	maxNumRows,
	showCaption,
}) {
	useEffect(() => {
		fetchGeneAssociationData()
			.then((data) => data);
	}, []);

  return (
    <table>
			{ showCaption && <caption>The gene association scores for lung carcinoma</caption> }
			<thead>
				<tr>
					<th></th>
					<th>Symbol</th>
					<th>Gene ID</th>
					<th>Gene Name</th>
					<th>Overall Association Score</th>
				</tr>
			</thead>
      <tbody></tbody>
    </table>
  );
}

GeneAssociationTable.propTypes = {
  showCaption: PropTypes.bool,
};

GeneAssociationTable.defaultProps = {
  showCaption: true,
};

export default GeneAssociationTable;


function fetchGeneAssociationData() {
	return fetch(DATA_ENDPOINT)
		.then((res) => res.json())
		.then((data) => data);
}
