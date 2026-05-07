
/* =========================
   GET CURRENT PAGE
========================= */

let currentPage = decodeURIComponent(window.location.pathname.split("/").pop());

// ========================
// Real time clock
// ========================
function updateClock() {
    const now = new Date();
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    };
    const dateTimeString = now.toLocaleString('en-US', options);
    const clockElement = document.getElementById('liveClock');
    if (clockElement) {
        clockElement.innerHTML = dateTimeString;
    }
}
setInterval(updateClock, 1000);
updateClock();

// ========================
// Back to Top Button
// ========================
const backToTopBtn = document.getElementById('backToTop');

if (backToTopBtn) {
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ========================
// Theme Switcher (Light / Dark)
// ========================
let isDarkTheme = false;

function applyTheme(isDark) {
    if (isDark) {
        document.body.style.backgroundColor = "#1e1e2f";
        document.body.style.color = "#f0f0f0";
        const elements = document.querySelectorAll('.container, .lesson, .latest-course, .review-card, .dash-card, .teacher-card, .lesson-sidebar, .lesson-content-card');
        elements.forEach(el => {
            if (el) {
                el.style.backgroundColor = "#2a2a3b";
                el.style.color = "#f0f0f0";
            }
        });
        const headings = document.querySelectorAll('h1, h2, h3, h4');
        headings.forEach(el => {
            el.style.color = "#E6A11C";
        });
    } else {
        document.body.style.backgroundColor = "";
        document.body.style.color = "";
        const elements = document.querySelectorAll('.container, .lesson, .latest-course, .review-card, .dash-card, .teacher-card, .lesson-sidebar, .lesson-content-card');
        elements.forEach(el => {
            if (el) {
                el.style.backgroundColor = "";
                el.style.color = "";
            }
        });
        const headings = document.querySelectorAll('h1, h2, h3, h4');
        headings.forEach(el => {
            el.style.color = "";
        });
    }
}

     // استرجاع الثيم المخزن (لأي صفحة)
    const savedTheme = localStorage.getItem('sanadTheme');
    if (savedTheme === 'dark') {
      isDarkTheme = true;
      applyTheme(true);
}

    // ربط الثيم بالزر إذا كان موجود
    const themeBtn = document.getElementById('themeBtn');
    if (themeBtn) {
    themeBtn.addEventListener('click', function() {
        isDarkTheme = !isDarkTheme;
        applyTheme(isDarkTheme);
        themeBtn.textContent = isDarkTheme ? '☀️ Light Theme' : '🌙 Dark Theme';
        localStorage.setItem('sanadTheme', isDarkTheme ? 'dark' : 'light');
    });
    
    // تحديث نص الزر حسب الثيم المخزن
    if (savedTheme === 'dark') {
        themeBtn.textContent = '☀️ Light Theme';
    }
}
    document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Initialize Course Content Page (Show 3 lessons initially)
    var lessons = document.querySelectorAll('.lesson');
    if (lessons.length > 0) {
        initializeCourseContentPage();
    }
    
    // 2. Initialize Lesson Pages (Auto alert after 3 seconds)
    initializeLessonPageAlert();
    
    // 3. Initialize Teacher Evaluation Page
    initializeTeacherEvaluation();
    
});

// ==================== COURSE CONTENT PAGE ====================

    function initializeCourseContentPage() {
    var allLessons = document.querySelectorAll('.lesson');
    var lessonsToShowInitially = 3;
    var i;
    
    // Hide lessons beyond the first 3
    for (i = lessonsToShowInitially; i < allLessons.length; i++) {
        allLessons[i].style.display = 'none';
    }
    
    // Check if More button already exists
    var moreButton = document.
	
	getElementById('moreLessonsBtn');
    
    // Only create button if there are more than 3 lessons
    if (moreButton === null && allLessons.length > 3) {
        moreButton = document.createElement('button');
        moreButton.id = 'moreLessonsBtn';
        moreButton.innerHTML = 'More Lessons';
        
        // Style the button using traditional style properties
        moreButton.style.display = 'block';
        moreButton.style.width = '200px';
        moreButton.style.margin = '30px auto';
        moreButton.style.padding = '12px 24px';
        moreButton.style.backgroundColor = '#2c3e50';
        moreButton.style.color = 'white';
        moreButton.style.border = 'none';
        moreButton.style.borderRadius = '5px';
        moreButton.style.cursor = 'pointer';
        moreButton.style.fontSize = '16px';
        moreButton.style.fontWeight = 'bold';
        
        // Add hover effects using traditional mouse events
        moreButton.onmouseover = function() {
            this.style.backgroundColor = '#1a252f';
        };
        
        moreButton.onmouseout = function() {
            this.style.backgroundColor = '#2c3e50';
        };
        
        // Find container to append button
        var container = document.querySelector('.container');
        if (container !== null) {
            container.appendChild(moreButton);
        }
        
        // Add click event to show remaining lessons
        moreButton.onclick = function() {
            var j;
            for (j = lessonsToShowInitially; j < allLessons.length; j++) {
                allLessons[j].style.display = 'flex';
                allLessons[j].style.animation = 'fadeIn 0.5s ease';
            }
            this.style.display = 'none';
            showNotification('All lessons have been displayed successfully!', 'success');
        };
    }
}


