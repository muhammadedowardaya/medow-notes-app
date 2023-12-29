import React from "react";

import { ImFileEmpty } from "react-icons/im";
import LocaleContext from "../contexts/LocaleContext";

export default function NoteEmpty() {
	const { locale } = React.useContext(LocaleContext);

	return (
		<div className="note-empty">
			<ImFileEmpty className="icon" />
			<h1>{locale === "id" ? "Tidak ada catatan" : "Empty Notes"}</h1>
		</div>
	);
}
