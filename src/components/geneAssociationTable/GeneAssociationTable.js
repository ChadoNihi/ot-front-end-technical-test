import React from "react";
import PropTypes from 'prop-types';


function GeneAssociationTable({ showCaption }) {
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
