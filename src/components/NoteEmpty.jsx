import React from "react";

import { ImFileEmpty } from "react-icons/im";

export default function NoteEmpty(){
    return (
        <div className="note-empty">
            <ImFileEmpty className="icon"/>
            <h1>Tidak ada catatan</h1>
        </div>
    )
}