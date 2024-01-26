import React, { useEffect, useState } from "react";

import "./ProductsTable.css";
import EditIcon from "../../images/icons/edit.svg";

function UsersTable({
    products,
    TogglePopup,
    ToggleProductHistory,
    openEditProduct,
    openAddProduct,
}) {
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

    const handleEditClick = (product) => {
        openEditProduct(product);
    };

    return (
        <div className="products-table-container">
            <table>
                <thead>
                    <tr>
                        <th className="hide-on-mobile">ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th className="hide-on-mobile">Role</th>
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
                                <td className="hide-on-mobile">{product.id}</td>
                                <td>{product.username}</td>
                                <td>{product.email}</td>
                                <td className="hide-on-mobile">
                                    {product.role.name}
                                </td>
                                <td>
                                    <button
                                        className="flex-button"
                                        onClick={() => {
                                            handleEditClick(product);
                                        }}
                                    >
                                        <img
                                            src={EditIcon}
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
                            <td className="hide-on-mobile"></td>
                            <td className="hide-on-mobile"></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="tool-bar">
                <div className="options-container">
                    <button
                        className="flex-button SMALL"
                        onClick={ToggleProductHistory}
                    >
                        View all
                    </button>
                    <button
                        className="flex-button SMALL"
                        onClick={openAddProduct}
                    >
                        Add user
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

export default UsersTable;
