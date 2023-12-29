import React from "react";

import PropTypes from "prop-types";

export default function useInput(defaultValue = "") {
	const [value, setValue] = React.useState(defaultValue);

	const onValueChangeHandler = (event) => {
		setValue(event.target.value);
	};

	return [value, onValueChangeHandler];
}

useInput.propTypes = {
	defaultValue: PropTypes.string,
};
