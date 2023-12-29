import React from "react";
import { MdDone } from "react-icons/md";

import useInput from "../hooks/useInput";
import PropTypes from "prop-types";
import LocaleContext from "../contexts/LocaleContext";

export default function NoteInput({ addNote }) {
	const { locale } = React.useContext(LocaleContext);

	const [title, onTitleChangeHandler] = useInput();
	const [body, onBodyChangeHandler] = useInput();

	const onSubmitHandler = (event) => {
		event.preventDefault();
		addNote({
			title,
			body,
		});
	};

	return (
		<form className="note-input" onSubmit={onSubmitHandler}>
			<input
				type="text"
				id="title"
				name="title"
				placeholder={
					locale === "id"
						? "Berikan Judul Catatan..."
						: "Provide a title for the note"
				}
				value={title}
				onChange={onTitleChangeHandler}
			/>
			<textarea
				name="body"
				id="body"
				cols="30"
				rows="15"
				placeholder={
					locale === "id"
						? "Disini adalah isi dari catatan..."
						: "Here is the content of the note"
				}
				value={body}
				onChange={onBodyChangeHandler}
			></textarea>

			<button className="note-save__button" type="submit">
				<MdDone />
			</button>
		</form>
	);
}

NoteInput.propTypes = {
	addNote: PropTypes.func.isRequired,
};
