import React from "react";

import PropTypes from "prop-types";
import LocaleContext from "../contexts/LocaleContext";

export default function SearchBar({ keyword, keywordChange }) {
	const { locale } = React.useContext(LocaleContext);

	return (
		<input
			className="search-bar"
			type="text"
			placeholder={
				locale === "id" ? "Cari berdasarkan title" : "Search by title"
			}
			value={keyword}
			onChange={(event) => keywordChange(event.target.value)}
		/>
	);
}

SearchBar.propTypes = {
	keyword: PropTypes.string,
	keywordChange: PropTypes.func.isRequired,
};
