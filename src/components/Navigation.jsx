import React from "react";
import { Link, useLocation } from "react-router-dom";

import { IoMdArchive } from "react-icons/io";
import {
	MdLightMode,
	MdOutlineDarkMode,
	MdOutlineGTranslate,
} from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { FaRegStickyNote } from "react-icons/fa";

import PropTypes from "prop-types";

import LocaleContext from "../contexts/LocaleContext";

export default function Navigation({ logout, name }) {
	const { locale, toggleLocale } = React.useContext(LocaleContext);
	const { theme, toggleTheme } = React.useContext(LocaleContext);
	const { archived, toggleArchived } = React.useContext(LocaleContext);

	const location = useLocation();
	const currentPath = location.pathname;

	return (
		<nav className="navigation">
			<Link to="/">
				<h1>
					<span>MEDOW</span>
					<span>|</span>
					<span>{locale === "id" ? "Aplikasi Catatan" : "Notes App"}</span>
				</h1>
			</Link>
			<ul>
				{name && (
					<Link to={archived ? "/" : "/archives"} onClick={toggleArchived}>
						<li>
							{archived ? (
								<>
									<FaRegStickyNote className="list-icon" /> {locale === "en" ? "Notes" : "Catatan"}
								</>
							) : (
								<>
									<IoMdArchive className="list-icon" /> {locale === "en" ? "Archives" : "Arsip"}
								</>
							)}
						</li>
					</Link>
				)}
				<li onClick={toggleLocale}>
					<MdOutlineGTranslate className="list-icon" />:
					{locale === "id" ? "en" : "id"}
				</li>
				<li onClick={toggleTheme}>
					{theme === "light" ? (
						<MdOutlineDarkMode className="list-icon" />
					) : (
						<MdLightMode className="list-icon" />
					)}
				</li>
				{name && (
					<li onClick={logout}>
						<FiLogOut className="list-icon" id="logout-icon" />
						{name}
					</li>
				)}
			</ul>
		</nav>
	);
}


Navigation.propTypes = {
    logout: PropTypes.func.isRequired,
    name: PropTypes.string
}