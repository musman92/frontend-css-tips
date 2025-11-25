// Location data for content updates
const locations = {
    paris: {
        name: "Paris, France",
        description: "Experience the magic of the City of Light with our exclusive 7-day Paris adventure. Iconic landmarks and French culture await.",
        price: "$2,499",
        duration: "7 Days / 6 Nights",
        groupSize: "Max 12 People",
        rating: "4.8",
        flightIncluded: true,
        highlights: [
            "Eiffel Tower priority access",
            "Louvre Museum guided tour",
            "Seine River dinner cruise",
            "Montmartre exploration",
            "French cooking class"
        ]
    },
    tokyo: {
        name: "Tokyo, Japan",
        description: "Discover Tokyo's unique blend of tradition and innovation. Experience cutting-edge technology and ancient temples in this vibrant metropolis.",
        price: "$3,299",
        duration: "8 Days / 7 Nights",
        groupSize: "Max 10 People",
        rating: "4.9",
        flightIncluded: true,
        highlights: [
            "Shibuya Crossing experience",
            "Mount Fuji day trip",
            "Traditional tea ceremony",
            "Tokyo Skytree observation",
            "Sushi making workshop"
        ]
    },
    newyork: {
        name: "New York, USA",
        description: "Explore the city that never sleeps. From Broadway shows to iconic landmarks, experience the energy of New York City.",
        price: "$2,899",
        duration: "6 Days / 5 Nights",
        groupSize: "Max 15 People",
        rating: "4.7",
        flightIncluded: true,
        highlights: [
            "Statue of Liberty tour",
            "Broadway show experience",
            "Central Park carriage ride",
            "Times Square exploration",
            "Brooklyn Bridge walk"
        ]
    },
    bali: {
        name: "Bali, Indonesia",
        description: "Escape to Bali's tropical paradise. Ancient temples, stunning beaches, and lush landscapes await in this Indonesian island gem.",
        price: "$1,999",
        duration: "9 Days / 8 Nights",
        groupSize: "Max 8 People",
        rating: "4.9",
        flightIncluded: true,
        highlights: [
            "Ubud rice terraces trek",
            "Tanah Lot Temple sunset",
            "Beach yoga & surfing",
            "Traditional dance show",
            "Luxury spa experience"
        ]
    }
};

class TravelAgency {
    constructor() {
        this.cards = document.querySelectorAll('.location-card');
        this.bgSlides = document.querySelectorAll('.bg-slide');
        this.locationName = document.querySelector('.location-name');
        this.locationDescription = document.querySelector('.location-description');
        this.tripPrice = document.querySelector('.price');
        this.tripDuration = document.querySelector('.trip-info .info-item:nth-child(1) span:last-child');
        this.tripGroupSize = document.querySelector('.trip-info .info-item:nth-child(2) span:last-child');
        this.tripRating = document.querySelector('.trip-info .info-item:nth-child(3) span:last-child');
        this.tripFlight = document.querySelector('.trip-info .info-item:nth-child(4) span:last-child');
        this.tripHighlights = document.querySelector('.trip-highlights ul');
        this.bookNowBtn = document.querySelector('.book-now-btn');

        this.currentLocation = 'paris';

        this.init();
    }

    init() {
        this.setupCardClickHandlers();
        this.updateContent();
        this.startAutoAdvance();
    }

    setupCardClickHandlers() {
        this.cards.forEach((card) => {
            card.addEventListener('click', () => {
                const location = card.dataset.location;
                this.currentLocation = location;
                this.resetAutoAdvance();
                this.updateActiveCard();
                this.updateContent();
            });
        });
    }

    startAutoAdvance() {
        // Auto advance every 5 seconds (matching the progress bar animation duration)
        this.autoAdvanceInterval = setInterval(() => {
            this.advanceToNextLocation();
        }, 5000);
    }

    resetAutoAdvance() {
        // Reset the auto advance timer when user manually clicks
        clearInterval(this.autoAdvanceInterval);
        this.startAutoAdvance();
    }

    advanceToNextLocation() {
        const locationKeys = Object.keys(locations);
        const currentIndex = locationKeys.indexOf(this.currentLocation);
        const nextIndex = (currentIndex + 1) % locationKeys.length;
        this.currentLocation = locationKeys[nextIndex];
        this.updateActiveCard();
        this.updateContent();
    }

    updateActiveCard() {
        // Remove active class from all cards
        this.cards.forEach(card => card.classList.remove('active'));

        // Add active class to current card
        const activeCard = document.querySelector(`.location-card[data-location="${this.currentLocation}"]`);
        if (activeCard) {
            activeCard.classList.add('active');
        }

        // Update background
        this.updateBackground();
    }

    updateBackground() {
        // Remove active class from all background slides
        this.bgSlides.forEach(slide => slide.classList.remove('active'));

        // Add active class to corresponding background slide
        const correspondingBg = document.querySelector(`.bg-slide[data-location="${this.currentLocation}"]`);
        if (correspondingBg) {
            correspondingBg.classList.add('active');
        }
    }

    updateContent() {
        const locationData = locations[this.currentLocation];

        if (locationData) {
            // Update location name and description
            this.locationName.textContent = locationData.name;
            this.locationDescription.textContent = locationData.description;

            // Update price
            this.tripPrice.textContent = locationData.price;

            // Update trip info
            this.tripDuration.textContent = locationData.duration;
            this.tripGroupSize.textContent = locationData.groupSize;
            this.tripRating.textContent = locationData.rating;
            this.tripFlight.textContent = locationData.flightIncluded ? "Flight Included" : "Flight Not Included";

            // Update highlights
            this.tripHighlights.innerHTML = '';
            locationData.highlights.forEach(highlight => {
                const li = document.createElement('li');
                li.textContent = highlight;
                this.tripHighlights.appendChild(li);
            });

            // Update book now button (could add different actions per location)
            this.bookNowBtn.onclick = () => {
                alert(`Booking for ${locationData.name} - ${locationData.price}`);
            };
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TravelAgency();
    new Navbar();
});

// Navbar functionality
class Navbar {
    constructor() {
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.isOpen = false;

        this.init();
    }

    init() {
        this.setupHamburgerToggle();
        this.setupNavLinks();
        this.setupScrollEffect();
    }

    setupHamburgerToggle() {
        this.hamburger.addEventListener('click', () => {
            this.toggleMenu();
        });
    }

    setupNavLinks() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Close mobile menu when link is clicked
                if (this.isOpen) {
                    this.toggleMenu();
                }

                // Remove active class from all links
                this.navLinks.forEach(l => l.classList.remove('active'));

                // Add active class to clicked link
                link.classList.add('active');
            });
        });
    }

    setupScrollEffect() {
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.backdropFilter = 'blur(25px)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.backdropFilter = 'blur(20px)';
            }
        });
    }

    toggleMenu() {
        this.isOpen = !this.isOpen;
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');

        // Prevent body scroll when menu is open
        document.body.style.overflow = this.isOpen ? 'hidden' : '';
    }
}