import React from "react";
import { MdDone } from "react-icons/md";

import PropTypes from "prop-types";

class NoteInput extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			title: "",
			body: "",
		};

		this.onTitleChangeHandler = this.onTitleChangeHandler.bind(this);
		this.onBodyChangeHandler = this.onBodyChangeHandler.bind(this);
		this.onSubmitHandler = this.onSubmitHandler.bind(this);
	}

	onTitleChangeHandler(event) {
		this.setState(() => {
			return {
				title: event.target.value,
			};
		});
	}

	onBodyChangeHandler(event) {
		this.setState(() => {
			return {
				body: event.target.value,
			};
		});
	}

	onSubmitHandler(event) {
		event.preventDefault();
		this.props.addNote(this.state);
	}

	render() {
		return (
			<form className="note-input" onSubmit={this.onSubmitHandler}>
				<input
					type="text"
					id="title"
					name="title"
					placeholder="Berikan Judul Catatan..."
					value={this.state.title}
					onChange={this.onTitleChangeHandler}
				/>
				<textarea
					name="body"
					id="body"
					cols="30"
					rows="15"
					placeholder="Disini adalah isi dari catatan..."
					value={this.state.body}
					onChange={this.onBodyChangeHandler}
				></textarea>

				<button className="note-save__button" type="submit">
					<MdDone />
				</button>
			</form>
		);
	}
}

export default NoteInput;

NoteInput.propTypes = {
	title: PropTypes.string,
	body: PropTypes.string,
	addNote: PropTypes.func.isRequired,
};
