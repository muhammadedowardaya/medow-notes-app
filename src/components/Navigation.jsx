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
import { MdOutlineStickyNote2 } from "react-icons/md";

import PropTypes from "prop-types";

import LocaleContext from "../contexts/LocaleContext";

export default function Navigation({ logout, name }) {
    const { locale, toggleLocale } = React.useContext(LocaleContext);
    const { theme, toggleTheme } = React.useContext(LocaleContext);
    const { archived, toggleArchived } = React.useContext(LocaleContext);

    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <nav className="navigation flex items-center justify-between py-3 px-4 bg-[#8785A2] text-white dark:bg-[#3F4E4F]">
            <Link to="/">
                <h1 className="items-center justify-center gap-x-2 hidden xs:flex">
                    <span className="hidden sm:inline-block">MEDOW</span>
                    <span className="hidden sm:inline-block">|</span>
                    <span className="hidden xs:inline-block">{locale === "id" ? "Aplikasi Catatan" : "Notes App"}</span>
                </h1>
                <MdOutlineStickyNote2 className="w-5 h-5 xs:hidden"/>
            </Link>
            <ul className="flex items-center gap-x-4">
                {name && (
                    <Link to={archived ? "/" : "/archives"} onClick={toggleArchived}>
                        <li className="flex items-center gap-x-1">
                            {archived ? (
                                <>
                                    <FaRegStickyNote className="list-icon w-5 h-5" />
                                    <span className="hidden sm:block">{locale === "en" ? "Notes" : "Catatan"}</span>
                                </>
                            ) : (
                                <>
                                    <IoMdArchive className="list-icon w-5 h-5" />
                                    <span className="hidden sm:block">{locale === "en" ? "Archives" : "Arsip"}</span>
                                </>
                            )}
                        </li>
                    </Link>
                )}
                <li onClick={toggleLocale} className="flex items-center gap-x-1 cursor-pointer">
                    <MdOutlineGTranslate className="list-icon w-5 h-5" />:
                    <span>{locale === "id" ? "en" : "id"}</span>
                </li>
                <li onClick={toggleTheme} className="flex items-center">
                    {theme === "light" ? (
                        <MdOutlineDarkMode className="list-icon w-5 h-5 cursor-pointer" />
                    ) : (
                        <MdLightMode className="list-icon w-5 h-5 cursor-pointer" />
                    )}
                </li>
                {name && (
                    <li onClick={logout} className="flex items-center gap-x-2 cursor-pointer">
                        <FiLogOut className="list-icon w-5 h-5" id="logout-icon" />
                        <span className="hidden sm:block">{name}</span>
                        <div className="sm:hidden w-6 h-6 bg-pink-500 rounded-full flex items-center text-xs p-1">
                            <span>{name.split('').slice(0,2)}</span>
                        </div>
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