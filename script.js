// ============================================
// GAMES DATA - EASILY ADD OR MODIFY GAMES HERE
// ============================================
const gamesData = [
    {
        title: "Hey Tom!",
        description: "This is a 3d horror game set in a science-fiction environment set on an abandoned island, the main antagonist of the game is TOM, who is the offspring of two experimented creatures Thomas and Medusa. The game have a lot of gun play, the player always carries a gun and uses it strategically. The game features interactive puzzles, rotatable and movable structure which plays important role in balancing the gameplay",
        images: [
            "HeyTomSS/SS1.png",
            "HeyTomSS/SS2.png",
            "HeyTomSS/SS3.png",
            "HeyTomSS/SS4.png",
            "HeyTomSS/SS5.png",
            "HeyTomSS/SS6.png",
        ],
        link: "https://yourgame1.com", // Set to null or empty string for "Coming Soon"
        comingSoon: true
    },
    {
        title: "Army Clash",
        description: "This is a free casua ad-free game for mobile, here you control your character, build army and fight againt enemies!",
        images: [
            "ArmyClashSS/CoverArt.png",
            "ArmyClashSS/Screenshot2.png",
            "ArmyClashSS/Screenshot3.png"
        ],
        link: "https://play.google.com/store/apps/details?id=com.adityasharma.armyclash",
        comingSoon: false
    },
    {
        title: "Money Please!",
        description: "A game where you solve puzzles and collect money!",
        images: [
            "MoneyPleaseSS/Screenshot1.png",
            "MoneyPleaseSS/Screenshot2.png",
            "MoneyPleaseSS/Screenshot3.png"
        ],
        link: "https://play.google.com/store/apps/details?id=com.AdityaSharma.MoneyPlease",
        comingSoon: false
    },

    {
        title: "Car Smash Frenzy",
        description: "Control your car, change it's size by colliding with the other cars!",
        images: [
            "CarSmashFrenzySS/SS1.png",
            "CarSmashFrenzySS/SS2.png",
            "CarSmashFrenzySS/SS3.png"
        ],
        link: "https://play.google.com/store/apps/details?id=com.AdityaSharma.CarSmashFrenzy",
        comingSoon: false
    }
];

// ============================================
// SLIDESHOW AUTO-PLAY INTERVAL (in milliseconds)
// Change this value to adjust auto-slide speed
// ============================================
const SLIDESHOW_INTERVAL = 3000; // 3 seconds

// ============================================
// GAMES SLIDESHOW FUNCTIONALITY
// ============================================
let slideshowIntervals = {};

function createGameCard(game, index) {
    const card = document.createElement('div');
    card.className = 'game-card';
    
    // Create slideshow container
    const slideshowHTML = `
        <div class="slideshow-container" id="slideshow-${index}">
            ${game.images.map((img, imgIndex) => `
                <div class="slide ${imgIndex === 0 ? 'active' : ''}">
                    <img src="${img}" alt="${game.title} Screenshot ${imgIndex + 1}">
                </div>
            `).join('')}
            
            ${game.images.length > 1 ? `
                <button class="slide-btn prev-btn" onclick="changeSlide(${index}, -1)">&#10094;</button>
                <button class="slide-btn next-btn" onclick="changeSlide(${index}, 1)">&#10095;</button>
                
                <div class="slide-indicators">
                    ${game.images.map((_, imgIndex) => `
                        <span class="indicator ${imgIndex === 0 ? 'active' : ''}" onclick="goToSlide(${index}, ${imgIndex})"></span>
                    `).join('')}
                </div>
            ` : ''}
        </div>
    `;
    
    // Create game info
    const infoHTML = `
        <div class="game-info">
            <h3>${game.title}</h3>
            <p>${game.description}</p>
            ${game.comingSoon || !game.link ? 
                '<button class="game-btn coming-soon">Coming Soon</button>' :
                `<a href="${game.link}" class="game-btn" target="_blank">Play Now</a>`
            }
        </div>
    `;
    
    card.innerHTML = slideshowHTML + infoHTML;
    return card;
}

function changeSlide(gameIndex, direction) {
    const container = document.getElementById(`slideshow-${gameIndex}`);
    const slides = container.querySelectorAll('.slide');
    const indicators = container.querySelectorAll('.indicator');
    
    let currentIndex = Array.from(slides).findIndex(slide => slide.classList.contains('active'));
    
    slides[currentIndex].classList.remove('active');
    indicators[currentIndex].classList.remove('active');
    
    currentIndex = (currentIndex + direction + slides.length) % slides.length;
    
    slides[currentIndex].classList.add('active');
    indicators[currentIndex].classList.add('active');
    
    // Reset auto-play timer
    resetAutoPlay(gameIndex);
}

function goToSlide(gameIndex, slideIndex) {
    const container = document.getElementById(`slideshow-${gameIndex}`);
    const slides = container.querySelectorAll('.slide');
    const indicators = container.querySelectorAll('.indicator');
    
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    slides[slideIndex].classList.add('active');
    indicators[slideIndex].classList.add('active');
    
    // Reset auto-play timer
    resetAutoPlay(gameIndex);
}

function startAutoPlay(gameIndex) {
    const game = gamesData[gameIndex];
    if (game.images.length > 1) {
        slideshowIntervals[gameIndex] = setInterval(() => {
            changeSlide(gameIndex, 1);
        }, SLIDESHOW_INTERVAL);
    }
}

function resetAutoPlay(gameIndex) {
    clearInterval(slideshowIntervals[gameIndex]);
    startAutoPlay(gameIndex);
}

function initializeGames() {
    const gamesGrid = document.getElementById('gamesGrid');
    
    gamesData.forEach((game, index) => {
        const card = createGameCard(game, index);
        gamesGrid.appendChild(card);
        
        // Start auto-play for each game
        startAutoPlay(index);
    });
}

// Initialize games when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeGames();
});

// ============================================
// MOBILE MENU TOGGLE FUNCTION
// ============================================
function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
}

// ============================================
// CLOSE MENU WHEN CLICKING ON A LINK (MOBILE)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const menuLinks = document.querySelectorAll('.nav-menu a');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            document.getElementById('navMenu').classList.remove('active');
        });
    });
});

// ============================================
// OPTIONAL: ADD SMOOTH SCROLL BEHAVIOR
// (Already handled by CSS, but you can customize here)
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// OPTIONAL: ADD YOUR CUSTOM JAVASCRIPT HERE
// ============================================

// Example: Log when user scrolls to a section
window.addEventListener('scroll', function() {
    // Add your custom scroll behavior here
});

// Example: Add animation when elements come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Create mailto link with form data
            const mailtoLink = `mailto:contact@browngator.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
                `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
            )}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message
            formStatus.textContent = 'Opening your email client... If it doesn\'t open, please email us directly at contact@browngator.com';
            formStatus.className = 'form-status success';
            
            // Reset form after a delay
            setTimeout(() => {
                contactForm.reset();
                formStatus.style.display = 'none';
            }, 5000);
        });
    }

});

