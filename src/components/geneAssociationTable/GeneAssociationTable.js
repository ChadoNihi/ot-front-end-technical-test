import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';

const DATA_ENDPOINT = 'https://demo6922545.mockable.io/';


function GeneAssociationTable({
	numRowsMax,
	showCaption,
}) {
	const [ geneAssociationData, setGeneAssociationData ] =
		useState();
	const hasRows =
		Array.isArray(geneAssociationData) && geneAssociationData.length;

	useEffect(() => {
		// FIXME: handle error
		fetchGeneAssociationData()
			.then(({ data: rawData = [] }) => {
				setGeneAssociationData(
					prepareGeneAssociationData(rawData, numRowsMax));
			});
	}, [ numRowsMax ]);

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
		.then((res) => res.json());
}


function prepareGeneAssociationData(rawData, numRowsMax) {
	return rawData
		.map(prepareDataItem)
		.sort(compareDataItems)
		.slice(0, numRowsMax);
}

function prepareDataItem({ target, association_score }) {
	const { gene_info, id } = target || {};
	const { overall, data_types } = association_score || {};

	return {
		symbol: gene_info?.symbol,
		geneId: id,
		geneName: gene_info?.name,
		overallScore: overall,
		scores: data_types,
	};
}

function compareDataItems(
	{ overallScore: overallScoreA },
	{ overallScore: overallScoreB }
) {
	// FIXME: if overall is undefined, sum up scores instead
	return overallScoreB - overallScoreA;
}
