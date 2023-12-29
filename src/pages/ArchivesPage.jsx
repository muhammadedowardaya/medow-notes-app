import React from "react";
import SearchBar from "../components/SearchBar";
import NoteList from "../components/NoteList";
import NoteEmpty from "../components/NoteEmpty";
import { useSearchParams } from "react-router-dom";

import { getArchivedNotes } from "../utils/network-data";
import LocaleContext from "../contexts/LocaleContext";

export default function ArchivesPage() {
	const { locale } = React.useContext(LocaleContext);

	const [searchParams, setSearchParams] = useSearchParams();
	const [notes, setNotes] = React.useState([]);
	const [keyword, setKeyword] = React.useState(() => {
		return searchParams.get("keyword") || "";
	});

	const onKeywordChangeHandler = (keyword) => {
		setKeyword(keyword);
		setSearchParams({ keyword: keyword });
	};

	React.useEffect(() => {
		const getNotes = async () => {
			try {
				const notes = await getArchivedNotes();
				return notes;
			} catch (error) {
				console.info("terjadi error");
			}
		};

		getNotes().then((response) => {
			setNotes(response.data);
		});
	}, []);

	let filteredNotes = [];
	if (Array.isArray(notes) && notes && notes.length > 0) {
		if (notes.length > 0) {
			filteredNotes = notes.filter((note) => {
				return note.title.toLowerCase().includes(keyword.toLowerCase());
			});
		}
	}

	return (
		<section id="home-page">
			<h2>{locale === "id" ? "Catatan Arsip" : "Archived Notes"}</h2>
			<SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
			{filteredNotes.length < 1 ? (
				<NoteEmpty />
			) : (
				<NoteList notes={filteredNotes} />
			)}
		</section>
	);
}
