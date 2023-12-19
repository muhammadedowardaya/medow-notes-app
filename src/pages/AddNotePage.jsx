import React from "react";
import NoteInput from "../components/NoteInput";
import { addNote } from "../utils/local-data";
import { useNavigate } from "react-router-dom";

function AddNotePage() {
	const navigate = useNavigate();

	function addNoteHandler(note) {
		addNote(note);
		navigate("/");
	}

	return <NoteInput addNote={addNoteHandler} />;
}

export default AddNotePage;
