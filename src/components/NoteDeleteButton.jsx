import React from "react";

import PropTypes from "prop-types";

import { MdDelete } from "react-icons/md";

export default function NoteDeleteButton({ id, onDelete }) {
	return (
		<button className="note-delete__button" onClick={() => onDelete(id)}>
			<MdDelete className="w-5 h-5 sm:w-10  sm:h-10"/>
		</button>
	);
}

NoteDeleteButton.propTypes = {
	id: PropTypes.number,
	onDelete: PropTypes.func.isRequired,
};
