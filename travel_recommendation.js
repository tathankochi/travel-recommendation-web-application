// Task 6: Fetch data from JSON
const apiPath = 'travel_recommendation_api.json';

async function fetchRecommendations() {
    try {
        const response = await fetch(apiPath);
        const data = await response.json();
        console.log("Data fetched:", data); // Kiểm tra dữ liệu
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Task 7 & 8: Search logic
async function searchCondition() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const resultContainer = document.getElementById('resultContainer');
    resultContainer.innerHTML = ''; // Xóa kết quả cũ

    const data = await fetchRecommendations();
    if (!data) return;

    let results = [];

    // Logic kiểm tra từ khóa (beach, temple, country)
    if (input === 'beach' || input === 'beaches') {
        results = data.beaches;
    } else if (input === 'temple' || input === 'temples') {
        results = data.temples;
    } else {
        // Tìm kiếm theo quốc gia
        const country = data.countries.find(c => c.name.toLowerCase() === input);
        if (country) {
            results = country.cities;
        }
    }

    if (results.length > 0) {
        displayResults(results);
    } else {
        resultContainer.innerHTML = '<p>No results found. Try "beach", "temple", or a country name.</p>';
    }
}

// Hàm hiển thị kết quả lên giao diện
function displayResults(items) {
    const resultContainer = document.getElementById('resultContainer');
    items.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('result-card');
        card.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <button>Visit</button>
        `;
        resultContainer.appendChild(card);
    });
}

// Task 9: Clear button logic
function clearResults() {
    document.getElementById('searchInput').value = '';
    document.getElementById('resultContainer').innerHTML = '';
}

// Gán sự kiện cho các nút
document.getElementById('btnSearch').addEventListener('click', searchCondition);
document.getElementById('btnClear').addEventListener('click', clearResults);