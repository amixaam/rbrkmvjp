// async function DownloadReport(timeframe, endpoint) {
//     console.log(timeframe);

//     try {
//         const response = await fetch(endpoint, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${sessionStorage.getItem("token")}`,
//             },
//             body: JSON.stringify(timeframe),
//         });

//         if (response.ok) {
//             const responseData = await response.json();
//             const pdfPath = responseData.pdf_path;

//             // Fetch the PDF separately
//             const pdfResponse = await fetch(
//                 `http://127.0.0.1:8000/api/storage/${pdfPath}`,
//                 {
//                     method: "GET",
//                     headers: {
//                         "Content-Type": "application/pdf",
//                     },
//                 }
//             )
//                 .then((response) => response.blob())
//                 .then((blob) => {
//                     // Create blob link to download
//                     const url = window.URL.createObjectURL(new Blob([blob]));
//                     const link = document.createElement("a");
//                     link.href = url;
//                     link.setAttribute("download", `report.pdf`);

//                     // Append to html link element page
//                     document.body.appendChild(link);

//                     // Start download
//                     link.click();

//                     // Clean up and remove the link
//                     link.parentNode.removeChild(link);
//                 });
//         }
//     } catch (error) {
//         console.error("Failed to create report: ", error);
//         throw error;
//     }
// }

// export default DownloadReport;

async function DownloadReport(timeframe, endpoint) {
    console.log(timeframe);

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
            body: JSON.stringify(timeframe),
        });

        if (response.ok) {
            const blob = await response.blob();

            // Create blob link to download
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `report.pdf`);

            // Append to html link element page
            document.body.appendChild(link);

            // Start download
            link.click();

            // Clean up and remove the link
            link.parentNode.removeChild(link);
        }
    } catch (error) {
        console.error("Failed to create or download report: ", error);
        throw error;
    }
}

export default DownloadReport;
