import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { showFormattedDate } from "../utils";
import NoteArchiveButton from "../components/NoteArchiveButton";
import NoteDeleteButton from "../components/NoteDeleteButton";
import NoteUnarchiveButton from "../components/NoteUnarchiveButton";

import {
    archiveNote,
    deleteNote,
    getNote,
    unarchiveNote,
} from "../utils/network-data";
import Swal from "sweetalert2";
import LocaleContext from "../contexts/LocaleContext";

export default function DetailPage() {
    const { locale } = React.useContext(LocaleContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const [note, setNote] = React.useState({});

    const onArchiveHandler = async () => {
        Swal.fire({
            title: locale === 'en' ? `Are you sure you want to move this to the archive?` : 'Apakah kamu yakin ingin memindahkan ini ke arsip?',
            text: locale === 'en' ? 'You can restore it later from the archive if needed.' : 'Kamu bisa mengembalikannya dari arsip jika diperlukan.',
            icon: 'question',
            showCancelButton: true,
            showConfirmButton: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await archiveNote(id);
                    navigate("/archives");
                } catch (error) {
                    //
                }
            }
        });

    };

    const onUnarchiveHandler = async () => {
        Swal.fire({
            title: locale === 'en' ? `Are you sure you want to remove this from the archive?` : 'Apakah kamu yakin ingin mengeluarkan ini dari arsip?',
            text: locale === 'en' ? 'It will no longer be stored in the archive.' : 'Ini tidak akan lagi disimpan dalam arsip.',
            icon: 'question',
            showCancelButton: true,
            showConfirmButton: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await unarchiveNote(id);
                    navigate("/");
                } catch (error) {
                    //
                }
            }
        });
    };

    const onDeleteHandler = async () => {
        if (locale === 'en') {
            Swal.fire({
                title: 'Are you sure you want to delete this?',
                text: 'This action cannot be undone.',
                icon: 'warning',
                showCancelButton: true,
                showConfirmButton: true
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await deleteNote(id);
                        Swal.fire({
                            title: 'Deleted!',
                            text: 'Your note has been successfully deleted.',
                            icon: 'success'
                        });
                        navigate("/");
                    } catch (error) {
                        // handle error
                    }
                }
            });
        } else {
            Swal.fire({
                title: 'Kamu yakin ingin menghapusnya?',
                text: 'Aksi ini tidak dapat diurungkan.',
                showCancelButton: true,
                icon: 'warning',
                showConfirmButton: true
            }).then(async result => {
                if (result.isConfirmed) {
                    try {
                        await deleteNote(id);
                        Swal.fire({
                            title: 'Berhasil dihapus!',
                            text: 'Catatan kamu telah berhasil dihapus.',
                            icon: 'success'
                        });

                        navigate("/");
                    } catch (error) {
                        //
                    }
                }
            })
        }
    };

    React.useEffect(() => {
        const getNoteDetail = async () => {
            try {
                const response = await getNote(id);
                return response;
            } catch (error) {
                console.error("terdapat error");
            }
        };

        getNoteDetail().then((response) => {
            setNote(response.data);
        });
    }, []);

    return (
        <div className="detail-page">
            <ul className="flex items-center gap-x-4 justify-center mb-4">
                <li>
                    <Link to="/" className="cursor-pointer underline underline-offset-2 px-2 py-2 block">Home</Link>
                </li>
                <li>
                    <span>{`>`}</span>
                </li>
                <li>
                    <span>{locale === 'en' ? 'Note Detail' : 'Detail Catatan'}</span>
                </li>
            </ul>
            <div className="border-2 w-full sm:max-w-[70%] mx-auto bg-[#EAE4DD] p-4">
                <h1 className="title font-bold text-[150%]">{note.title}</h1>
                <p className="createdAt text-sm underline underline-offset-4">{showFormattedDate(note.createdAt)}</p>
                <div className="body my-4 ql-editor border border-[#E1D7C6] bg-[#295F98] text-[#F5F5F5]" dangerouslySetInnerHTML={{ __html: note.body }}></div>
                <div className="flex items-center gap-x-4">
                    {note.archived == true ? (
                        <div className="flex items-center gap-x-2">
                            <NoteUnarchiveButton onUnarchive={onUnarchiveHandler} />
                            <span>{locale === 'en' ? 'Unarchive' : 'Keluarkan dari Arsip'}</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-x-2">
                            <NoteArchiveButton onArchive={onArchiveHandler} />
                            <span>{locale === 'en' ? 'Archive' : 'Pindahkan ke Arsip'}</span>
                        </div>
                    )}
                    <div className="flex items-center gap-x-2">
                        <NoteDeleteButton onDelete={onDeleteHandler} />
                        <span>{locale === 'en' ? 'Delete' : 'Hapus'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
