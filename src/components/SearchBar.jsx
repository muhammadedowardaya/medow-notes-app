import React from "react";

import PropTypes from "prop-types";

export default function SearchBar({ keyword, keywordChange }) {
	return (
		<input
			className="search-bar"
			type="text"
			placeholder="Cari berdasarkan title"
			value={keyword}
			onChange={(event) => keywordChange(event.target.value)}
		/>
	);
}

SearchBar.propTypes = {
	keyword: PropTypes.string,
	keywordChange: PropTypes.func.isRequired,
};
