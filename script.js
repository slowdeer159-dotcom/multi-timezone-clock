// ========================= 
// Timezone List
// ========================= 

const timezones = [
    { name: "UTC", offset: "UTC" },
    { name: "London (GMT)", offset: "Europe/London" },
    { name: "Paris (CET)", offset: "Europe/Paris" },
    { name: "Tokyo (JST)", offset: "Asia/Tokyo" },
    { name: "New York (EST)", offset: "America/New_York" },
    { name: "Los Angeles (PST)", offset: "America/Los_Angeles" },
    { name: "Dubai (GST)", offset: "Asia/Dubai" },
    { name: "Sydney (AEDT)", offset: "Australia/Sydney" },
    { name: "Singapore (SGT)", offset: "Asia/Singapore" },
    { name: "Hong Kong (HKT)", offset: "Asia/Hong_Kong" },
    { name: "Mumbai (IST)", offset: "Asia/Kolkata" },
    { name: "Bangkok (ICT)", offset: "Asia/Bangkok" },
    { name: "Moscow (MSK)", offset: "Europe/Moscow" },
    { name: "São Paulo (BRT)", offset: "America/Sao_Paulo" },
    { name: "Mexico City (CST)", offset: "America/Mexico_City" },
    { name: "Toronto (EST)", offset: "America/Toronto" },
    { name: "Vancouver (PST)", offset: "America/Vancouver" },
    { name: "Auckland (NZDT)", offset: "Pacific/Auckland" },
    { name: "Istanbul (EET)", offset: "Europe/Istanbul" },
    { name: "Cairo (EET)", offset: "Africa/Cairo" },
    { name: "Lagos (WAT)", offset: "Africa/Lagos" },
    { name: "Johannesburg (SAST)", offset: "Africa/Johannesburg" },
    { name: "Seoul (KST)", offset: "Asia/Seoul" },
    { name: "Bangkok (ICT)", offset: "Asia/Bangkok" },
];

// ========================= 
// Initialize Timezone Select
// ========================= 

const timezoneSelect = document.getElementById("timezoneSelect");

timezones.forEach(tz => {
    const option = document.createElement("option");
    option.value = tz.offset;
    option.textContent = tz.name;
    timezoneSelect.appendChild(option);
});

// ========================= 
// Clock Management
// ========================= 

let clocks = JSON.parse(localStorage.getItem("clocks")) || [
    "UTC",
    "America/New_York",
    "Europe/London",
    "Asia/Tokyo"
];

// ========================= 
// Display Clocks
// ========================= 

function displayClocks() {
    const container = document.getElementById("clocksContainer");
    container.innerHTML = "";

    if (clocks.length === 0) {
        container.innerHTML = `
            <div class="empty-state" style="grid-column: 1/-1;">
                <p>📍 No timezones added. Start by selecting a timezone above!</p>
            </div>
        `;
        return;
    }

    clocks.forEach((timezone, index) => {
        const clockCard = document.createElement("div");
        clockCard.className = "clock-card";
        clockCard.innerHTML = `
            <button class="close-btn" onclick="removeClock(${index})">✕</button>
            <div class="timezone-name">${getTimezoneName(timezone)}</div>
            <div class="digital-clock" id="clock-${index}">--:--:--</div>
            <div class="date-display" id="date-${index}">--/--/----</div>
        `;
        container.appendChild(clockCard);
    });
}

// ========================= 
// Get Timezone Name
// ========================= 

function getTimezoneName(offset) {
    const tz = timezones.find(t => t.offset === offset);
    return tz ? tz.name : offset;
}

// ========================= 
// Update Clock Time
// ========================= 

function updateClocks() {
    clocks.forEach((timezone, index) => {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
            timeZone: timezone
        });

        const dateFormatter = new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            timeZone: timezone
        });

        const clockElement = document.getElementById(`clock-${index}`);
        const dateElement = document.getElementById(`date-${index}`);

        if (clockElement) {
            clockElement.textContent = formatter.format(now);
        }
        if (dateElement) {
            dateElement.textContent = dateFormatter.format(now);
        }
    });
}

// ========================= 
// Add Clock
// ========================= 

document.getElementById("addBtn").addEventListener("click", () => {
    const selectedTimezone = timezoneSelect.value;

    if (selectedTimezone === "") {
        alert("Please select a timezone!");
        return;
    }

    if (clocks.includes(selectedTimezone)) {
        alert("This timezone is already added!");
        return;
    }

    clocks.push(selectedTimezone);
    localStorage.setItem("clocks", JSON.stringify(clocks));
    timezoneSelect.value = "";
    displayClocks();
    updateClocks();
});

// ========================= 
// Remove Clock
// ========================= 

function removeClock(index) {
    clocks.splice(index, 1);
    localStorage.setItem("clocks", JSON.stringify(clocks));
    displayClocks();
}

// ========================= 
// Reset to Default
// ========================= 

document.getElementById("resetBtn").addEventListener("click", () => {
    clocks = ["UTC", "America/New_York", "Europe/London", "Asia/Tokyo"];
    localStorage.setItem("clocks", JSON.stringify(clocks));
    displayClocks();
    updateClocks();
});

// ========================= 
// Dark Mode
// ========================= 

const darkButton = document.getElementById("darkModeBtn");
darkButton.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("darkMode", document.body.classList.contains("dark"));
});

if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark");
}

// ========================= 
// Initialize
// ========================= 

displayClocks();
updateClocks();
setInterval(updateClocks, 1000);