/* =========================
   TEACHER EVALUATION
========================= */

if (currentPage === "teacher_evaluation.html") {
    let evaluationForm = document.getElementById("evaluationForm");

    if (evaluationForm) {
        evaluationForm.addEventListener("submit", function(event) {
            event.preventDefault();

            let teacherSelect = document.getElementById("teacherSelect");
            let feedback = document.getElementById("feedback");
            let ratingGroup = document.getElementById("ratingGroup");
            let selectedRating = document.querySelector('input[name="rating"]:checked');

            teacherSelect.style.border = "1px solid #ccc";
            feedback.style.border = "1px solid #ccc";
            ratingGroup.style.border = "1px solid #E5E5E5";

            let valid = true;

            if (teacherSelect.value === "") {
                teacherSelect.style.border = "2px solid red";
                valid = false;
            }

            if (!selectedRating) {
                ratingGroup.style.border = "2px solid red";
                valid = false;
            }

            if (feedback.value.trim() === "") {
                feedback.style.border = "2px solid red";
                valid = false;
            }

            if (!valid) {
                alert("Please complete all required fields.");
                return;
            }

            let ratingValue = Number(selectedRating.value);

            if (ratingValue >= 4) {
                alert("Thank you for your positive evaluation!");
            } else {
                alert("We are sorry for your experience. We will work on improving it.");
            }

            window.location.href = "dashboard.html";
        });
    }
}

// ==================== HELPER FUNCTION ====================

function showNotification(message, type) {
    var notification = document.createElement('div');
    var backgroundColor = '#27ae60'; // Default success color
    
    if (type !== 'success') {
        backgroundColor = '#e74c3c'; // Error/warning color
    }
    
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.padding = '15px 25px';
    notification.style.borderRadius = '8px';
    notification.style.color = 'white';
    notification.style.fontWeight = 'bold';
    notification.style.zIndex = '9999';
    notification.style.backgroundColor = backgroundColor;
    notification.innerHTML = message;
    
    document.body.appendChild(notification);
    
    setTimeout(function() {
        notification.remove();
    }, 3000);
}

// ==================== ADD FADE-IN ANIMATION CSS ====================

var customStyle = document.createElement('style');
customStyle.innerHTML = '@keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }';
document.head.appendChild(customStyle);

/* =========================
   LESSON ALERT 
========================= */

const lessonGoals = {
    "Time Management_1.html": "Your Goal is: Learn how to manage your time effectively ⏰",
    "Stress Control_1.html": "Your Goal is: Learn how to reduce stress and stay calm 🧘‍♂️",
    "1.study skills.html": "Your Goal is: Learn smart study techniques 📚",
    "Exam Preparation_1.html": "Your Goal is: Prepare efficiently for exams 📝",
    "presentation_1.html": "Your Goal is: Improve your presentation skills 🎤",
    "GPA Improvement_1.html": "Your Goal is: Improve your GPA step by step 📈"
};

if (lessonGoals[currentPage]) {
    setTimeout(function () {
        alert("\nWelcome to the lesson page!" + "\n" + lessonGoals[currentPage] + "\nReminder: Don’t forget to take the quiz!");
    }, 3000);
}


/* =========================
   QUIZ + RESULT + DASHBOARD
========================= */

