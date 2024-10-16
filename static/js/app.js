const main = document.querySelector(".main");
const starcraft = document.querySelector(".startcraft");
const pscore = document.querySelector(".score p");
const modal = document.querySelector(".modal");
const startbutton = document.querySelector(".startgame");

// Sound effects with Flask static paths
let laser = new Audio('/static/sounds/laser.mp3');
let boom = new Audio('/static/sounds/boom.mp3');

// Game variables
let move;
let score = 0;
let x, y;
let velocity = 1.01;

// Create stars
for (let a = 1; a <= 1000; a++) {
    const star = document.createElement("div");
    x = Math.floor(Math.random() * window.innerWidth);
    y = Math.floor(Math.random() * window.innerHeight);
    star.style.top = y + "px";
    star.style.left = x + "px";
    star.classList.add("star");
    let starsize = Math.floor(Math.random() * 3);
    star.style.height = starsize + "px";
    star.style.width = starsize + "px";
    star.style.background = starsize < 4 ? "lightgray" : "white";
    main.appendChild(star);
}

main.addEventListener("mousemove", (e) => {
    x = e.clientX;
    y = e.clientY;
    starcraft.style.left = x + "px";
    if (y > window.innerHeight / 2) {
        starcraft.style.top = y + "px";
    }
});

main.addEventListener("click", () => {
    velocity += 0.5;
    let bullet = document.createElement("div");
    bullet.classList.add("bullet");
    bullet.style.left = x + "px";
    bullet.style.top = y - 50 + "px";
    main.appendChild(bullet);
    laser.play();
    laser.currentTime = 0;
    let bulletInterval = setInterval(() => {
        let rocks = document.querySelectorAll(".rock");
        for (let i = 0; i < rocks.length; i++) {
            let rock = rocks[i];
            let rockbounds = rock.getBoundingClientRect();
            let bulletbounds = bullet.getBoundingClientRect();

            if (bulletbounds.left >= rockbounds.left &&
                bulletbounds.right <= rockbounds.right &&
                bulletbounds.top <= rockbounds.top &&
                bulletbounds.bottom <= rockbounds.bottom) {
                main.removeChild(bullet);
                setTimeout(() => {
                    main.removeChild(rock);
                    score += 10;
                    pscore.textContent = score;
                }, 500);
                boom.play();
                boom.currentTime = 0;
                rock.classList.add("astroidexplode");
                clearInterval(bulletInterval);
                break;
            }
        }

        let bullettop = parseInt(window.getComputedStyle(bullet).getPropertyValue("top"));
        bullet.style.top = bullettop - 5 + "px";
        if (bullettop < 0) {
            main.removeChild(bullet);
            clearInterval(bulletInterval);
        }
    }, 10);
});

function rockmove() {
    move = setInterval(() => {
        let rock = document.createElement("div");
        rock.classList.add("rock");
        let left = Math.floor(Math.random() * window.innerWidth - 50);
        rock.style.left = left + "px";
        rock.style.top = 50 + "px";
        main.appendChild(rock);

        let rockcount = document.querySelectorAll(".rock");
        for (let i = 1; i <= rockcount.length; i++) {
            let rocktop = parseInt(window.getComputedStyle(rockcount[i - 1]).getPropertyValue("top"));
            let rockbottom = parseInt(window.getComputedStyle(rockcount[i - 1]).getPropertyValue("top"));
            rockcount[i - 1].style.top = rocktop + 20 + "px";
            let mainframe = main.getBoundingClientRect();
            if (rockbottom > mainframe.bottom - 50) {
                setTimeout(() => {
                    main.removeChild(rockcount[i - 1]);
                    modal.classList.remove("closemodal");
                }, 600);
                boom.play();
                boom.currentTime = 0;
                rockcount[i - 1].classList.add("astroidexplode");
                clearInterval(move);
            }
        }
        checkcraftcollision();
    }, 450 / velocity);
}

function checkcraftcollision() {
    let rocks = document.querySelectorAll(".rock");
    for (let i = 0; i < rocks.length; i++) {
        let rock = rocks[i];
        let rockbounds = rock.getBoundingClientRect();
        let craftbounds = starcraft.getBoundingClientRect();

        if (craftbounds.left <= rockbounds.right && craftbounds.right >= rockbounds.left &&
            craftbounds.top <= rockbounds.bottom && craftbounds.bottom >= rockbounds.top) {

            boom.play();
            boom.currentTime = 0;

            starcraft.classList.add("startcraftexplode");
            clearInterval(move);
            setTimeout(() => {
                gameOver();
            }, 1000);

            break;
        }
    }
}

function gameOver() {
    console.log("Game Over called");

    endGame();

    document.body.classList.add('show-cursor');

    const main = document.querySelector(".main");
    main.innerHTML = `<div style="color: white; font-size: 24px; text-align: center; padding-top: 20vh;">
                          Game Over! Your score: ${score}<br>
                          <button onclick="backToMenu()">Back to Menu</button>
                      </div>`;
}

function backToMenu() {
    document.body.classList.remove('show-cursor');
    window.location.href = '/';
}

function endGame() {
    let playerName = localStorage.getItem('playerName');
    fetch('/save_score', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ playerName: playerName, score: score })
    }).then(response => response.json())
      .then(data => console.log(data.message));
}

function resetGame() {
    clearInterval(move);
}

startbutton.addEventListener("click", () => {
    const playerName = document.getElementById('playerName').value;
    if (!playerName) {
        alert('Please enter your name to start the game.');
        return;
    }

    localStorage.setItem('playerName', playerName);
    document.querySelectorAll(".rock").forEach(item => main.removeChild(item));
    starcraft.style.left = "50%";
    starcraft.style.bottom = "-30px";
    velocity = 1.01;
    modal.classList.add("closemodal");
    score = 0;
    pscore.textContent = score;
    rockmove();
});
