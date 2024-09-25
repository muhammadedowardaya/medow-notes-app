import React from "react";

import { ImFileEmpty } from "react-icons/im";
import LocaleContext from "../contexts/LocaleContext";

export default function NoteEmpty() {
	const { locale } = React.useContext(LocaleContext);

	return (
		<div className="note-empty flex items-center gap-4">
			<ImFileEmpty className="icon w-10 h-10" />
			<h1>{locale === "id" ? "Tidak ada catatan ditemukan." : "No records found."}</h1>
		</div>
	);
}
