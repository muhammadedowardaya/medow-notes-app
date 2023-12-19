import React from "react";
import { IoIosAddCircle } from "react-icons/io";

import PropTypes from "prop-types";

export default function NoteAddPageButton({ onAdd }) {
	return (
		<button className="note-add__button" onClick={() => onAdd()}>
			<IoIosAddCircle className="note-add__button-icon" />
		</button>
	);
}

NoteAddPageButton.propTypes = {
    onAdd:PropTypes.func.isRequired
}