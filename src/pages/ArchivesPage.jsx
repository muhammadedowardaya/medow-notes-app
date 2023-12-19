import React from "react";
import SearchBar from "../components/SearchBar";
import NoteList from "../components/NoteList";
import { getArchivedNotes } from "../utils/local-data";
import NoteEmpty from "../components/NoteEmpty";
import { useSearchParams } from "react-router-dom";

function ArchivesPageWrapper() {
	const [searchParams, setSearchParams] = useSearchParams();
	const currentKeyword = searchParams.get("keyword");

	function changeSearchParams(newKeyword) {
		setSearchParams({ keyword: newKeyword });
	}

	return (
		<ArchivesPage
			defaultKeyword={currentKeyword}
			keywordChange={changeSearchParams}
		/>
	);
}

class ArchivesPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			notes: getArchivedNotes(),
			keyword: props.defaultKeyword || "",
		};

		this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
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
		const notesArchived = this.state.notes.filter((note) => {
			return note.title
				.toLowerCase()
				.includes(this.state.keyword.toLowerCase());
		});

		return (
			<section id="archives-page">
				<h2>Catatan Arsip</h2>
				<SearchBar
					keyword={this.state.keyword}
					keywordChange={this.onKeywordChangeHandler}
				/>
				{this.state.notes.length < 1 ? (
					<NoteEmpty />
				) : (
					<NoteList notes={notesArchived} />
				)}
			</section>
		);
	}
}

export default ArchivesPageWrapper;
