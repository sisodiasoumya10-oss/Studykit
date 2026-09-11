/* ==========================================
   STUDYKIT JAVASCRIPT
========================================== */


/* ==========================================
   USER / SIGNUP
========================================== */

const signupForm = document.getElementById("signupForm");

let currentUser = {
    name: localStorage.getItem("studyName") || "",
    email: localStorage.getItem("studyEmail") || "",
    className: localStorage.getItem("studyClass") || ""
};


signupForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("studentName").value.trim();
    const email = document.getElementById("studentEmail").value.trim();
    const className = document.getElementById("studentClass").value;

    if (!name || !email || !className) {
        alert("Please fill in Name, Email and Class.");
        return;
    }

    currentUser = {
        name: name,
        email: email,
        className: className
    };

    localStorage.setItem("studyName", name);
    localStorage.setItem("studyEmail", email);
    localStorage.setItem("studyClass", className);

    setupUser();

    document.getElementById("signupPage").classList.add("hidden");
    document.getElementById("mainPage").classList.remove("hidden");

    updateStreak();
});


function setupUser() {

    document.getElementById("displayName").textContent =
        currentUser.name;

    document.getElementById("displayClass").textContent =
        "Class " + currentUser.className + " • Ready to learn 📚";

    document.getElementById("assignmentClassText").textContent =
        "Class " + currentUser.className +
        " • Today's personalised assignment";
}


/* ==========================================
   PAGE NAVIGATION
========================================== */

