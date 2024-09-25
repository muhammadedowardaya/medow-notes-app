import React from "react";

import PropTypes from "prop-types";

import { MdDelete } from "react-icons/md";

export default function NoteDeleteButton({ id, onDelete }) {
	return (
		<button className="note-delete__button" onClick={() => onDelete(id)}>
			<MdDelete className="w-10 h-10"/>
		</button>
	);
}

NoteDeleteButton.propTypes = {
	id: PropTypes.number,
	onDelete: PropTypes.func.isRequired,
};
