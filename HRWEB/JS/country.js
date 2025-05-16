const COUNTRY_URL = "https://ominous-guacamole-5g5j6r4gr569346g7-6006.app.github.dev/country";

fetch(COUNTRY_URL).then(response => {
    if (!response.ok)
        throw new Error("Failed to fetch country data")
    return response.json();
}).then(data => {
    const tbody = document.querySelector("#countryTable tbody")

    data.forEach(country => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${country.country_id}</td>
            <td>${country.country_name}</td>
            <td>${country.region_id}</td>
        `;

    tbody.appendChild(row);
    });
}).catch(err => {
    console.log(err.message);
})