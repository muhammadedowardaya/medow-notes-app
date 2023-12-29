import React from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import HomePage from "../pages/HomePage";
import AddNotePage from "../pages/AddNotePage";
import ArchivesPage from "../pages/ArchivesPage";
import NotFoundPage from "../pages/NotFoundPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

import Navigation from "./Navigation";
import { getUserLogged, putAccessToken } from "../utils/network-data";
import LocaleContext from "../contexts/LocaleContext";
import DetailPage from "../pages/DetailPage";
import Swal from "sweetalert2";

export default function NoteApp() {
	const [name, setName] = React.useState(null);
	const [loading, setLoading] = React.useState(true);
	const [authedUser, setAuthedUser] = React.useState(null);

	const [isOnline, setIsOnline] = React.useState(navigator.onLine);

	const [locale, setLocale] = React.useState(
		localStorage.getItem("locale") || "id"
	);

	const [theme, setTheme] = React.useState(
		localStorage.getItem("theme") || "light"
	);

	const [archived, setArchived] = React.useState(
		Boolean(localStorage.getItem("archived")) || false
	);

	const toggleLocale = () => {
		const newLocale = locale === "id" ? "en" : "id";
		localStorage.setItem("locale", newLocale);
		setLocale(newLocale);
	};

	const toggleTheme = () => {
		const newTheme = theme === "light" ? "dark" : "light";
		localStorage.setItem("theme", newTheme);
		setTheme(newTheme);
	};

	const location = useLocation();
	const currentPath = location.pathname;

	const toggleArchived = () => {
		const newArchived = !archived;
		localStorage.setItem("archived", newArchived);
		setArchived(newArchived);
	};

	const localeContext = {
		locale,
		toggleLocale,
		theme,
		toggleTheme,
		archived,
		toggleArchived,
	};

	const navigate = useNavigate();

	const onLoginSuccess = async ({ accessToken }) => {
		putAccessToken(accessToken);
		const { data } = await getUserLogged();
		setAuthedUser(data);
		setName(data.name);
		navigate("/");
	};

	const onLogout = () => {
		setAuthedUser(null);
		setName(null);
		putAccessToken("");
		navigate("/login");
	};

	React.useEffect(() => {
		setLoading(true);
		if (isOnline) {
			const getAuthedUser = async () => {
				try {
					const { data } = await getUserLogged();
					return data;
				} catch (error) {
					// console.error("terjadi error");
				}
			};
			getAuthedUser().then((response) => {
				if (response === null) {
					navigate("/login");
				} else {
					setName(response.name);
					setAuthedUser(response.data);
				}
				setLoading(false);
			});
		} else {
			setLoading(false);
            navigate("/login");
		}
	}, [currentPath]);

	React.useEffect(() => {
		document.documentElement.setAttribute("data-theme", theme);
	}, [theme]);

	React.useEffect(() => {
		if (archived && currentPath === "/") {
			setArchived(false);
		} else if (currentPath === "/archives") {
			setArchived(true);
		} else if (currentPath === "/") {
			setArchived(false);
		}
	}, [currentPath]);

	if (loading) {
		Swal.fire({
			title: locale === "id" ? "Tunggu sebentar" : "Loading...",
			text:
				locale === "id"
					? "Sedang memuat halaman..."
					: "Please be patient, this is an exam",
			imageUrl: "../../public/gif/sad.gif",
			imageWidth: 400,
			imageAlt: "Custom image",
			showConfirmButton: false,
		});
	} else {
		if (!isOnline) {
			Swal.fire({
				title: locale === "id" ? "Anda sedang offline" : "No network",
				text:
					locale === "id"
						? "Silahkan hubungkan ke jaringan internet..."
						: "Please connect to the internet.",
				imageUrl: "../../public/gif/sad.gif",
				imageWidth: 400,
				imageAlt: "Custom image",
				showConfirmButton: false,
			});
		} else {
			Swal.close();
		}
	}

	return (
		<LocaleContext.Provider value={localeContext}>
			<div className={`note-app ${loading ? "loading" : ""}`}>
				<header className="note-app__header">
					<Navigation name={name} logout={onLogout} />
				</header>
				<main>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route
							path="/login"
							element={<LoginPage loginSuccess={onLoginSuccess} />}
						/>
						<Route path="/register" element={<RegisterPage />} />
						<Route path="/new" element={<AddNotePage />} />
						<Route path="/archives" element={<ArchivesPage />} />
						<Route path="/detail/:id" element={<DetailPage />} />

						{/* Tampilkan halaman not found ketika url tidak ada */}
						<Route path="*" element={<NotFoundPage />} />
					</Routes>
				</main>
			</div>
		</LocaleContext.Provider>
	);
}
