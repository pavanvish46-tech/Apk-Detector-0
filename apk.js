const scanBtn = document.getElementById("scanBtn");
const percentage = document.getElementById("percentage");
const progressBar = document.getElementById("progressBar");
const resultBox = document.getElementById("resultBox");
const issuesList = document.getElementById("issues");

scanBtn.addEventListener("click", () => {
  let randomRisk = Math.floor(Math.random() * 100);
  resultBox.classList.remove("hidden");
  percentage.innerText = `App Risk: ${randomRisk}%`;
  progressBar.value = randomRisk;

  issuesList.innerHTML = "";
  if (randomRisk > 70) {
    issuesList.innerHTML += "<li>⚠️ Suspicious permissions found</li>";
    issuesList.innerHTML += "<li>⚠️ High risk of banking fraud</li>";
  } else if (randomRisk > 40) {
    issuesList.innerHTML += "<li>⚠️ Some unusual behavior detected</li>";
  } else {
    issuesList.innerHTML += "<li>✅ Looks safe</li>";
  }
});

// Simple background stars animation
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = Array(200).fill().map(() => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 2
}));

function animateStars() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "white";
  stars.forEach(s => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
    s.y += 0.5;
    if (s.y > canvas.height) s.y = 0;
  });

  requestAnimationFrame(animateStars);
}
animateStars();
