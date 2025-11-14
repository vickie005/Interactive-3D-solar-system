// Planet data
const planetData = {
  mercury: {
    name: "Mercury",
    description:
      "Mercury is the smallest and innermost planet in the Solar System. It's a rocky planet with a surface covered in craters.",
    diameter: "4,879 km",
    distance: "57.9 million km",
    period: "88 days",
    moons: "0",
  },
  venus: {
    name: "Venus",
    description:
      "Venus is the second planet from the Sun and is Earth's closest planetary neighbor. It's the hottest planet in our solar system.",
    diameter: "12,104 km",
    distance: "108.2 million km",
    period: "225 days",
    moons: "0",
  },
  earth: {
    name: "Earth",
    description:
      "Earth is the third planet from the Sun and the only astronomical object known to harbor life.",
    diameter: "12,742 km",
    distance: "149.6 million km",
    period: "365.25 days",
    moons: "1",
  },
  mars: {
    name: "Mars",
    description:
      "Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System. It's often called the 'Red Planet'.",
    diameter: "6,779 km",
    distance: "227.9 million km",
    period: "687 days",
    moons: "2",
  },
  jupiter: {
    name: "Jupiter",
    description:
      "Jupiter is the fifth planet from the Sun and the largest in the Solar System. It's a gas giant with a prominent Great Red Spot.",
    diameter: "139,820 km",
    distance: "778.5 million km",
    period: "12 years",
    moons: "79",
  },
  saturn: {
    name: "Saturn",
    description:
      "Saturn is the sixth planet from the Sun and the second-largest in the Solar System, after Jupiter. It's famous for its ring system.",
    diameter: "116,460 km",
    distance: "1.4 billion km",
    period: "29.5 years",
    moons: "82",
  },
  uranus: {
    name: "Uranus",
    description:
      "Uranus is the seventh planet from the Sun. It has the third-largest planetary radius and fourth-largest planetary mass in the Solar System.",
    diameter: "50,724 km",
    distance: "2.9 billion km",
    period: "84 years",
    moons: "27",
  },
  neptune: {
    name: "Neptune",
    description:
      "Neptune is the eighth and farthest-known Solar planet from the Sun. It's the fourth-largest planet by diameter.",
    diameter: "49,244 km",
    distance: "4.5 billion km",
    period: "165 years",
    moons: "14",
  },
};

// DOM elements
const solarSystem = document.querySelector(".solar-system");
const infoPanel = document.getElementById("info-panel");
const closeBtn = document.getElementById("close-btn");
const planetName = document.getElementById("planet-name");
const planetDescription = document.getElementById("planet-description");
const planetDiameter = document.getElementById("planet-diameter");
const planetDistance = document.getElementById("planet-distance");
const planetPeriod = document.getElementById("planet-period");
const planetMoons = document.getElementById("planet-moons");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");
const speedUpBtn = document.getElementById("speed-up");
const speedDownBtn = document.getElementById("speed-down");

// Create stars
const starsContainer = document.getElementById("stars");
for (let i = 0; i < 200; i++) {
  const star = document.createElement("div");
  star.classList.add("star");
  star.style.width = `${Math.random() * 2}px`;
  star.style.height = star.style.width;
  star.style.left = `${Math.random() * 100}%`;
  star.style.top = `${Math.random() * 100}%`;
  star.style.opacity = Math.random();
  starsContainer.appendChild(star);
}

// Planet click event
document.querySelectorAll(".planet").forEach((planet) => {
  planet.addEventListener("click", () => {
    const planetId = planet.getAttribute("data-planet");
    const data = planetData[planetId];

    planetName.textContent = data.name;
    planetDescription.textContent = data.description;
    planetDiameter.textContent = data.diameter;
    planetDistance.textContent = data.distance;
    planetPeriod.textContent = data.period;
    planetMoons.textContent = data.moons;

    infoPanel.classList.add("active");
  });
});

// Close info panel
closeBtn.addEventListener("click", () => {
  infoPanel.classList.remove("active");
});

// Animation controls
let isPaused = false;
let animationSpeed = 1;

pauseBtn.addEventListener("click", () => {
  isPaused = !isPaused;
  if (isPaused) {
    solarSystem.style.animationPlayState = "paused";
    document.querySelectorAll(".orbit").forEach((orbit) => {
      orbit.style.animationPlayState = "paused";
    });
    pauseBtn.textContent = "Resume";
  } else {
    solarSystem.style.animationPlayState = "running";
    document.querySelectorAll(".orbit").forEach((orbit) => {
      orbit.style.animationPlayState = "running";
    });
    pauseBtn.textContent = "Pause";
  }
});

resetBtn.addEventListener("click", () => {
  solarSystem.style.animation = "none";
  setTimeout(() => {
    solarSystem.style.animation = `rotate ${
      120 / animationSpeed
    }s infinite linear`;
  }, 10);

  document.querySelectorAll(".orbit").forEach((orbit) => {
    orbit.style.animation = "none";
    setTimeout(() => {
      const duration = parseFloat(getComputedStyle(orbit).animationDuration);
      orbit.style.animation = `orbit ${
        duration / animationSpeed
      }s infinite linear`;
    }, 10);
  });
});

speedUpBtn.addEventListener("click", () => {
  if (animationSpeed < 5) {
    animationSpeed += 0.5;
    updateAnimationSpeed();
  }
});

speedDownBtn.addEventListener("click", () => {
  if (animationSpeed > 0.5) {
    animationSpeed -= 0.5;
    updateAnimationSpeed();
  }
});

function updateAnimationSpeed() {
  solarSystem.style.animationDuration = `${120 / animationSpeed}s`;

  document.querySelectorAll(".orbit").forEach((orbit) => {
    const originalDuration = getOriginalOrbitDuration(orbit.id);
    orbit.style.animationDuration = `${originalDuration / animationSpeed}s`;
  });
}

function getOriginalOrbitDuration(orbitId) {
  const durations = {
    "mercury-orbit": 5,
    "venus-orbit": 8,
    "earth-orbit": 10,
    "mars-orbit": 15,
    "jupiter-orbit": 30,
    "saturn-orbit": 40,
    "uranus-orbit": 50,
    "neptune-orbit": 60,
  };
  return durations[orbitId];
}
