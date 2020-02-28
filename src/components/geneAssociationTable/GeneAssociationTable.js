import React from "react";
import PropTypes from 'prop-types';


function GeneAssociationTable({ showCaption }) {
  return (
    <table>
			{ showCaption && <caption>The gene association scores for lung carcinoma</caption> }
			<thead></thead>
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
