document.getElementById('newGameButton').addEventListener('click', function() {
    let playerName = localStorage.getItem('playerName');
    if (playerName) {
        window.location.href = '/game';
    } else {
        document.getElementById('namePrompt').style.display = 'block';
    }
});

document.getElementById('leaderboardButton').addEventListener('click', function() {
    window.location.href = '/leaderboard';
});

function startGame() {
    const name = document.getElementById('name').value;
    if (name.trim() === '') {
        alert("Please enter a name.");
        return;
    }
    localStorage.setItem('playerName', name);
    window.location.href = '/game';
}

document.getElementById('namePrompt').querySelector('button').addEventListener('click', function() {
    const nameInput = document.getElementById('name');
    if (nameInput.value.trim() === '') {
        alert("Please enter a name.");
        return;
    }
    startGame(nameInput.value);
});