import React, { useState } from "react";
import "./MessagesTable.css";

import GoIcon from "../../images/icons/go.svg";

function MessagesTable({ messages, TogglePopup, ToggleViewMessage }) {
    const itemsPerPage = 2;
    const [currentPage, setCurrentPage] = useState(1);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedMessages = messages.slice(startIndex, endIndex);

    const totalPages = Math.ceil(messages.length / itemsPerPage);

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const ghostRowCount = itemsPerPage - displayedMessages.length;

    return (
        <div className="message-table-container">
            <table>
                <thead>
                    <tr>
                        <th>from</th>
                        <th>title</th>
                        <th>content</th>
                        <th>date</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {displayedMessages.map((message) => {
                        return (
                            <tr key={message.id}>
                                <td>{message.from_username}</td>
                                <td>{message.title}</td>
                                <td>{message.content}</td>
                                <td>{message.formatted_created_at}</td>
                                <td>
                                    <button
                                        onClick={() => {
                                            ToggleViewMessage(message);
                                        }}
                                        className="flex-button"
                                    >
                                        <img
                                            src={GoIcon}
                                            alt="view message button"
                                        />
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                    {/* Ghost rows for consistent layout */}
                    {Array.from({ length: ghostRowCount }).map((_, index) => (
                        <tr key={`ghost-${index}`} className="ghost-row">
                            <td>H</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="tool-bar">
                <div className="options-container">
                    <button onClick={TogglePopup} className="flex-button">
                        Create message
                    </button>
                </div>
                <div className="pagination-container">
                    {currentPage} / {totalPages}
                    <button
                        className="flex-button"
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                    >
                        Prev
                    </button>
                    <button
                        className="flex-button"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages || totalPages <= 1}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MessagesTable;
