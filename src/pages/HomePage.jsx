import React from "react";
import NoteList from "../components/NoteList";
import { getActiveNotes } from "../utils/local-data";
import SearchBar from "../components/SearchBar";
import NoteAddButton from "../components/NoteAddPageButton";
import { useNavigate, useSearchParams } from "react-router-dom";
import NoteEmpty from "../components/NoteEmpty";

import PropTypes from "prop-types";

function HomePageWrapper() {
	const navigate = useNavigate();

	function addHandler() {
		navigate("/new");
	}

	const [searchParams, setSearchParams] = useSearchParams();
	const currentKeyword = searchParams.get("keyword");

	function changeSearchParams(newKeyword) {
		setSearchParams({ keyword: newKeyword });
	}

	return (
		<HomePage
			onAdd={addHandler}
			defaultKeyword={currentKeyword}
			keywordChange={changeSearchParams}
		/>
	);
}

class HomePage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			notes: getActiveNotes(),
			keyword: props.defaultKeyword || "",
		};

		this.onAddHandler = this.onAddHandler.bind(this);
		this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
	}

	onAddHandler() {
		const { onAdd } = this.props;
		onAdd();
	}

	onKeywordChangeHandler(keyword) {
		this.setState(() => {
			return {
				keyword,
			};
		});

		this.props.keywordChange(keyword);
	}

	render() {
		const notes = this.state.notes.filter((note) => {
			return note.title
				.toLowerCase()
				.includes(this.state.keyword.toLowerCase());
		});

		return (
			<section id="home-page">
				<h2>Catatan Aktif</h2>
				<SearchBar
					keyword={this.state.keyword}
					keywordChange={this.onKeywordChangeHandler}
				/>
				{this.state.notes.length < 1 ? (
					<NoteEmpty />
				) : (
					<NoteList notes={notes} />
				)}
				<NoteAddButton onAdd={this.onAddHandler} />
			</section>
		);
	}
}

export default HomePageWrapper;

HomePage.propTypes = {
	notes: PropTypes.array,
	keyword: PropTypes.string,
};
