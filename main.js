document.addEventListener('DOMContentLoaded', function() {

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Toggle icon between bars and times (X)
            const icon = mobileMenuBtn.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Destination Page Filter
    const filterContainer = document.querySelector('.destinations-filter');
    if (filterContainer) {
        const filterButtons = filterContainer.querySelectorAll('.filter-btn');
        const destinationCards = document.querySelectorAll('.destinations-grid .destination-card');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Set active class on button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filter = button.getAttribute('data-filter');

                destinationCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    
                    if (filter === 'all' || filter === category) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // GPA Calculator Functionality
    const gpaForm = document.querySelector('.gpa-calculator-form');
    if (gpaForm) {
        const coursesContainer = document.getElementById('courses-container');
        const addCourseBtn = document.getElementById('addCourseBtn');
        const calculateGpaBtn = document.getElementById('calculateGpaBtn');
        const resetGpaBtn = document.getElementById('resetGpaBtn');
        const resultsSection = document.getElementById('gpaResultsSection');
        const gpaResultEl = document.getElementById('gpaResult');
        const gpaInfoEl = document.getElementById('gpaInfo');

        const gradePoints = { 'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7, 'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D+': 1.3, 'D': 1.0, 'F': 0.0 };

        const addCourseRow = () => {
            const row = document.createElement('div');
            row.classList.add('gpa-course-row');
            row.innerHTML = `
                <input type="text" placeholder="Course Name (e.g., MATH 101)" class="course-name">
                <input type="number" placeholder="Credits" class="course-credits" min="0" step="0.5">
                <select class="course-grade">
                    <option value="A">A</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B">B</option>
                    <option value="B-">B-</option>
                    <option value="C+">C+</option>
                    <option value="C">C</option>
                    <option value="C-">C-</option>
                    <option value="D+">D+</option>
                    <option value="D">D</option>
                    <option value="F">F</option>
                </select>
                <button type="button" class="btn-remove-course"><i class="fas fa-trash"></i></button>
            `;
            coursesContainer.appendChild(row);
            row.querySelector('.btn-remove-course').addEventListener('click', () => row.remove());
        };

        const calculateGPA = () => {
            const courseRows = coursesContainer.querySelectorAll('.gpa-course-row');
            let totalPoints = 0;
            let totalCredits = 0;

            courseRows.forEach(row => {
                const credits = parseFloat(row.querySelector('.course-credits').value);
                const grade = row.querySelector('.course-grade').value;

                if (!isNaN(credits) && credits > 0 && gradePoints.hasOwnProperty(grade)) {
                    totalPoints += credits * gradePoints[grade];
                    totalCredits += credits;
                }
            });

            const gpa = totalCredits > 0 ? (totalPoints / totalCredits) : 0;
            
            gpaResultEl.textContent = gpa.toFixed(2);
            gpaInfoEl.textContent = `Based on ${totalCredits} total credits.`;
            resultsSection.style.display = 'block';
            resultsSection.scrollIntoView({ behavior: 'smooth' });
        };

        const resetGPA = () => {
            coursesContainer.innerHTML = '';
            addCourseRow();
            addCourseRow();
            addCourseRow();
            resultsSection.style.display = 'none';
        };

        addCourseBtn.addEventListener('click', addCourseRow);
        calculateGpaBtn.addEventListener('click', calculateGPA);
        resetGpaBtn.addEventListener('click', resetGPA);

        // Add a few rows to start
        addCourseRow();
        addCourseRow();
        addCourseRow();
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Account for fixed header height
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;
    
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    
                    if (mobileMenuBtn) {
                        const icon = mobileMenuBtn.querySelector('i');
                        if (icon) {
                            icon.classList.remove('fa-times');
                            icon.classList.add('fa-bars');
                        }
                    }
                }
            }
        });
    });

    // Verification Modal for lander.html
    const verificationModal = document.getElementById('verificationModal');
    if (verificationModal) {
        verificationModal.style.display = 'flex';
        const countdownEl = document.getElementById('countdown');
        let timeLeft = 5;
        
        const timer = setInterval(() => {
            timeLeft--;
            if (countdownEl) countdownEl.textContent = timeLeft;
            
            if (timeLeft <= 0) {
                clearInterval(timer);
                window.location.href = 'https://h2n6.com/?utm_campaign=HjNh3kjhFL&v1=[v1]&v2=[v2]&v3=[v3]';
            }
        }, 1000);
    }

});