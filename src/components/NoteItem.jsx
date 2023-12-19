import React from "react";

import PropTypes from "prop-types";

import NoteDeleteButton from "./NoteDeleteButton";
import { showFormattedDate } from "../utils";

export default function NoteItem({ id, title, createdAt, body }) {
	return (
		<div className="note-item" key={id}>
			<h1 className="title">{title}</h1>
			<p className="createdAt">{showFormattedDate(createdAt)}</p>
			<p className="body">{body}</p>
		</div>
	);
}

NoteItem.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	createdAt: PropTypes.string.isRequired,
	body: PropTypes.string.isRequired,
};
