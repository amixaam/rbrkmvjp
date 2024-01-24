import React, { useState } from "react";

import "./ProductsTable.css";
import CheckIcon from "../../images/icons/check.svg";

function ProductsTable({ products, TogglePopup }) {
    const itemsPerPage = 2;
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayerProducts = products.slice(startIndex, endIndex);

    const totalPages = Math.ceil(products.length / itemsPerPage);

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const ghostRowCount = itemsPerPage - displayerProducts.length;
    return (
        <div className="products-table-container">
            <table>
                <thead>
                    <tr>
                        <th>Supplier</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>category</th>
                        <th>to shelf</th>
                        <th>Delivered</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {displayerProducts.map((product) => {
                        if (product.delivered) {
                            return;
                        }
                        return (
                            <tr key={product.id}>
                                <td>{product.supplier_name}</td>
                                <td>{product.name}</td>
                                <td>{product.quantity}</td>
                                <td>{product.category_name}</td>
                                <td>{product.shelf_name}</td>
                                <td>{product.delivered ? "yes" : "no"}</td>
                                <td>
                                    <button className="flex-button">
                                        <img
                                            src={CheckIcon}
                                            alt="mark completed button"
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
                            <td></td>
                            <td></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="tool-bar">
                <div className="options-container">
                    <button className="flex-button" onClick={TogglePopup}>
                        Create report
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

export default ProductsTable;
