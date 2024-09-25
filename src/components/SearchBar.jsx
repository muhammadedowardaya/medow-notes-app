import React from "react";

import PropTypes from "prop-types";
import LocaleContext from "../contexts/LocaleContext";
import { IoIosSearch } from "react-icons/io";

export default function SearchBar({ keyword, keywordChange, className, iconClassName }) {
    const { locale } = React.useContext(LocaleContext);

    return (
        <div className={`grid grid-cols-[1fr_max-content] ${className}`}>
            <input
                className="w-full h-full p-2 rounded-l focus-within:outline-none"
                type="text"
                placeholder={
                    locale === "id" ? "Cari berdasarkan title" : "Search by title"
                }
                value={keyword}
                onChange={(event) => keywordChange(event.target.value)}
            />
            <IoIosSearch className={`${iconClassName}`} />
        </div>
    );
}

SearchBar.propTypes = {
    keyword: PropTypes.string,
    keywordChange: PropTypes.func.isRequired,
};
