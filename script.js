// IMPORT CSS (Required for Vite to load styles correctly)
import './style.css';

// Initialize Icons
lucide.createIcons();

// --- FIXED MOBILE MENU LOGIC ---
const menuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

if (menuBtn && navLinks) {
    // Toggle menu on button click
    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent immediate closing
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
            navLinks.classList.remove('active');
        }
    });
}

// Project Data
const projectsData = {
    1: {
        title: "NeuroDetect: Alzheimer's Diagnosis",
        category: "AI/ML & Python",
        desc: "An intelligent deep learning system designed to assist in the early diagnosis of Alzheimer's Disease. Powered by AI to help medical professionals with real-time feedback and high accuracy scoring.",
        tags: ["Python", "TensorFlow", "EfficientNetB0", "Flask", "HTML5", "CSS3", "JavaScript"],
        githubLink: "https://github.com/neeraj794/AlzheimersDiseasePrediction_FlaskWebApp",
        features: [
            "Multi-Class Classification of cognitive impairment stages.",
            "High-Performance AI powered by transfer-learning.",
            "Decoupled Client-Server architecture.",
            "Intuitive, dark-mode web interface."
        ],
        challenges: "The task was complicated by subtle inter-class variations in MRI scans and limited medical data. I utilized advanced data augmentation and comparative analysis of CNN architectures to ensure robustness."
    },
    2: {
        title: "Conventional Hall Management",
        category: "Full Stack & Python",
        desc: "A web-based solution designed to automate and streamline the hall booking process for societies. Ensuring error-free reservations, balanced scheduling, and transparent management.",
        tags: ["Flask", "Python", "HTML5", "SQLite", "CSS3", "JavaScript"],
        githubLink: "https://github.com/neeraj794/Conventional-Hall-Web-App",
        features: [
            "User Management with secure authentication.",
            "Real-time Hall Availability Check.",
            "Admin Dashboard for booking approvals.",
            "Responsive UI for all devices."
        ],
        challenges: "Ensuring secure data handling and preventing booking conflicts. Implemented Werkzeug for hashing and custom validation logic in Flask to handle concurrent requests."
    },
};

// Render Projects (ONLY FIRST 2)
const projectsGrid = document.getElementById('projects-grid');

if (projectsGrid) {
    const featuredIDs = [1, 2];
    projectsGrid.innerHTML = featuredIDs.map(id => {
        const project = projectsData[id];
        return `
            <div class="featured-card fade-in" data-id="${id}" style="cursor: pointer;">
                <h3 class="featured-title">${project.title}</h3>
                <p class="featured-desc">${project.desc}</p>
                <div class="tech-stack-container">
                    ${project.tags.map(tag => `<span class="featured-tag">${tag}</span>`).join('')}
                </div>
                <div style="margin-top: auto;">
                    <a href="${project.githubLink}" target="_blank" onclick="event.stopPropagation()" class="code-btn">
                        <i data-lucide="github" style="width: 18px; height: 18px;"></i> Code
                    </a>
                </div>
            </div>
        `;
    }).join('');
    
    // Re-initialize icons
    lucide.createIcons();

    // Attach click listeners to cards
    document.querySelectorAll('.featured-card').forEach(card => {
        card.addEventListener('click', () => {
            const id = card.getAttribute('data-id');
            openModal(id);
        });
    });
}

// Modal Logic
const modal = document.getElementById('projectModal');

function openModal(id) {
    const data = projectsData[id];
    if (!data) return;

    document.getElementById('m-title').innerText = data.title;
    document.getElementById('m-category').innerText = data.category;
    document.getElementById('m-desc').innerText = data.desc;
    document.getElementById('m-challenges').innerText = data.challenges;
    
    const tagsContainer = document.getElementById('m-tags');
    tagsContainer.innerHTML = data.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('');

    const featuresContainer = document.getElementById('m-features');
    featuresContainer.innerHTML = data.features.map(f => `<li style="margin-bottom: 0.5rem; position: relative; padding-left: 1.5rem;"><span style="position:absolute; left:0; color:var(--accent);">▹</span>${f}</li>`).join('');

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModalBtn() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close Button Logic
const closeBtn = document.querySelector('.close-btn');
if (closeBtn) {
    closeBtn.addEventListener('click', closeModalBtn);
}

// Modal Backdrop Click
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModalBtn();
    }
});

// Escape Key
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape" && modal.classList.contains('active')) {
        closeModalBtn();
    }
});

// Contact Form
function handleContact(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    const subject = `Portfolio Contact from ${name}`;
    const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
    window.location.href = `mailto:your.email@example.com?subject=${subject}&body=${body}`;
}

// Scroll Animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));