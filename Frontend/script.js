document.addEventListener('DOMContentLoaded', function() {

    // --- Burger Menu Toggle ---
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');

    burger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        burger.setAttribute('aria-expanded', navLinks.classList.contains('active'));
        // Optional: Add animation to the burger icon itself
        // burger.classList.toggle('toggle'); // Uncomment if you have CSS for .burger.toggle
    });

    // Close nav when a link is clicked (for mobile)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                burger.setAttribute('aria-expanded', 'false');
                // burger.classList.remove('toggle'); // Uncomment if used above
            }
        });
    });


    // --- About Section Tab Functionality ---
    const sectionLinks = document.querySelectorAll('.section-links-horizontal .section-link');
    const tabContents = document.querySelectorAll('.tab-content');

    function showTab(targetId) {
        // Hide all tab content sections
        tabContents.forEach(content => {
            content.classList.remove('active');
            // Optional: Hide AOS animation classes when hiding
            // This might help if you re-trigger AOS on tab switch,
            // but can also interfere if AOS handles display: none
            // content.removeAttribute('data-aos');
            // content.removeAttribute('data-aos-delay');
        });

        // Show the target tab content section
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
            // Optional: Re-add AOS animation classes when showing
            // AOS.refreshHard(); // Use with caution - re-initializes AOS for all elements
            // If using AOS.refreshHard(), remove the data-aos/data-aos-delay manipulation above
            // targetSection.setAttribute('data-aos', 'fade-up'); // Example re-add
        }
    }

    function activateLink(clickedLink) {
        // Remove 'active' class from all links
        sectionLinks.forEach(link => {
            link.classList.remove('active');
        });
        // Add 'active' class to the clicked link
        clickedLink.classList.add('active');
    }

    // Add click listeners to the links
    sectionLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default link behavior (scrolling)

            const targetId = this.getAttribute('data-target-section');
            if (targetId) {
                showTab(targetId);
                activateLink(this);
            }
        });
    });

    // Initialize - Show the default active tab on page load
    // Logic improved to ensure only one tab is active initially
    if (sectionLinks.length > 0 && tabContents.length > 0) {
        let initialActiveLink = document.querySelector('.section-links-horizontal .section-link.active');
        if (!initialActiveLink) {
            // If no link has 'active' class, default to the first one
            initialActiveLink = sectionLinks[0];
            initialActiveLink.classList.add('active');
        }

        // Hide all tab content first
        tabContents.forEach(content => content.classList.remove('active'));

        // Show the content for the determined initial active link
        const initialTargetId = initialActiveLink.getAttribute('data-target-section');
        if (initialTargetId) {
            const initialTargetSection = document.getElementById(initialTargetId);
            if (initialTargetSection) {
                initialTargetSection.classList.add('active');
                // AOS.init() will handle the initial animations for visible elements
            }
        }
    }


    // --- Typed.js Initialization ---
    // Make sure the element with id="typed" exists in your HTML
    if (document.getElementById('typed')) {
        var typed = new Typed('#typed', {
            strings: ["Cloud & DevOps Engineer"], // Added more strings
            typeSpeed: 50,
            backSpeed: 25,
            backDelay: 2000, // Pause before deleting
            startDelay: 500, // Delay before starting
            loop: true,
            loopCount: Infinity,
            showCursor: true,
            cursorChar: '|',
            autoInsertCss: true,
        });
    }

    // --- AOS Initialization ---
    // Ensure AOS.init is called after content is potentially manipulated (though hiding via display: none is usually fine)
    AOS.init({
        duration: 800, // values from 0 to 3000, with step 50ms
        once: true, // whether animation should happen only once - while scrolling down
        disable: 'mobile' // Optional: disable animations on mobile for performance
    });


    // --- Copyright Year ---
    const copyrightYearSpan = document.getElementById('copyright-year');
    if (copyrightYearSpan) {
        copyrightYearSpan.textContent = new Date().getFullYear();
    }

    // --- Optional: Contact Form Submission (requires backend) ---
    // This is a placeholder. You need a server-side script to handle form submissions.
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent the default form submission

            // In a real application, you would send this data to a backend server
            // using Fetch API or XMLHttpRequest.
            // Example (pseudo-code - replace with your backend endpoint):
            /*
            const formData = new FormData(contactForm);
            fetch('your-server-side-script-url', { // <<< REPLACE THIS URL
                method: 'POST',
                body: formData
            })
            .then(response => {
                 if (!response.ok) {
                     throw new Error(`HTTP error! status: ${response.status}`);
                 }
                 return response.json(); // Or response.text() depending on backend response
            })
            .then(data => {
                if (data.success) { // Assuming your backend sends a { success: true } response
                    formStatus.textContent = 'Message sent successfully!';
                    formStatus.style.color = 'green';
                    contactForm.reset(); // Clear the form
                } else {
                    // Handle backend-specific errors if any
                    formStatus.textContent = data.message || 'Failed to send message. Please try again.';
                    formStatus.style.color = 'red';
                }
            })
            .catch(error => {
                console.error('Error sending form:', error);
                formStatus.textContent = 'An error occurred. Please try again later.';
                formStatus.style.color = 'red';
            })
            .finally(() => {
                 // Clear status message after a few seconds
                setTimeout(() => {
                    formStatus.textContent = '';
                }, 5000); // Clear after 5 seconds
            });
            */

            // For demonstration without a backend (simulated):
            formStatus.textContent = 'Message sent (simulated)!';
            formStatus.style.color = 'green';
            contactForm.reset(); // Clear the form

             // Clear status message after a few seconds
            setTimeout(() => {
                formStatus.textContent = '';
            }, 5000); // Clear after 5 seconds

        });
    }

});