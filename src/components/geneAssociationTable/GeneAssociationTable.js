import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import Chart from "react-apexcharts";
import "./GeneAssociationTable.css";

const DATA_ENDPOINT = 'https://demo6922545.mockable.io/';
const CHART_TYPE = 'bar';
const MINUS_STR = '-';
const PLUS_STR = '+';
const TRUE_STR = 'true';
const FALSE_STR = 'false';
const TOGGLE_VIZ_ARIA_LABEL =
	'Toggle a chart with the association scores for each individual data type';
const COL_SPAN_MAX = '5';
const CHART_OPTIONS = {
	xaxis: {
		type: 'category',
		title: { text: 'Data Types', },
	},
	yaxis: {
		title: { text: 'Score', },
		max: 1,
		decimalsInFloat: 2,
		tickAmount: 10,
	},
};


function GeneAssociationTable({
	// FIXME: test the prop below
	numRowsMax,
	showCaption,
}) {
	const [ geneAssociationData, setGeneAssociationData ] =
		useState();
	const [ loading, setLoading ] =	useState(true);
	const [ error, setError ] =	useState();

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

	const onToggleVizRow = (geneId) => {
		const rowItem = geneAssociationData.find(
			(rowItem) => rowItem.geneId === geneId);
		rowItem.expanded = !rowItem.expanded;
		setGeneAssociationData(geneAssociationData.slice());
	};

	const hasRows =
		Array.isArray(geneAssociationData) && geneAssociationData.length;

  return (
    <table>
			{ showCaption &&
				<caption>Genes associated with lung carcinoma</caption> }
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
				{ loading ? <tr><td colSpan={COL_SPAN_MAX}>Loading...</td></tr> :
					error ? <tr><td colSpan={COL_SPAN_MAX}>{ error }</td></tr> :
					hasRows ? geneAssociationData.map(({
						symbol,
						geneId,
						geneName,
						overallScore,
						expanded,
						scores = {},
					}) => (
						<>
						<tr key={ geneId }>
							<td><button
								className='icon-btn'
								aria-label={TOGGLE_VIZ_ARIA_LABEL}
								aria-expanded={ expanded ? TRUE_STR : FALSE_STR }
								onClick={() => onToggleVizRow(geneId)}
								disabled={ Object.keys(scores).length === 0 }
								>
								{ expanded ? MINUS_STR : PLUS_STR }
							</button></td>
							<td>{ symbol }</td>
							<td>{ geneId }</td>
							<td>{ geneName }</td>
							<td>{ overallScore }</td>
						</tr>
						{ expanded && <tr className='chart-row'><td colSpan={COL_SPAN_MAX}>
							<Chart
								type={CHART_TYPE}
								series={[{ data: getSeriesFromGeneAssociationScores(
									scores) }]}
								options={CHART_OPTIONS}
							/>
						</td></tr> }
						</>
				)) : <tr><td colSpan={COL_SPAN_MAX}>No results</td></tr> }
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

// FIXME: test me
function prepareGeneAssociationData(rawData, numRowsMax) {
	return rawData
		.map(prepareDataItem)
		.sort(compareDataItems)
		.slice(0, numRowsMax);
}

function prepareDataItem({ target, association_score }) {
	const { gene_info, id } = target || {};
	const { overall, datatypes } = association_score || {};

	return {
		symbol: gene_info?.symbol,
		geneId: id,
		geneName: gene_info?.name,
		overallScore: overall,
		scores: datatypes,
	};
}

function compareDataItems(
	{ overallScore: overallScoreA },
	{ overallScore: overallScoreB }
) {
	// FIXME: if overall is undefined, sum up scores instead
	return overallScoreB - overallScoreA;
}


// FIXME: test me
function getSeriesFromGeneAssociationScores(scores = {}) {
	return Object.entries(scores)
		.map(([ scoreKey, score ]) => ({ x: scoreKey, y: score }));
}
