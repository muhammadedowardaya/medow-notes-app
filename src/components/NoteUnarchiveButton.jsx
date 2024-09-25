import React from "react";
import { MdOutlineUnarchive } from "react-icons/md";

import PropTypes from "prop-types";

export default function NoteUnarchiveButton({ onUnarchive }) {
	return (
		<button className="note-unarchive__button" onClick={() => onUnarchive()}>
			<MdOutlineUnarchive className="w-10 h-10"/>
		</button>
	);
}

NoteUnarchiveButton.propTypes = {
	onUnarchive: PropTypes.func.isRequired,
};
