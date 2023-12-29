import React from "react";
import NoteInput from "../components/NoteInput";
import { useNavigate } from "react-router-dom";
import { addNote } from "../utils/network-data";

function AddNotePage() {
	const navigate = useNavigate();

	function addNoteHandler(note) {
		addNote(note);
		navigate("/");
	}

	return <NoteInput addNote={addNoteHandler} />;
}

export default AddNotePage;
