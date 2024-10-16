let currentPage = 1;
const rowsPerPage = 5;

function fetchLeaderboard(page) {
    fetch(`/api/leaderboard?page=${page}&limit=${rowsPerPage}`)
        .then(response => response.json())
        .then(data => {
            updateTable(data);
            document.getElementById('prevButton').disabled = currentPage === 1;
            document.getElementById('nextButton').disabled = data.length < rowsPerPage;
        })
        .catch(error => console.error('Error loading leaderboard:', error));
}

function updateTable(data) {
    const tableBody = document.getElementById('leaderboardBody');
    tableBody.innerHTML = '';
    data.forEach(entry => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = entry.name;
        row.insertCell(1).textContent = entry.score;
    });
}

fetchLeaderboard(currentPage);

document.getElementById('prevButton').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        fetchLeaderboard(currentPage);
    }
});

document.getElementById('nextButton').addEventListener('click', () => {
    currentPage++;
    fetchLeaderboard(currentPage);
});

document.getElementById('menuButton').addEventListener('click', () => {
    window.location.href = '/';
});

fetchLeaderboard(currentPage);