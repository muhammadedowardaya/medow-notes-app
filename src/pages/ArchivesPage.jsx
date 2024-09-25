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
        <section id="archived-page" className="relative sm:fixed left-0 right-0 top-0 bottom-0 flex flex-col overflow-hidden">
            <div className="fixed top-[40px] z-20 left-0 right-0 p-4 pb-8 w-full bg-[#F5F5F5] dark:bg-[#2C3639] grid grid-cols-[auto] items-center">
                <div className="w-full py-4 flex items-center justify-center">
                    <h2 className="text-[#171717] dark:text-[#F5E8C7] text-center text-[200%] font-extrabold">{locale === "id" ? "Catatan Arsip" : "Archived Notes"}</h2>
                </div>
                <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} className="rounded w-full max-w-[400px] mx-auto border border-[#424242] dark:text-[#171717]" iconClassName="text-white bg-[#424242] w-10 h-10 rounded-r p-2" />
            </div>


            {filteredNotes.length < 1 ? (
                <div className="pt-40 sm:pt-0 p-4 flex justify-center items-center w-full h-full">
                    <NoteEmpty />
                </div>
            ) : (
                <div className="pt-32 sm:pt-44 pb-10 h-[calc(100vh)] overflow-y-auto">
                    <NoteList notes={filteredNotes} className="columns-1 sm:columns-2 lg:columns-3 sm:p-10 bg-transparent" classNameItem="text-sm m-4 break-inside-avoid mb-4 dark:bg-[#DCD7C9] dark:text-[#171717]" />
                </div>
            )}
        </section>
    );
}