const quizAnswers = {
    "Time Management_quiz.html": {
        lessonName: "Time Management",
        answers: { q1: "a", q2: "b", q3: "b", q4: "b", q5: "a" }
    },
    "Stress Control_quiz.html": {
        lessonName: "Stress Control",
        answers: { q1: "a", q2: "a", q3: "b", q4: "a", q5: "a" }
    },
    "study skills_quiz.html": {
        lessonName: "Study Skills",
        answers: { q1: "a", q2: "a", q3: "a", q4: "a", q5: "a" }
    },
    "Exam Preparation_quiz.html": {
        lessonName: "Exam Preparation",
        answers: { q1: "a", q2: "a", q3: "a", q4: "a", q5: "a" }
    },
    "presentation_quiz.html": {
        lessonName: "Presentation Skills",
        answers: { q1: "a", q2: "a", q3: "a", q4: "a", q5: "a" }
    },
    "GPA Improvement_quiz.html": {
        lessonName: "GPA Improvement",
        answers: { q1: "a", q2: "a", q3: "a", q4: "a", q5: "a" }
    }
};

if (quizAnswers[currentPage]) {
    const form = document.querySelector(".quiz-form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const quiz = quizAnswers[currentPage];
        const answers = quiz.answers;
        let score = 0;
        const total = Object.keys(answers).length;

        for (let q in answers) {
            const selected = document.querySelector(`input[name="${q}"]:checked`);

            if (!selected) {
                alert("Please answer all questions.");
                return;
            }

            if (selected.value === answers[q]) {
                score++;
            }
        }

        const percentage = Math.round((score / total) * 100);

        const bestKey = "bestScore_" + quiz.lessonName;
        const oldBest = Number(localStorage.getItem(bestKey)) || 0;
        const bestScore = percentage > oldBest ? percentage : oldBest;

        localStorage.setItem(bestKey, bestScore);

        localStorage.setItem("currentQuiz", quiz.lessonName);
        localStorage.setItem("currentScore", percentage);
        localStorage.setItem("currentCorrect", score);
        localStorage.setItem("currentTotal", total);

        let studentScores = JSON.parse(localStorage.getItem("studentScores")) || [];

        const existingIndex = studentScores.findIndex(function (item) {
            return item.lesson === quiz.lessonName;
        });

        const newScore = {
            lesson: quiz.lessonName,
            score: percentage + "%",
            bestScore: bestScore + "%"
        };

        if (existingIndex === -1) {
            studentScores.push(newScore);
        } else {
            studentScores[existingIndex] = newScore;
        }

        localStorage.setItem("studentScores", JSON.stringify(studentScores));

        window.location.href = "result.html";
    });
}

if (currentPage === "result.html") {
    const quizName = localStorage.getItem("currentQuiz") || "No quiz completed";
    const score = localStorage.getItem("currentScore") || "0";
    const correct = localStorage.getItem("currentCorrect") || "0";
    const total = localStorage.getItem("currentTotal") || "5";
    const best = localStorage.getItem("bestScore_" + quizName) || "0";

    if (document.getElementById("quizName")) {
        document.getElementById("quizName").textContent = quizName;
        document.getElementById("totalCorrect").textContent = correct + " / " + total;
        document.getElementById("successRate").textContent = score + "%";
        document.getElementById("bestScore").textContent = best + "%";
    }
}

if (currentPage === "dashboard.html") {
    const container = document.getElementById("scoresTableContainer");
    const scores = JSON.parse(localStorage.getItem("studentScores")) || [];

    if (container) {
        if (scores.length === 0) {
            container.innerHTML = "";
        } else {
            let table = `
                <table>
                    <thead>
                        <tr>
                            <th>Lesson</th>
                            <th>Score</th>
                            <th>Best Score</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            for (let i = 0; i < scores.length; i++) {
                table += `
                    <tr>
                        <td>${scores[i].lesson}</td>
                        <td>${scores[i].score}</td>
                        <td>${scores[i].bestScore}</td>
                    </tr>
                `;
            }

            table += `
                    </tbody>
                </table>
            `;

            container.innerHTML = table;
        }
    }
}
/* =========================
   MOBILE MENU
========================= */

const mobileMenu = document.getElementById("mobile-menu");
const navList = document.getElementById("nav-list");

if (mobileMenu && navList) {
    mobileMenu.addEventListener("click", function () {
        navList.classList.toggle("show-menu");
    });
}
