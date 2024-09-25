import React from "react";

import PropTypes from "prop-types";

import { PiArchiveTrayFill } from "react-icons/pi";

export default function NoteArchiveButton({ onArchive }) {
    
	return (
		<button className="note-archive__button" onClick={() => onArchive()}>
			<PiArchiveTrayFill className="w-10 h-10"/>
		</button>
	);
}

NoteArchiveButton.propTypes = {
	onArchive: PropTypes.func.isRequired,
};
