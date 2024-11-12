// Definiere die Feiertage
const holidays = {
    2024: {
        availableMonths: [10, 11],  // November (10) und Dezember (11) für 2024
        events: {
            10: ["01.11: Allerheiligentag", "11.15: Schnupperwoche 2.OS Niveau B", "27.11: Schulhaussprechstunde BIZ"], // November
            11: ["02.12-06.12: Projektwoche", "03.12: Gottesdienst 1.OS", "4.12: Gottesdienst 2.OS", "5.12: Gottesdienst 3.OS", "5.12: Weihnachtsmarkt Schulhausanlage", "11.12: Schulhaussprechstunde BIZ", "11.12: Chlausturnier (Badminton)", "16.12: Sporttag 3. OS", "17.12: Weihnachtsmeditation 1. OS ohne A1b, B2abc, C", "18.12: Weihnachtsmeditation A1b, A2abc und 3. OS"], // Dezember
        }
    },
    2025: {
        availableMonths: [0, 1, 2, 3, 4, 5, 6],  // Januar (0) bis Juli (6) für 2025
        events: {
            0: ["15.1: Schulsprechstunde", "20.1- 24.1: Skilager", "27.1: Fasnachtstag", "31.1; Zeugnisabgabe 1.Semester"],  // Januar 2025
            1: ["05.02: Schulsprechstunde BIZ", "22.02.-09.03: Sportferien"],  // Februar 2025
            2: ["12.03.-13.03: Aufnahmeprüfungen Mittelschulen", "19.03: Josefstag"],  // März 2025
            3: ["08.04: Gottesdienst 2. OS", "09.04: Schulhaussprechstunde BIZ", "10.04: Gottesdienst 1. OS", "11.04.-12.04: go2future Berufsmesse Sek1 March Buttikon", "18.04. Karfreitag", "21.04: Ostermontag", "23.04: Kant. UH-Turnier Buttikon", "26.04.-11.05 :Frühlingsferien"],  // April 2025
            4: ["14.05: Schulhaussprechstunde BIZ", "20.5: Gottesdienst 2. OS, B1c", "21.5: Gottesdienst 1. OS ohne B1c", "22.5: Gottesdienst 3. OS", "29.05: Auffahrt", "30.05: Brücke"],  // Mai 2025
            5: ["09.06: Pfingstmontag", "10.06: Gottesdienst 1. OS", "11.06: Gottesdienst 3. OS/ Schulhaussprechstunde BIZ", "12.06: Gottesdienst 2. OS", "17.06: Präsentation Abschlussarbeiten", "20.06: Schulinterne Weiterbildung SCHILW", "30.06-27.06: Schul- und Abschlussreisen"],  // Juni 2025
            6: ["03.07: Verabschiedung 3. OS", "04.07: Zeugnisabgabe Gottesdienst 3. OS"]   // Juli 2025
        }
    }
};

// Fülle die Jahre im Dropdown
const yearSelect = document.getElementById("year");
for (let i = 2024; i <= 2025; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    yearSelect.appendChild(option);
}

// Funktion zum Aktualisieren des Monats-Dropdowns basierend auf dem ausgewählten Jahr
function updateMonthDropdown(year) {
    const monthSelect = document.getElementById("month");
    monthSelect.innerHTML = ''; // Entferne alle bisherigen Optionen

    const monthNames = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
    
    const availableMonths = holidays[year].availableMonths; // Verfügbare Monate für das gewählte Jahr

    availableMonths.forEach((monthIndex) => {
        const option = document.createElement("option");
        option.value = monthIndex;
        option.textContent = monthNames[monthIndex];
        monthSelect.appendChild(option);
    });
}

// Eventlistener für Jahr-Auswahl (wird aufgerufen, wenn der Benutzer das Jahr ändert)
yearSelect.addEventListener("change", () => {
    const selectedYear = parseInt(yearSelect.value);
    updateMonthDropdown(selectedYear);
    // Auch sicherstellen, dass bei Änderung des Jahres keine Daten angezeigt werden
    document.getElementById("result").innerHTML = "";
});

// Beim Laden der Seite sicherstellen, dass die Dropdowns korrekt gesetzt sind
document.addEventListener("DOMContentLoaded", () => {
    const initialYear = parseInt(yearSelect.value);
    updateMonthDropdown(initialYear);
});

// Zeige die Ereignisse an
document.getElementById("showDays").addEventListener("click", () => {
    const year = parseInt(yearSelect.value);
    const month = parseInt(document.getElementById("month").value);
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = ""; // Vorherige Ergebnisse löschen

    const monthNames = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];

    // Stelle sicher, dass das Jahr und der Monat für die Feiertage existieren
    if (holidays[year] && holidays[year].events[month]) {
        const freeDays = holidays[year].events[month];
        if (freeDays.length > 0) {
            resultDiv.innerHTML = `<h2>Ereignisse im ${monthNames[month]} ${year}:</h2><ul>`;
            freeDays.forEach(day => {
                resultDiv.innerHTML += `<li>${day}</li>`;
            });
            resultDiv.innerHTML += "</ul>";
        } else {
            resultDiv.innerHTML = `<h2>Keine Ereignisse im ${monthNames[month]} ${year}.</h2>`;
        }
    } else {
        resultDiv.innerHTML = "<h2>Keine Daten für das ausgewählte Jahr und Monat.</h2>";
    }
});
