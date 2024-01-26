async function UpdateProduct(formData) {
    const jsonString = JSON.stringify(formData);
    console.log("Request Payload:", jsonString);

    try {
        const response = await fetch(`http://127.0.0.1:8000/api/products`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json", // Change content type to JSON
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
            body: jsonString,
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(`Failed to edit product: ${response.status}`);
        }
    } catch (error) {
        console.error("Error fetching");
        throw error;
    }
}
export default UpdateProduct;
