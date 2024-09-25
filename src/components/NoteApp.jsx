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
import { NotesProvider } from "../contexts/NotesContext";

import 'react-quill/dist/quill.snow.css';

export default function NoteApp() {
    const [name, setName] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [authedUser, setAuthedUser] = React.useState(null);

    const [notes, setNotes] = React.useState([]);

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

    const notesContext = {
        notes,
        setNotes
    }

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
        if (locale === 'en') {
            Swal.fire({
                title: 'Are you sure you want to log out?',
                text: 'You will need to log in again to access your account.',
                icon: 'warning',
                showConfirmButton: true,
                confirmButtonText: 'Yes',
                showCancelButton: true
            }).then(response => {
                if (response.isConfirmed) {
                    setAuthedUser(null);
                    setName(null);
                    putAccessToken("");
                    navigate("/login");
                }
            })
        } else {
            Swal.fire({
                title: 'Apakah kamu yakin ingin keluar?',
                text: 'Kamu perlu masuk kembali untuk mengakses akunmu.',
                icon: 'warning',
                showConfirmButton: true,
                confirmButtonText: 'Ya',
                showCancelButton: true
            }).then(response => {
                if (response.isConfirmed) {
                    setAuthedUser(null);
                    setName(null);
                    putAccessToken("");
                    navigate("/login");
                }
            })
        }

    };

    React.useEffect(() => {
        if (isOnline) {
            const getAuthedUser = async () => {
                setLoading(true);
                try {
                    const { data } = await getUserLogged();
                    return data;
                } catch (error) {
                    // console.error("terjadi error");
                }
            };
            getAuthedUser().then((response) => {
                if (response === null) {
                    if (currentPath !== "/register") {
                        navigate("/login");
                    }
                } else {
                    if (currentPath === "/login" || currentPath === "/register") {
                        navigate("/");
                    }
                    setName(response.name);
                    setAuthedUser(response.data);
                }
                setLoading(false);
            });
        } else {
            setLoading(false);
            navigate("/login");
        }

    }, [currentPath, isOnline]);

    React.useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    const checkIsOnline = () => {
        setIsOnline(navigator.onLine)
    }

    React.useEffect(() => {
        window.addEventListener('online', checkIsOnline);
        window.addEventListener('offline', checkIsOnline);

        return () => {
            window.removeEventListener('online', checkIsOnline);
            window.removeEventListener('offline', checkIsOnline);
        }
    }, []);

    React.useEffect(() => {
        if (archived && currentPath === "/") {
            setArchived(false);
        } else if (currentPath === "/archives") {
            setArchived(true);
        } else if (currentPath === "/") {
            setArchived(false);
        }
    }, [currentPath]);

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            if (theme === 'dark') {
                if(!document.documentElement.classList.contains('dark')){
                    document.documentElement.classList.add('dark');
                }
            }else{
                if(document.documentElement.classList.contains('dark')){
                    document.documentElement.classList.remove('dark');
                }
            }
        }
    }, [theme])


    if (!isOnline) {
        return (
            <div className="fixed z-50 top-0 bottom-0 left-0 right-0 flex items-center justify-center">
                <div className="m-auto w-[300px] space-y-2">
                    <h1 className="font-bold text-[120%]">{locale === "id" ? "Anda sedang offline" : "No network"}</h1>
                    <p className="leading-4">{locale === "id"
                        ? "Silahkan hubungkan ke jaringan internet..."
                        : "Please connect to the internet."}</p>
                    <img src="/gif/sad.gif" className="object-cover w-full h-full" />
                </div>
            </div>
        )
    } else if (loading) {
        Swal.fire({
            title: locale === "id" ? "Tunggu sebentar" : "Loading...",
            text:
                locale === "id"
                    ? "Sedang memuat halaman..."
                    : "Please be patient, this is an exam",
            imageUrl: "/gif/sad.gif",
            imageWidth: 400,
            imageAlt: "Custom image",
            showConfirmButton: false,
        });
    } else {
        Swal.close();
    }


    return (
        <NotesProvider value={notesContext}>
            <LocaleContext.Provider value={localeContext}>
                <div className={`note-app ${loading ? "loading" : ""} relative pt-10 text-xs md:text-sm lg:text-base bg-[#F6F6F6] dark:bg-[#2C3639] dark:text-slate-100`}>
                    <header className="note-app__header fixed top-0 left-0 right-0 z-50">
                        <Navigation name={name} logout={onLogout} />
                    </header>
                    <main className="min-h-[calc(100vh-40px)]">
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
        </NotesProvider>
    );
}
