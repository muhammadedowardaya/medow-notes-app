import React from "react";
import { MdOutlineUnarchive } from "react-icons/md";

import PropTypes from "prop-types";

export default function NoteUnarchiveButton({ onUnarchive }) {
	return (
		<button className="note-unarchive__button" onClick={() => onUnarchive()}>
			<MdOutlineUnarchive />
		</button>
	);
}

NoteUnarchiveButton.propTypes = {
	onUnarchive: PropTypes.func.isRequired,
};
