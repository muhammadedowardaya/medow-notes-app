import React from "react";
import { IoIosAddCircle } from "react-icons/io";

import PropTypes from "prop-types";

export default function NoteAddPageButton({ onAdd, className }) {
	return (
		<button className={`note-add__button ${className}`} onClick={() => onAdd()}>
			<IoIosAddCircle className="w-10 h-10" />
		</button>
	);
}

NoteAddPageButton.propTypes = {
	onAdd: PropTypes.func.isRequired,
};
