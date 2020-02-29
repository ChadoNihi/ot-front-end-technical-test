import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';

const DATA_ENDPOINT = 'https://demo6922545.mockable.io/';


function GeneAssociationTable({
	numRowsMax,
	showCaption,
}) {
	const [ geneAssociationData, setGeneAssociationData ] =
		useState();
	const [ loading, setLoading ] =	useState(true);
	const [ error, setError ] =	useState();
	const hasRows =
		Array.isArray(geneAssociationData) && geneAssociationData.length;

	useEffect(() => {
		fetchGeneAssociationData()
			.then(({ data: rawData = [] }) => {
				setGeneAssociationData(
					prepareGeneAssociationData(rawData, numRowsMax));
			})
			.catch((e) => {
				console.error(e);
				setError('An error occured while fetching gene association data. Please try again later by reloading the page.');
			})
			.finally(() => {
				setLoading(false);
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
				{ loading ? <tr><td colspan='5'>Loading...</td></tr> :
					error ? <tr><td colspan='5'>{ error }</td></tr> :
					hasRows ? geneAssociationData.map(({
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
					)) : <tr><td colspan='5'>No results</td></tr> }
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
