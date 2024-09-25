import React, { useRef, useState } from "react";
import { MdDone } from "react-icons/md";

import useInput from "../hooks/useInput";
import PropTypes from "prop-types";
import LocaleContext from "../contexts/LocaleContext";
import ReactQuill from 'react-quill';
import Swal from "sweetalert2";

export default function NoteInput({ addNote }) {
    const { locale } = React.useContext(LocaleContext);

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const onSubmitHandler = (event) => {
        event.preventDefault();
        if (!body || !title) {
            Swal.fire('Warning', locale === 'en' ? 'The field cannot be empty.' : 'Kolom tidak dapat kosong.', 'warning');
        } else {
            addNote({
                title,
                body,
            });
            setTitle('');
            setBody('');
        }
    };

    const modules = {
        toolbar: [
            [{ 'indent': '-1' }, { 'indent': '+1' }],                // Indentasi
            [{ 'align': [] }],                                      // Align text (kiri, tengah, kanan)
            ['bold', 'italic', 'underline', 'strike'],              // Format teks
            [{ 'color': [] }, { 'background': [] }],                 
            ['clean']                                               // Hapus format
        ],
    };

    return (
        <form className="note-input flex flex-col gap-4 px-4 w-full" onSubmit={onSubmitHandler}>
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
                onChange={(e) => setTitle(e.target.value)}
                className="p-2 border border-slate-400 w-full"
            />
            {/* <textarea
				name="body"
				id="body"
				placeholder={
					locale === "id"
						? "Disini adalah isi dari catatan..."
						: "Here is the content of the note"
				}
				value={body}
				onChange={onBodyChangeHandler}
                className="p-2 resize-none h-52"
			></textarea> */}
            <div>
                <ReactQuill theme="snow" value={body} onChange={(value) => setBody(value)} className="bg-white w-full" modules={modules}/>
            </div>

            <button className="note-save__button w-full bg-[#229799] text-white flex items-center justify-center py-1 rounded" type="submit">
                <MdDone className="w-5 h-5 font-bold" />
            </button>
        </form>
    );
}

NoteInput.propTypes = {
    addNote: PropTypes.func.isRequired,
};
