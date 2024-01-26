async function GetUsernameOptions() {
    try {
        const response = await fetch(
            `http://127.0.0.1:8000/api/messages/options`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            }
        );

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error("Error fetching options", error);
    }
}

export default GetUsernameOptions;
