import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { showFormattedDate } from "../utils";
import NoteArchiveButton from "../components/NoteArchiveButton";
import NoteDeleteButton from "../components/NoteDeleteButton";
import NoteUnarchiveButton from "../components/NoteUnarchiveButton";

import {
	archiveNote,
	deleteNote,
	getNote,
	unarchiveNote,
} from "../utils/network-data";

export default function DetailPage() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [note, setNote] = React.useState({});

	const onArchiveHandler = async () => {
		try {
			await archiveNote(id);
			navigate("/archives");
		} catch (error) {
			//
		}
	};

	const onUnarchiveHandler = async () => {
		try {
			await unarchiveNote(id);
			navigate("/");
		} catch (error) {
			//
		}
	};

	const onDeleteHandler = async () => {
		try {
			await deleteNote(id);
			navigate("/");
		} catch (error) {
			//
		}
	};

	React.useEffect(() => {
		const getNoteDetail = async () => {
			try {
				const response = await getNote(id);
				return response;
			} catch (error) {
				console.error("terdapat error");
			}
		};

		getNoteDetail().then((response) => {
			setNote(response.data);
		});
	}, []);

	return (
		<div className="detail-page">
			<h1 className="title">{note.title}</h1>
			<p className="createdAt">{showFormattedDate(note.createdAt)}</p>
			<p className="body">{note.body}</p>
			{note.archived == true ? (
				<NoteUnarchiveButton onUnarchive={onUnarchiveHandler} />
			) : (
				<NoteArchiveButton onArchive={onArchiveHandler} />
			)}
			<NoteDeleteButton onDelete={onDeleteHandler} />
		</div>
	);
}
