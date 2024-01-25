import React, { useEffect, useState } from "react";

import "./ProductsTable.css";
import CheckIcon from "../../images/icons/check.svg";

function ProductsTable({ products, TogglePopup, handleMarkComplete }) {
    const [displayerProducts, setDisplayerProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [ghostRowCount, setGhostRowCount] = useState(0);

    const itemsPerPage = 2;

    useEffect(() => {
        // Filter products based on delivered status
        const filteredProducts = products.filter(
            (product) => !product.delivered
        );

        // Calculate pagination-related values
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const displayerProducts = filteredProducts.slice(startIndex, endIndex);
        const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
        const ghostRowCount = itemsPerPage - displayerProducts.length;

        // Update state
        setDisplayerProducts(displayerProducts);
        setTotalPages(totalPages);
        setGhostRowCount(ghostRowCount);
    }, [products, currentPage]);

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const handleCompleteButton = (data) => {
        if (data.delivered) {
            return;
        }
        handleMarkComplete(data);
    };

    return (
        <div className="products-table-container">
            <table>
                <thead>
                    <tr>
                        <th className="hide-on-mobile">Supplier</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th className="hide-on-mobile">category</th>
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
                                <td className="hide-on-mobile">
                                    {product.supplier_name}
                                </td>
                                <td>{product.name}</td>
                                <td>{product.quantity}</td>
                                <td className="hide-on-mobile">
                                    {product.category_name}
                                </td>
                                <td>{product.shelf_name}</td>
                                <td>{product.delivered ? "yes" : "no"}</td>
                                <td>
                                    <button
                                        className="flex-button"
                                        onClick={() => {
                                            handleCompleteButton(product);
                                        }}
                                    >
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
                            <td className="hide-on-mobile"></td>
                            <td className="hide-on-mobile"></td>
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
