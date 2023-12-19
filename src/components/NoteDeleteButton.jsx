import React from "react";

import PropTypes from "prop-types";

import { MdDelete } from "react-icons/md";

export default function NoteDeleteButton({ id, onDelete }) {
	return (
		<button className="note-delete__button" onClick={() => onDelete(id)}>
			<MdDelete />
		</button>
	);
}

NoteDeleteButton.propTypes = {
	id: PropTypes.number,
	onDelete: PropTypes.func.isRequired,
};