function showSection(section) {

    const sections = [
        "homeSection",
        "assignmentsSection",
        "historySection",
        "toolsSection",
        "helpSection"
    ];

    sections.forEach(function(id) {
        document.getElementById(id).classList.add("hidden");
    });

    if (section === "home") {
        document.getElementById("homeSection").classList.remove("hidden");
    }

    if (section === "assignments") {
        document.getElementById("assignmentsSection").classList.remove("hidden");

        document.getElementById("subjectSelection").classList.remove("hidden");
        document.getElementById("quizArea").classList.add("hidden");
        document.getElementById("resultArea").classList.add("hidden");
    }

    if (section === "history") {
        document.getElementById("historySection").classList.remove("hidden");
        displayHistory();
    }

    if (section === "tools") {
        document.getElementById("toolsSection").classList.remove("hidden");
    }

    if (section === "help") {
        document.getElementById("helpSection").classList.remove("hidden");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* ==========================================
   LOGOUT
========================================== */

function logout() {

    document.getElementById("mainPage").classList.add("hidden");
    document.getElementById("signupPage").classList.remove("hidden");

    document.getElementById("studentName").value =
        currentUser.name;

    document.getElementById("studentEmail").value =
        currentUser.email;

    document.getElementById("studentClass").value =
        currentUser.className;
}


/* ==========================================
   DAILY STREAK
========================================== */

function getToday() {
    return new Date().toISOString().split("T")[0];
}


function updateStreak() {

    const today = getToday();

    let lastVisit =
        localStorage.getItem("studyLastVisit");

    let streak =
        Number(localStorage.getItem("studyStreak")) || 0;

    if (!lastVisit) {
        streak = 1;
    }
    else if (lastVisit !== today) {

        const previous =
            new Date(lastVisit);

        const current =
            new Date(today);

        const difference =
            Math.round(
                (current - previous) /
                (1000 * 60 * 60 * 24)
            );

        if (difference === 1) {
            streak++;
        }
        else if (difference > 1) {
            streak = 1;
        }
    }

    streak = Math.min(streak, 30);

    localStorage.setItem("studyLastVisit", today);
    localStorage.setItem("studyStreak", streak);

    document.getElementById("streakDisplay").textContent =
        streak + "/30";
}


/* ==========================================
   QUESTION BANK
   10 QUESTIONS PER SUBJECT / CLASS
   Daily rotation changes the assignment.
========================================== */

const questionBank = {


/* ================= CLASS 9 ================= */

"9": {

    Maths: [

        {
            q: "What is the value of 2³?",
            options: ["6", "8", "9", "12"],
            answer: 1
        },

        {
            q: "Which number is irrational?",
            options: ["2", "3/4", "√2", "5"],
            answer: 2
        },

        {
            q: "What is the degree of 5x² + 3x + 1?",
            options: ["1", "2", "3", "5"],
            answer: 1
        },

        {
            q: "The point (0, 5) lies on which axis?",
            options: ["X-axis", "Y-axis", "Origin", "Neither"],
            answer: 1
        },

        {
            q: "If x + 5 = 12, then x is:",
            options: ["5", "6", "7", "17"],
            answer: 2
        },

        {
            q: "The sum of angles of a triangle is:",
            options: ["90°", "180°", "270°", "360°"],
            answer: 1
        },

        {
            q: "What is the area of a rectangle of length 8 cm and breadth 5 cm?",
            options: ["13 cm²", "26 cm²", "40 cm²", "80 cm²"],
            answer: 2
        },

        {
            q: "If two angles are complementary and one is 35°, the other is:",
            options: ["45°", "55°", "65°", "145°"],
            answer: 1
        },

        {
            q: "Factorise x² - 25.",
            options: [
                "(x-5)(x+5)",
                "(x-25)(x+1)",
                "(x-5)²",
                "(x+25)(x-1)"
            ],
            answer: 0
        },

        {
            q: "The diagonal of a square of side a is:",
            options: ["a", "2a", "a√2", "a/2"],
            answer: 2
        }

    ],

    Science: [

        {
            q: "The basic unit of life is:",
            options: ["Tissue", "Organ", "Cell", "Organ system"],
            answer: 2
        },

        {
            q: "Which organelle is known as the powerhouse of the cell?",
            options: ["Nucleus", "Mitochondria", "Ribosome", "Vacuole"],
            answer: 1
        },

        {
            q: "Which tissue helps in growth of plants?",
            options: ["Meristematic", "Epithelial", "Muscular", "Nervous"],
            answer: 0
        },

        {
            q: "The SI unit of force is:",
            options: ["Joule", "Watt", "Newton", "Pascal"],
            answer: 2
        },

        {
            q: "Speed is equal to:",
            options: [
                "Distance × Time",
                "Distance / Time",
                "Time / Distance",
                "Mass / Time"
            ],
            answer: 1
        },

        {
            q: "Which gas is essential for respiration?",
            options: ["Nitrogen", "Oxygen", "Carbon dioxide", "Hydrogen"],
            answer: 1
        },

        {
            q: "A substance with pH less than 7 is generally:",
            options: ["Basic", "Neutral", "Acidic", "Salt"],
            answer: 2
        },

        {
            q: "Which part of the plant performs photosynthesis mainly?",
            options: ["Root", "Leaf", "Flower", "Seed"],
            answer: 1
        },

        {
            q: "Which form of matter has a fixed volume but no fixed shape?",
            options: ["Solid", "Liquid", "Gas", "Plasma"],
            answer: 1
        },

        {
            q: "Which blood cells help fight infections?",
            options: ["RBCs", "WBCs", "Platelets", "Plasma"],
            answer: 1
        }

    ]
},


/* ================= CLASS 10 ================= */

"10": {

    Maths: [

        {
            q: "What is the zero of the polynomial x - 7?",
            options: ["0", "1", "7", "-7"],
            answer: 2
        },

        {
            q: "The HCF of 18 and 24 is:",
            options: ["3", "6", "9", "12"],
            answer: 1
        },

        {
            q: "If a = 3 and b = 4, then a² + b² equals:",
            options: ["7", "12", "25", "49"],
            answer: 2
        },

        {
            q: "The distance between (0,0) and (3,4) is:",
            options: ["3", "4", "5", "7"],
            answer: 2
        },

        {
            q: "sin 90° equals:",
            options: ["0", "1/2", "1", "√3/2"],
            answer: 2
        },

        {
            q: "The roots of x² - 9 are:",
            options: ["0,9", "3,3", "3,-3", "-9,9"],
            answer: 2
        },

        {
            q: "The probability of getting a head when a fair coin is tossed is:",
            options: ["0", "1/4", "1/2", "1"],
            answer: 2
        },

        {
            q: "The area of a circle of radius r is:",
            options: ["2πr", "πr²", "πd", "r²"],
            answer: 1
        },

        {
            q: "If tan θ = 1, an acute value of θ is:",
            options: ["30°", "45°", "60°", "90°"],
            answer: 1
        },

        {
            q: "For a quadratic equation ax² + bx + c = 0, the discriminant is:",
            options: [
                "b² + 4ac",
                "b² - 4ac",
                "4ac - b²",
                "a² - 4bc"
            ],
            answer: 1
        }

    ],

    Science: [

        {
            q: "The chemical formula of water is:",
            options: ["CO₂", "H₂O", "O₂", "H₂"],
            answer: 1
        },

        {
            q: "Which acid is present in vinegar?",
            options: ["Hydrochloric acid", "Acetic acid", "Sulphuric acid", "Nitric acid"],
            answer: 1
        },

        {
            q: "The pH of a neutral solution at room temperature is approximately:",
            options: ["0", "5", "7", "14"],
            answer: 2
        },

        {
            q: "The process by which green plants make food is:",
            options: ["Respiration", "Photosynthesis", "Digestion", "Transpiration"],
            answer: 1
        },

        {
            q: "Which component of blood transports oxygen?",
            options: ["Platelets", "Haemoglobin", "Plasma", "WBCs"],
            answer: 1
        },

        {
            q: "The unit of electric current is:",
            options: ["Volt", "Ohm", "Ampere", "Watt"],
            answer: 2
        },

        {
            q: "Which lens is used to correct myopia?",
            options: ["Convex", "Concave", "Cylindrical only", "Plane"],
            answer: 1
        },

        {
            q: "The resistance of a conductor is measured in:",
            options: ["Volt", "Ampere", "Ohm", "Joule"],
            answer: 2
        },

        {
            q: "Which gas is released during photosynthesis?",
            options: ["Oxygen", "Nitrogen", "Hydrogen", "Methane"],
            answer: 0
        },

        {
            q: "The powerhouse of a cell is:",
            options: ["Nucleus", "Mitochondria", "Golgi body", "Vacuole"],
            answer: 1
        }

    ]
},


/* ================= CLASS 11 ================= */

"11": {

    Maths: [

        {
            q: "The value of sin²θ + cos²θ is:",
            options: ["0", "1", "2", "sin θ"],
            answer: 1
        },

        {
            q: "The domain of √x is:",
            options: ["x < 0", "x ≤ 0", "x ≥ 0", "All real x"],
            answer: 2
        },

        {
            q: "If A = {1,2,3}, the number of elements in A is:",
            options: ["1", "2", "3", "6"],
            answer: 2
        },

        {
            q: "The slope of a horizontal line is:",
            options: ["0", "1", "Undefined", "-1"],
            answer: 0
        },

        {
            q: "The derivative of x² is:",
            options: ["x", "2x", "x²", "2"],
            answer: 1
        },

        {
            q: "The coefficient of x² in (x+2)³ is:",
            options: ["2", "4", "6", "8"],
            answer: 2
        },

        {
            q: "The distance between two points is always:",
            options: ["Negative", "Non-negative", "Always zero", "Imaginary"],
            answer: 1
        },

        {
            q: "The value of 5! is:",
            options: ["20", "60", "100", "120"],
            answer: 3
        },

        {
            q: "If two events cannot occur together, they are called:",
            options: ["Independent", "Mutually exclusive", "Equal", "Certain"],
            answer: 1
        },

        {
            q: "The general equation of a straight line can be written as:",
            options: [
                "ax + by + c = 0",
                "ax² + bx + c = 0",
                "x² + y² = 0",
                "xy = c"
            ],
            answer: 0
        }

    ],

    Science: [

        {
            q: "The SI unit of amount of substance is:",
            options: ["Gram", "Mole", "Kilogram", "Litre"],
            answer: 1
        },

        {
            q: "Avogadro's number is approximately:",
            options: ["6.022 × 10²³", "9.8", "3 × 10⁸", "1.6 × 10⁻¹⁹"],
            answer: 0
        },

        {
            q: "The atomic number represents the number of:",
            options: ["Neutrons", "Protons", "Nucleons", "Shells"],
            answer: 1
        },

        {
            q: "Acceleration due to gravity near Earth's surface is approximately:",
            options: ["5.6 m/s²", "9.8 m/s²", "12 m/s²", "98 m/s²"],
            answer: 1
        },

        {
            q: "Newton's second law relates force to:",
            options: ["Mass and acceleration", "Only mass", "Only velocity", "Only distance"],
            answer: 0
        },

        {
            q: "The functional unit of the kidney is:",
            options: ["Neuron", "Nephron", "Alveolus", "Villus"],
            answer: 1
        },

        {
            q: "DNA stands for:",
            options: [
                "Deoxyribonucleic Acid",
                "Dinitrogen Acid",
                "Double Nitrogen Atom",
                "Deoxygenated Nucleic Acid"
            ],
            answer: 0
        },

        {
            q: "Which organelle contains genetic material in eukaryotic cells?",
            options: ["Nucleus", "Vacuole", "Cell wall", "Lysosome"],
            answer: 0
        },

        {
            q: "The SI unit of work is:",
            options: ["Newton", "Joule", "Watt", "Pascal"],
            answer: 1
        },

        {
            q: "Which bond involves sharing of electrons?",
            options: ["Ionic", "Covalent", "Metallic only", "Hydrogen only"],
            answer: 1
        }

    ]
},


/* ================= CLASS 12 ================= */

"12": {

    Maths: [

        {
            q: "The derivative of sin x is:",
            options: ["cos x", "-cos x", "sin x", "-sin x"],
            answer: 0
        },

        {
            q: "The integral of 1/x dx is:",
            options: ["x", "ln|x| + C", "1/x²", "x²"],
            answer: 1
        },

        {
            q: "The determinant of a 2 × 2 identity matrix is:",
            options: ["0", "1", "2", "-1"],
            answer: 1
        },

        {
            q: "The inverse of a square matrix exists when its determinant is:",
            options: ["0", "1 only", "Non-zero", "Negative only"],
            answer: 2
        },

        {
            q: "The derivative of eˣ is:",
            options: ["x eˣ", "eˣ", "1/eˣ", "x"],
            answer: 1
        },

        {
            q: "The maximum value of sin x is:",
            options: ["0", "1", "2", "-1"],
            answer: 1
        },

        {
            q: "A vector with magnitude zero is called:",
            options: ["Unit vector", "Zero vector", "Position vector", "Equal vector"],
            answer: 1
        },

        {
            q: "If two vectors are perpendicular, their dot product is:",
            options: ["1", "0", "-1", "Their magnitudes"],
            answer: 1
        },

        {
            q: "The probability of an impossible event is:",
            options: ["0", "1/2", "1", "-1"],
            answer: 0
        },

        {
            q: "The general solution of dy/dx = 0 is:",
            options: ["y = x", "y = C", "y = x²", "y = eˣ"],
            answer: 1
        }

    ],

    Science: [

        {
            q: "The SI unit of electric potential is:",
            options: ["Ampere", "Volt", "Ohm", "Coulomb"],
            answer: 1
        },

        {
            q: "The charge of an electron is:",
            options: [
                "+1.6 × 10⁻¹⁹ C",
                "-1.6 × 10⁻¹⁹ C",
                "0 C",
                "+9.8 C"
            ],
            answer: 1
        },

        {
            q: "The speed of light in vacuum is approximately:",
            options: [
                "3 × 10⁸ m/s",
                "3 × 10⁶ m/s",
                "9.8 m/s²",
                "1.6 × 10⁻¹⁹ m/s"
            ],
            answer: 0
        },

        {
            q: "Ohm's law is:",
            options: [
                "V = IR",
                "P = VI only",
                "F = ma",
                "E = mc²"
            ],
            answer: 0
        },

        {
            q: "The SI unit of capacitance is:",
            options: ["Farad", "Henry", "Tesla", "Weber"],
            answer: 0
        },

        {
            q: "The genetic material in most organisms is:",
            options: ["Protein", "DNA", "Glucose", "Lipid"],
            answer: 1
        },

        {
            q: "The process of formation of RNA from DNA is called:",
            options: ["Translation", "Transcription", "Replication", "Mutation"],
            answer: 1
        },

        {
            q: "Which semiconductor is commonly used in electronic devices?",
            options: ["Silicon", "Copper", "Iron", "Gold"],
            answer: 0
        },

        {
            q: "A transformer works on the principle of:",
            options: [
                "Electromagnetic induction",
                "Reflection",
                "Refraction",
                "Photoelectric effect"
            ],
            answer: 0
        },

        {
            q: "The SI unit of magnetic field is:",
            options: ["Tesla", "Weber", "Volt", "Newton"],
            answer: 0
        }

    ]
}

};


/* ==========================================
   DAILY ASSIGNMENT
========================================== */

let currentQuiz = null;


/*
    The question bank contains 10 questions per
    subject/class.

    To make the assignment change daily, the
    order of those questions is rotated using
    today's date.

    For a larger question bank later, simply add
    more questions to each array.
*/


function getDayNumber() {

    const now = new Date();

    const start =
        new Date(now.getFullYear(), 0, 0);

    const difference =
        now - start;

    return Math.floor(
        difference /
        (1000 * 60 * 60 * 24)
    );
}


function rotateQuestions(questions) {

    const copy = [...questions];

    const shift =
        getDayNumber() % copy.length;

    return copy
        .slice(shift)
        .concat(copy.slice(0, shift));
}


function startAssignment(subject) {

    const className =
        currentUser.className;

    const originalQuestions =
        questionBank[className][subject];

    const questions =
        rotateQuestions(originalQuestions);

    currentQuiz = {
        className: className,
        subject: subject,
        date: getToday(),
        questions: questions
    };

    document.getElementById("subjectSelection")
        .classList.add("hidden");

    document.getElementById("quizArea")
        .classList.remove("hidden");

    document.getElementById("resultArea")
        .classList.add("hidden");

    document.getElementById("quizTitle").textContent =
        "Class " + className + " " + subject;

    document.getElementById("quizDate").textContent =
        "Daily Assignment • " + formatDate(getToday());

    renderQuestions();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* ==========================================
   RENDER QUESTIONS
========================================== */

function renderQuestions() {

    const container =
        document.getElementById("questionsContainer");

    container.innerHTML = "";

    currentQuiz.questions.forEach(function(question, index) {

        const card =
            document.createElement("div");

        card.className = "question-card";

        let optionsHTML = "";

        question.options.forEach(function(option, optionIndex) {

            optionsHTML += `
                <label class="option">
                    <input
                        type="radio"
                        name="question${index}"
                        value="${optionIndex}"
                        required
                    >
                    ${option}
                </label>
            `;
        });

        card.innerHTML = `
            <h3>
                ${index + 1}. ${question.q}
            </h3>

            ${optionsHTML}
        `;

        container.appendChild(card);
    });

    updateQuizProgress();
}


/* ==========================================
   SUBMIT QUIZ
========================================== */

document.getElementById("quizForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        let score = 0;

        currentQuiz.questions.forEach(function(question, index) {

            const selected =
                document.querySelector(
                    `input[name="question${index}"]:checked`
                );

            if (
                selected &&
                Number(selected.value) === question.answer
            ) {
                score++;
            }
        });

        const total =
            currentQuiz.questions.length;

        const percentage =
            (score / total) * 100;

        saveAssignmentResult(
            currentQuiz.subject,
            score,
            total,
            percentage
        );

        showResult(score, total, percentage);
    });


function showResult(score, total, percentage) {

    document.getElementById("quizArea")
        .classList.add("hidden");

    document.getElementById("resultArea")
        .classList.remove("hidden");

    document.getElementById("resultScore").textContent =
        score + "/" + total;

    document.getElementById("resultPercentage").textContent =
        percentage.toFixed(1) + "%";

    let message;

    if (percentage >= 90) {
        message = "Excellent! 🌟 You are doing amazingly well!";
    }
    else if (percentage >= 75) {
        message = "Great job! Keep up the hard work! 💙";
    }
    else if (percentage >= 50) {
        message = "Good effort! A little more practice will help.";
    }
    else {
        message = "Keep practising! Every mistake is a chance to learn. 📚";
    }

    document.getElementById("resultMessage").textContent =
        message;
}


/* ==========================================
   SAVE HISTORY
========================================== */

function getHistoryKey() {

    return "studyHistory_" +
        currentUser.className;
}


function saveAssignmentResult(
    subject,
    score,
    total,
    percentage
) {

    const key = getHistoryKey();

    let history =
        JSON.parse(localStorage.getItem(key)) || [];

    history.unshift({

        date: getToday(),

        displayDate:
            formatDate(getToday()),

        subject: subject,

        score: score,

        total: total,

        percentage:
            Number(percentage.toFixed(1))

    });

    /*
       Keep the latest 100 records.
    */

    history =
        history.slice(0, 100);

    localStorage.setItem(
        key,
        JSON.stringify(history)
    );
}


/* ==========================================
   DISPLAY PREVIOUS SCORES
========================================== */

function displayHistory() {

    const container =
        document.getElementById("historyContainer");

    const key =
        getHistoryKey();

    const history =
        JSON.parse(localStorage.getItem(key)) || [];

    if (history.length === 0) {

        container.innerHTML = `
            <div class="no-history">
                <h2>📚 No assignments completed yet</h2>
                <p>
                    Complete your first Maths or Science assignment
                    and your score will appear here.
                </p>
            </div>
        `;

        return;
    }

    container.innerHTML = "";

    history.forEach(function(item) {

        const card =
            document.createElement("div");

        card.className = "history-card";

        card.innerHTML = `

            <div>
                <strong>
                    ${item.subject} Assignment
                </strong>

                <p class="muted">
                    ${item.displayDate}
                </p>
            </div>

            <div class="history-score">
                ${item.score}/${item.total}
            </div>

            <div class="history-percent">
                ${item.percentage}%
            </div>
        `;

        container.appendChild(card);
    });
}


/* ==========================================
   DATE
========================================== */

function formatDate(dateString) {

    const date =
        new Date(dateString + "T00:00:00");

    return date.toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );
}


/* ==========================================
   AVERAGE MARKS CALCULATOR
========================================== */

function openAverageCalculator() {

    document.getElementById("averageModal")
        .classList.remove("hidden");
}


function addMarksRow() {

    const row =
        document.createElement("div");

    row.className = "marks-row";

    row.innerHTML = `
        <input type="text" placeholder="Subject">

        <input
            type="number"
            class="obtained"
            placeholder="Obtained"
        >

        <input
            type="number"
            class="maximum"
            placeholder="Out of"
        >
    `;

    document.getElementById("marksRows")
        .appendChild(row);
}


function calculateAverage() {

    const obtainedInputs =
        document.querySelectorAll(".obtained");

    const maximumInputs =
        document.querySelectorAll(".maximum");

    let totalObtained = 0;
    let totalMaximum = 0;
    let subjects = 0;

    for (
        let i = 0;
        i < obtainedInputs.length;
        i++
    ) {

        const obtained =
            Number(obtainedInputs[i].value);

        const maximum =
            Number(maximumInputs[i].value);

        if (
            Number.isFinite(obtained) &&
            Number.isFinite(maximum) &&
            maximum > 0 &&
            obtained >= 0
        ) {

            if (obtained > maximum) {
                continue;
            }

            totalObtained += obtained;
            totalMaximum += maximum;

            subjects++;
        }
    }

    if (subjects === 0) {

        document.getElementById("averageResult")
            .innerHTML =
            "Please enter valid marks.";

        return;
    }

    const percentage =
        (totalObtained / totalMaximum) * 100;

    const average =
        totalObtained / subjects;

    document.getElementById("averageResult")
        .innerHTML = `
            <strong>Subjects:</strong> ${subjects}<br>
            <strong>Total:</strong>
            ${totalObtained}/${totalMaximum}<br>
            <strong>Average Marks:</strong>
            ${average.toFixed(2)}<br>
            <strong>Percentage:</strong>
            ${percentage.toFixed(2)}%
        `;
}


/* ==========================================
   REAL CALCULATOR
========================================== */

function openCalculator() {

    document.getElementById("calculatorModal")
        .classList.remove("hidden");
}


function calculatorInput(value) {

    const display =
        document.getElementById("calcDisplay");

    if (display.value === "0") {
        display.value = value;
    }
    else {
        display.value += value;
    }
}


function clearCalc() {

    document.getElementById("calcDisplay")
        .value = "0";
}


function deleteCalc() {

    const display =
        document.getElementById("calcDisplay");

    if (display.value.length <= 1) {
        display.value = "0";
    }
    else {
        display.value =
            display.value.slice(0, -1);
    }
}


function percentageCalc() {

    const display =
        document.getElementById("calcDisplay");

    const value =
        Number(display.value);

    if (Number.isFinite(value)) {
        display.value =
            String(value / 100);
    }
}


function calculateExpression() {

    const display =
        document.getElementById("calcDisplay");

    let expression =
        display.value;

    /*
       Only mathematical characters are allowed.
       This prevents arbitrary JavaScript from
       being entered into the calculator.
    */

    if (!/^[0-9+\-*/().\s]+$/.test(expression)) {

        display.value = "Error";
        return;
    }

    try {

        const result =
            Function(
                '"use strict"; return (' +
                expression +
                ')'
            )();

        if (
            typeof result !== "number" ||
            !Number.isFinite(result)
        ) {
            display.value = "Error";
            return;
        }

        display.value =
            String(
                Number(result.toFixed(10))
            );

    }
    catch (error) {

        display.value = "Error";
    }
}


/* ==========================================
   NOTES
========================================== */

function openNotes() {

    const saved =
        localStorage.getItem(
            "studyNotes_" +
            currentUser.className
        );

    document.getElementById("notes").value =
        saved || "";

    document.getElementById("notesModal")
        .classList.remove("hidden");
}


function saveNotes() {

    const notes =
        document.getElementById("notes").value;

    localStorage.setItem(
        "studyNotes_" +
        currentUser.className,
        notes
    );

    alert("✅ Your notes have been saved!");

    closeModal("notesModal");
}


/* ==========================================
   TIMER
========================================== */

let timerSeconds = 25 * 60;
let timerInterval = null;


function openTimer() {

    document.getElementById("timerModal")
        .classList.remove("hidden");

    updateTimerDisplay();
}


function startTimer() {

    if (timerInterval !== null) {
        return;
    }

    timerInterval =
        setInterval(function() {

            if (timerSeconds <= 0) {

                clearInterval(timerInterval);

                timerInterval = null;

                alert(
                    "🎉 Great work! Your 25-minute study session is complete."
                );

                timerSeconds =
                    25 * 60;

                updateTimerDisplay();

                return;
            }

            timerSeconds--;

            updateTimerDisplay();

        }, 1000);
}


function pauseTimer() {

    clearInterval(timerInterval);

    timerInterval = null;
}


function resetTimer() {

    clearInterval(timerInterval);

    timerInterval = null;

    timerSeconds = 25 * 60;

    updateTimerDisplay();
}


function updateTimerDisplay() {

    const minutes =
        Math.floor(timerSeconds / 60);

    const seconds =
        timerSeconds % 60;

    document.getElementById("timerDisplay")
        .textContent =
        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0");
}


/* ==========================================
   CHATGPT
========================================== */

function openChatGPT() {

    window.open(
        "https://chatgpt.com/",
        "_blank"
    );
}


/* ==========================================
   STUDY TIPS
========================================== */

const studyTips = [

    "📵 Keep your phone away while studying.",

    "🧠 Test yourself instead of only rereading.",

    "⏱️ Try focused study sessions with short breaks.",

    "📝 Make short revision notes after each chapter.",

    "💧 Keep water nearby while studying.",

    "📚 Practise questions after learning a concept.",

    "🌙 Get enough sleep before an important exam.",

    "🎯 Set one small study goal at a time.",

    "🔁 Revise difficult topics more frequently.",

    "💙 Don't compare your progress with someone else's."
];


function showStudyTip() {

    const index =
        Math.floor(
            Math.random() *
            studyTips.length
        );

    showMessage(
        "💡 Study Tip",
        studyTips[index]
    );
}


/* ==========================================
   MODALS
========================================== */

function closeModal(id) {

    document.getElementById(id)
        .classList.add("hidden");
}


function showMessage(title, message) {

    document.getElementById("messageTitle")
        .textContent = title;

    document.getElementById("messageText")
        .textContent = message;

    document.getElementById("messageModal")
        .classList.remove("hidden");
}


/* ==========================================
   QUIZ PROGRESS
========================================== */

function updateQuizProgress() {

    const selected =
        document.querySelectorAll(
            '#questionsContainer input[type="radio"]:checked'
        ).length;

    const total =
        currentQuiz ?
        currentQuiz.questions.length :
        10;

    const percent =
        Math.max(
            10,
            (selected / total) * 100
        );

    document.getElementById("quizProgress")
        .style.width =
        percent + "%";

    document.getElementById("questionNumber")
        .textContent =
        Math.min(selected + 1, total);
}


document.addEventListener("change", function(event) {

    if (
        event.target.matches(
            '#questionsContainer input[type="radio"]'
        )
    ) {
        updateQuizProgress();
    }
});


/* ==========================================
   DAILY QUOTE
========================================== */

const quotes = [

    "Small progress every day becomes big progress.",

    "Believe in your ability to learn.",

    "Consistency beats last-minute studying.",

    "Every question you practise makes you stronger.",

    "Your future self will thank you for studying today.",

    "Don't be afraid of difficult questions.",

    "Learn it. Practise it. Master it."
];


function setDailyQuote() {

    const day =
        getDayNumber();

    const quote =
        quotes[day % quotes.length];

    document.getElementById("dailyQuote")
        .textContent = quote;
}


/* ==========================================
   CLOSE MODAL WHEN CLICKING OUTSIDE
========================================== */

document.querySelectorAll(".modal")
    .forEach(function(modal) {

        modal.addEventListener(
            "click",
            function(event) {

                if (event.target === modal) {
                    modal.classList.add("hidden");
                }

            }
        );
    });


/* ==========================================
   PAGE LOAD
========================================== */

window.addEventListener("load", function() {

    if (
        currentUser.name &&
        currentUser.email &&
        currentUser.className
    ) {

        setupUser();

        document.getElementById("signupPage")
            .classList.add("hidden");

        document.getElementById("mainPage")
            .classList.remove("hidden");

        updateStreak();

    }

    setDailyQuote();

    updateTimerDisplay();
});