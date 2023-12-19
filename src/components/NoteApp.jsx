import React from "react";
import { Route, Routes } from "react-router-dom";

import HomePage from "../pages/HomePage";
import AddNotePage from "../pages/AddNotePage";
import ArchivesPage from "../pages/ArchivesPage";
import NotFoundPage from "../pages/NotFoundPage";
import DetailPageWrapper from "../pages/DetailPage";

import Navigation from "./Navigation";

export default function NoteApp() {
	return (
		<div className="note-app">
			<header className="note-app__header">
				<Navigation />
			</header>
			<main>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/new" element={<AddNotePage />} />
					<Route path="/archives" element={<ArchivesPage />} />
					<Route path="/detail/:id" element={<DetailPageWrapper />} />

                    {/* Tampilkan halaman not found ketika url tidak ada */}
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</main>
		</div>
	);
}
