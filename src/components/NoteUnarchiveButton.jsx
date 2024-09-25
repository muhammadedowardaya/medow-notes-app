import React from "react";
import { MdOutlineUnarchive } from "react-icons/md";

import PropTypes from "prop-types";

export default function NoteUnarchiveButton({ onUnarchive }) {
	return (
		<button className="note-unarchive__button" onClick={() => onUnarchive()}>
			<MdOutlineUnarchive className="w-5 h-5 sm:w-10  sm:h-10"/>
		</button>
	);
}

NoteUnarchiveButton.propTypes = {
	onUnarchive: PropTypes.func.isRequired,
};
