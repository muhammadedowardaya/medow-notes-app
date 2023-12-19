import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
	archiveNote,
	deleteNote,
	getNote,
	unarchiveNote,
} from "../utils/local-data";
import { showFormattedDate } from "../utils";
import NoteArchiveButton from "../components/NoteArchiveButton";
import NoteDeleteButton from "../components/NoteDeleteButton";
import NoteUnarchiveButton from "../components/NoteUnarchiveButton";

import PropTypes from "prop-types";

export default function DetailPageWrapper() {
	const { id } = useParams();
	const navigate = useNavigate();

	const handleArchive = () => {
		archiveNote(id);
		navigate("/");
	};

	const handleUnarchive = () => {
		unarchiveNote(id);
		navigate("/");
	};

	const handleDelete = () => {
		deleteNote(id);
		navigate("/");
	};

	return (
		<DetailPage
			id={id}
			onArchive={handleArchive}
			onUnarchive={handleUnarchive}
			onDelete={handleDelete}
		/>
	);
}

class DetailPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			note: getNote(props.id),
		};

		this.onArchiveHandler = this.onArchiveHandler.bind(this);
		this.onUnarchiveHandler = this.onUnarchiveHandler.bind(this);
		this.onDeleteHandler = this.onDeleteHandler.bind(this);
	}

	onArchiveHandler() {
		const { onArchive } = this.props;
		onArchive();
	}

	onUnarchiveHandler() {
		const { onUnarchive } = this.props;
		onUnarchive();
	}

	onDeleteHandler() {
		const { onDelete } = this.props;
		onDelete();
	}

	render() {
		return (
			<div className="detail-page">
				<h1 className="title">{this.state.note.title}</h1>
				<p className="createdAt">
					{showFormattedDate(this.state.note.createdAt)}
				</p>
				<p className="body">{this.state.note.body}</p>
				{this.state.note.archived == true ? (
					<NoteUnarchiveButton onUnarchive={this.onUnarchiveHandler} />
				) : (
					<NoteArchiveButton onArchive={this.onArchiveHandler} />
				)}
				<NoteDeleteButton onDelete={this.onDeleteHandler} />
			</div>
		);
	}
}

DetailPage.propTypes = {
	note: PropTypes.array,
};
