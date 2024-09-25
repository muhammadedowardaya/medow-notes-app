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
        <section id="home-page" className="relative sm:fixed left-0 right-0 top-0 bottom-0 flex flex-col sm:grid sm:grid-cols-[50vw_50vw] overflow-hidden">
            <div className="sm:row-start-1 sm:col-start-1 flex flex-col order-2 pt-12 mx-4 sm:ml-10">
                <div className="p-4 pb-8 sm:mt-8 fixed z-20 sm:static top-[40px] sm:top-[40px] left-0 right-0 bg-[#FFC7C7] dark:bg-[#2C3639]">
                    <h2 className="mb-4 mt-4 sm:mt-0 dark:text-white text-center text-[120%] font-bold">{locale === "id" ? "Catatan Aktif" : "Active Notes"}</h2>
                    <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} className="rounded w-full max-w-[400px] mx-auto border border-[#424242] dark:text-[#171717]" iconClassName="text-white bg-[#424242] w-10 h-10 rounded-r p-2"/>
                </div>
                {filteredNotes.length < 1 ? (
                    <div className="pt-24 sm:h-[480px] sm:pt-0 sm:p-4 flex justify-center items-center">
                        <NoteEmpty />
                    </div>
                ) : (
                    <div className="pt-32 px-4 min-h-screen sm:min-h-[max-content] sm:h-[calc(100vh-24vh)] lg:h-[calc(100vh-33vh)] sm:p-4 overflow-y-auto sm:bg-[#FFE2E2] dark:bg-[#A27B5C]">
                        <NoteList notes={filteredNotes} className="flex flex-col gap-8 lg:gap-6 pb-16 lg:pt-8 lg:pb-10 lg:px-4" classNameItem="dark:bg-[#DCD7C9] dark:text-[#171717]"/>
                    </div>
                )}
            </div>
            <div className="hidden sm:block sm:col-start-2 sm:pt-4 lg:pb-8 lg:p-4 sm:pb-10 sm:mt-20 sm:mx-4 lg:mx-10 mt-4 order-1 h-max bg-[#3F4E4F] text-white">
                <h3 className="text-center mb-6">{locale === 'en' ? 'Add new note' : 'Tambah catatan baru'}</h3>
                <NoteInput addNote={addNoteHandler} />
            </div>
            <NoteAddButton onAdd={onAddHandler} className="fixed sm:hidden bottom-4 right-5 dark:bg-[#2C3639] rounded-full" />
        </section>
    );
}
