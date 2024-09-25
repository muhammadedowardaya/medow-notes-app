import React from "react";
import NoteInput from "../components/NoteInput";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { addNote } from "../utils/network-data";
import LocaleContext from "../contexts/LocaleContext";
import NotesContext from "../contexts/NotesContext";

function AddNotePage() {
    const { locale } = React.useContext(LocaleContext);
    const { notes, setNotes } = React.useContext(NotesContext);

    const navigate = useNavigate();

    function addNoteHandler(note) {
        addNote(note);
        setNotes([note, ...notes]);
        navigate("/");
    }

    function backToHome() {
        return navigate('/');
    }

    return (
        <div className="w-full max-w-[600px] mx-auto">
            <div onClick={() => backToHome()} className="ml-auto cursor-pointer w-max rounded border border-slate-400 px-2 py-1 m-4">
                back
            </div>
            <h3 className="text-center mb-2">{locale === 'en' ? 'Add new note' : 'Tambah catatan baru'}</h3>
            <NoteInput addNote={addNoteHandler} />
        </div>
    )
}

export default AddNotePage;
