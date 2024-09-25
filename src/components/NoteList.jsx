import React from "react";

import PropTypes from "prop-types";
import NoteItem from "./NoteItem";
import { Link } from "react-router-dom";
import { getBackgroundColorClass } from "../utils";

export default function NoteList({ notes, onDelete, className, classNameItem }) {
	return (
		<div className={`notes-list ${className}`}>
			{notes.map((note, index) => (
				<Link to={`/detail/${note.id}`} key={note.id}>
					<NoteItem key={note.id} id={note.id} onDelete={onDelete} {...note} className={`${getBackgroundColorClass(index)} ${classNameItem} p-4 rounded`}/>
				</Link>
			))}
		</div>
	);
}

NoteList.propTypes = {
	notes: PropTypes.arrayOf(PropTypes.object),
	onDelete: PropTypes.func,
};
