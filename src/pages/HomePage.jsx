import React from "react";
import NoteList from "../components/NoteList";
import SearchBar from "../components/SearchBar";
import NoteAddButton from "../components/NoteAddPageButton";
import { useNavigate, useSearchParams } from "react-router-dom";
import NoteEmpty from "../components/NoteEmpty";

import { addNote, getActiveNotes } from "../utils/network-data";
import LocaleContext from "../contexts/LocaleContext";
import NoteInput from "../components/NoteInput";
import NotesContext from "../contexts/NotesContext";

export default function HomePage() {
    const { locale } = React.useContext(LocaleContext);
    const { notes, setNotes } = React.useContext(NotesContext);

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [keyword, setKeyword] = React.useState(() => {
        return searchParams.get("keyword") || "";
    });

    const onKeywordChangeHandler = (keyword) => {
        setKeyword(keyword);
        setSearchParams({ keyword: keyword });
    };

    const onAddHandler = () => {
        navigate("/new");
    };

    React.useEffect(() => {
        const getNotes = async () => {
            try {
                const notes = await getActiveNotes();
                return notes;
            } catch (error) {
                console.info("terjadi error");
            }
        };

        getNotes().then((response) => {
            setNotes(response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
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
    async function addNoteHandler(note) {
        const response = await addNote(note);
        if (!response.error) {
            setNotes([response.data, ...notes])
        }
        navigate("/");
    }

    return (
        <section id="home-page" className="relative sm:fixed flex flex-col sm:grid sm:grid-cols-[50vw_50vw] overflow-hidden">
            <div className="sm:row-start-1 sm:col-start-1 flex flex-col order-2">
                <div className="p-4 fixed z-20 sm:static top-[40px] left-0 right-0 bg-[#229799]">
                    <h2 className="mb-4 text-white text-center text-[120%]">{locale === "id" ? "Catatan Aktif" : "Active Notes"}</h2>
                    <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} className="rounded w-full max-w-[400px] mx-auto border border-[#424242]" iconClassName="text-white bg-[#424242] w-10 h-10 rounded-r p-2"/>
                </div>
                {filteredNotes.length < 1 ? (
                    <div className="pt-24 sm:h-[480px] sm:pt-0 sm:p-4 flex justify-center items-center">
                        <NoteEmpty />
                    </div>
                ) : (
                    <div className="pt-32 sm:h-[calc(100vh-20vh)] lg:h-[calc(100vh-26vh)] sm:p-4  overflow-y-auto sm:bg-[#424242]">
                        <NoteList notes={filteredNotes} className="flex flex-col gap-4 pb-10" />
                    </div>
                )}
            </div>
            <div className="hidden sm:block sm:col-start-2 sm:p-4 order-1 bg-[#F5F5F5] w-full">
                <h3 className="text-center mb-2">{locale === 'en' ? 'Add new note' : 'Tambah catatan baru'}</h3>
                <NoteInput addNote={addNoteHandler} />
            </div>
            <NoteAddButton onAdd={onAddHandler} className="fixed sm:hidden bottom-4 right-4 animate-slow-pulse hover:animate-none" />
        </section>
    );
}
