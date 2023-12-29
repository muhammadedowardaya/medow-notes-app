import React from "react";
import LocaleContext from "../contexts/LocaleContext";

export default function NotFoundPage(){

    const { locale } = React.useContext(LocaleContext);

    return (
        <div className="not-found__page">
            <h1>404</h1>
            <p>{locale === "id" ? "Halaman tidak ditemukan" : "Page not found"}</p>
        </div>
    )
}