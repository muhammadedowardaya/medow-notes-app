import React from "react";
import { IoIosAddCircle } from "react-icons/io";

import PropTypes from "prop-types";

export default function NoteAddPageButton({ onAdd, className }) {
	return (
		<button className={`note-add__button ${className}`} onClick={() => onAdd()}>
			<IoIosAddCircle className="w-12 h-12" />
		</button>
	);
}

NoteAddPageButton.propTypes = {
	onAdd: PropTypes.func.isRequired,
};
