import React, { useEffect } from "react";
import PropTypes from 'prop-types';

const DATA_ENDPOINT = 'https://demo6922545.mockable.io/';


function GeneAssociationTable({
	numRowsMax,
	showCaption,
}) {
	useEffect(() => {
		// FIXME: handle error
		fetchGeneAssociationData()
			.then((data) => data);
	}, []);

  return (
    <table>
			{ showCaption &&
				<caption>The gene association scores for lung carcinoma</caption> }
			<thead>
				<tr>
					<th></th>
					<th>Symbol</th>
					<th>Gene ID</th>
					<th>Gene Name</th>
					<th>Overall Association Score</th>
				</tr>
			</thead>
      <tbody>
				{ hasRows ? geneAssociationData.map(({
						symbol,
						geneId,
						geneName,
						overallScore,
					}) => (
						<tr key={ geneId }>
							<th></th>
							<th>{ symbol }</th>
							<th>{ geneId }</th>
							<th>{ geneName }</th>
							<th>{ overallScore }</th>
						</tr>
					)) : <tr><td>No results</td></tr> }
			</tbody>
    </table>
  );
}

GeneAssociationTable.propTypes = {
	numRowsMax: PropTypes.number,
  showCaption: PropTypes.bool,
};

GeneAssociationTable.defaultProps = {
	numRowsMax: 5,
  showCaption: true,
};

export default GeneAssociationTable;


function fetchGeneAssociationData() {
	return fetch(DATA_ENDPOINT)
		.then((res) => res.json())
		.then((data) => data);
}
