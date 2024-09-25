import React from "react";
import PropTypes from "prop-types";
import { getTimeAgo, showFormattedDate } from "../utils";

const truncateBody = (body, maxLength) => {
    if (body.length > maxLength) {
        return body.substring(0, maxLength) + " . . . . .";
    }
    return body;
};

export default function NoteItem({ id, title, createdAt, body, className }) {
    const truncatedBody = truncateBody(body, 80); // Limit to 200 characters

    return (
        <div className={`note-item ${className}`} key={id}>
            <h1 className="title text-[120%] font-bold">{title}</h1>
            <div className="body mt-4 leading-5 ql-editor" dangerouslySetInnerHTML={{ __html: truncatedBody }}></div>
            <div className="flex flex-col sm:flex-row items-end sm:items-center justify-between gap-x-6 mt-4">
                <p className="createdAt">{showFormattedDate(createdAt)}</p>
                <p className="createdAt">{getTimeAgo(createdAt)}</p>
            </div>
        </div>
    );
}

NoteItem.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
};