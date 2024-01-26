import { useEffect, useState } from "react";
import "./ViewMessage.scss";
import "./ProductAddPopup.scss";

function ProductFormPopup({
    isOpen,
    ClosePopup,
    options,
    submitCreateProduct: submitEditProduct,
    product,
}) {
    const [formData, setFormData] = useState({
        id: "",
        category_id: "",
        quantity: "",
        name: "",
        description: "",
        supplier_price: "",
        store_price: "",
        supplier_id: "",
        assignee_id: "",
        shelf_id: "",
    });

    const [formErrors, setFormErrors] = useState({
        supplier_name: "",
        supplier_price: "",
        store_price: "",
        name: "",
        quantity: "",
    });

    useEffect(() => {
        if (isOpen && product) {
            setFormData({
                id: String(product.id),
                category_id: product.category_id,
                quantity: product.quantity,
                name: product.name,
                description: product.description,
                supplier_price: product.supplier_price,
                store_price: product.store_price,
                supplier_id: product.supplier_id,
                assignee_id: product.assignee_id,
                shelf_id: product.shelf_id,
            });
        }
    }, [isOpen]);

    if (!isOpen || options == [] || !product) {
        return;
    }

    const handlePopupClick = (event) => {
        event.stopPropagation();
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleFormSubmit = () => {
        // Reset error messages
        setFormErrors({
            supplier_name: "",
            supplier_price: "",
            name: "",
            quantity: "",
        });

        let hasError = false;

        if (formData.name === "") {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                name: "Name is required.",
            }));
            hasError = true;
        }

        if (formData.supplier_id === "") {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                supplier_name: "Supplier is required.", // Fix the property name here
            }));
            hasError = true;
        }

        if (formData.supplier_price === "") {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                supplier_price: "Price is required.",
            }));
            hasError = true;
        }

        if (formData.store_price === "") {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                store_price: "Price is required.",
            }));
            hasError = true;
        }

        if (formData.quantity === "") {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                quantity: "Quantity is required.",
            }));
            hasError = true;
        }

        if (!hasError) {
            submitEditProduct(formData);
            ClosePopup();
        }
    };

    const renderOptions = (optionsArray) => {
        return Object.entries(optionsArray).map(([id, name]) => (
            <option key={id} value={id}>
                {name}
            </option>
        ));
    };

    return (
        <div className="product-add-popup-container" onClick={ClosePopup}>
            <div className="form-popup" onClick={handlePopupClick}>
                <h1>Change Product</h1>
                <div className="content">
                    <h2>Product info</h2>
                    <div className="product-info-container">
                        <div className="input-vertical help">
                            <div className="input-horizontal">
                                <div className="input-container">
                                    <div className="text">
                                        <p className="label">category</p>
                                    </div>
                                    <select
                                        name="category_id"
                                        className="small-input"
                                        value={formData.category_id}
                                        onChange={handleInputChange}
                                    >
                                        <option value="" disabled>
                                            Select
                                        </option>
                                        {renderOptions(options.categories)}
                                    </select>
                                </div>
                                <div className="input-container">
                                    <div className="text">
                                        <p className="label">quantity</p>
                                        <p className="error">
                                            {formErrors.quantity}
                                        </p>
                                    </div>
                                    <input
                                        type="number"
                                        name="quantity"
                                        className="flex-input small-input"
                                        value={formData.quantity}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="input-container">
                                <div className="text">
                                    <p className="label">name</p>
                                    <p className="error">{formErrors.name}</p>
                                </div>
                                <input
                                    name="name"
                                    className="flex-input"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="textarea">
                            <div className="input-container">
                                <div className="text">
                                    <p className="label">description</p>
                                </div>
                                <textarea
                                    name="description"
                                    id=""
                                    cols="5"
                                    rows="5"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                ></textarea>
                            </div>
                        </div>
                    </div>
                    <h2>Supplier & price</h2>
                    <div className="supplier-price-container">
                        <div className="input-horizontal gap-3">
                            <div className="input-horizontal">
                                <div className="input-container">
                                    <div className="text">
                                        <p className="label">sp. price</p>
                                        <p className="error">
                                            {formErrors.supplier_price}
                                        </p>
                                    </div>
                                    <input
                                        name="supplier_price"
                                        className="flex-input small-input"
                                        value={formData.supplier_price}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="input-container">
                                    <div className="text">
                                        <p className="label">store price</p>
                                        <p className="error">
                                            {formErrors.store_price}
                                        </p>
                                    </div>
                                    <input
                                        type="number"
                                        name="store_price"
                                        placeholder={
                                            formData.supplier_price
                                                ? formData.supplier_price * 1.2
                                                : ""
                                        }
                                        value={formData.store_price}
                                        onChange={handleInputChange}
                                        className="flex-input small-input"
                                    />
                                </div>
                            </div>
                            <div className="help">
                                <div className="input-container">
                                    <div className="text">
                                        <p className="label">supplier</p>
                                        <p className="error">
                                            {formErrors.supplier_name}
                                        </p>
                                    </div>
                                    <select
                                        name="supplier_id"
                                        className="small-input"
                                        value={formData.supplier_id}
                                        onChange={handleInputChange}
                                    >
                                        <option value="" disabled>
                                            Select
                                        </option>
                                        {renderOptions(options.suppliers)}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h2>Warehouse assignment</h2>
                    <div className="warehouse-assignment-container">
                        <div className="input-horizontal gap-3">
                            <div className="input-container">
                                <div className="text">
                                    <p className="label">assignee</p>
                                </div>
                                <select
                                    name="assignee_id"
                                    value={formData.assignee_id}
                                    onChange={handleInputChange}
                                >
                                    <option value="" disabled>
                                        Select
                                    </option>
                                    {renderOptions(options.assignees)}
                                </select>
                            </div>
                            <div className="input-container">
                                <div className="text">
                                    <p className="label">shelf</p>
                                </div>
                                <select
                                    name="shelf_id"
                                    value={formData.shelf_id}
                                    onChange={handleInputChange}
                                >
                                    <option value="" disabled>
                                        Select
                                    </option>
                                    {renderOptions(options.shelves)}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="button-container">
                        <button
                            className="flex-button"
                            onClick={handleFormSubmit}
                        >
                            Add product
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductFormPopup;
