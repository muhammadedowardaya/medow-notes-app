import React from "react";

import PropTypes from "prop-types";
import NoteItem from "./NoteItem";
import { Link } from "react-router-dom";

export default function NoteList({ notes, onDelete }) {
	return (
		<div className="notes-list">
			{notes.map((note) => (
				<Link to={`/detail/${note.id}`} key={note.id}>
					<NoteItem key={note.id} id={note.id} onDelete={onDelete} {...note} />
				</Link>
			))}
		</div>
	);
}

NoteList.propTypes = {
	notes: PropTypes.arrayOf(PropTypes.object),
	onDelete: PropTypes.func,
};
