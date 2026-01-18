$(function () {

    // Header Scroll
    $(window).scroll(function () {
        if ($(window).scrollTop() >= 60) {
            $("header").addClass("fixed-header");
        } else {
            $("header").removeClass("fixed-header");
        }
    });

    // Tooltip
    const tooltipTriggerList = Array.from(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
        new bootstrap.Tooltip(tooltipTriggerEl);
    });


    // Count
    $('.count').each(function () {
        $(this).prop('Counter', 0).animate({
            Counter: $(this).text()
        }, {
            duration: 1000,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
    });


    // ScrollToTop
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    const btn = document.getElementById("scrollToTopBtn");
    btn.addEventListener("click", scrollToTop);

    window.onscroll = function () {
        const btn = document.getElementById("scrollToTopBtn");
        if (document.documentElement.scrollTop > 100 || document.body.scrollTop > 100) {
            btn.style.display = "flex";
        } else {
            btn.style.display = "none";
        }
    };


    // Aos
    AOS.init({
        once: true,
    });


    // Scroll
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".navbar-collapse a.scroll-link");
    const offcanvasLinks = document.querySelectorAll("#offcanvasHeader a.scroll-link");
    
    let isScrolling = false;
    let scrollTimeout;

    window.addEventListener("scroll", navHighlighter);

    function navHighlighter() {
        // Skip highlighting during programmatic scrolling
        if (isScrolling) {
            return;
        }

        let scrollY = window.pageYOffset;
        let currentSection = "";

        // Find the current section in view
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute("id");

            if (
                scrollY >= sectionTop &&
                scrollY < sectionTop + sectionHeight
            ) {
                currentSection = sectionId;
            }
        });

        // Remove active class from all links first
        navLinks.forEach(link => {
            link.classList.remove("active");
        });
        offcanvasLinks.forEach(link => {
            link.classList.remove("active");
        });

        // Add active class to the current section's link
        if (currentSection) {
            navLinks.forEach(link => {
                if (link.getAttribute("href") === "#" + currentSection) {
                    link.classList.add("active");
                }
            });
            offcanvasLinks.forEach(link => {
                if (link.getAttribute("href") === "#" + currentSection) {
                    link.classList.add("active");
                }
            });
        }
    }

    // Smooth Scroll for navigation links
    document.querySelectorAll('a.scroll-link, a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Only handle hash links
            if (href && href.startsWith('#')) {
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    // Immediately set active state for clicked link
                    navLinks.forEach(link => {
                        link.classList.remove("active");
                    });
                    offcanvasLinks.forEach(link => {
                        link.classList.remove("active");
                    });
                    this.classList.add("active");
                    
                    // Find and activate corresponding link in other menu
                    if (this.closest('.navbar-collapse')) {
                        offcanvasLinks.forEach(link => {
                            if (link.getAttribute("href") === href) {
                                link.classList.add("active");
                            }
                        });
                    } else if (this.closest('#offcanvasHeader')) {
                        navLinks.forEach(link => {
                            if (link.getAttribute("href") === href) {
                                link.classList.add("active");
                            }
                        });
                    }
                    
                    // Set scrolling flag
                    isScrolling = true;
                    
                    // Calculate offset (header height + some padding)
                    const headerOffset = 100;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    // Smooth scroll to target
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Clear any existing timeout
                    clearTimeout(scrollTimeout);
                    
                    // Re-enable highlighting after scroll completes (smooth scroll takes ~500-1000ms)
                    scrollTimeout = setTimeout(() => {
                        isScrolling = false;
                        navHighlighter(); // Update highlighting based on final position
                    }, 1000);
                }
            }
        });
    });

    // Close offcanvas menu when navigation link is clicked
    const offcanvasElement = document.getElementById('offcanvasHeader');
    if (offcanvasElement) {
        const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement) || new bootstrap.Offcanvas(offcanvasElement);
        
        // Get all navigation links inside the offcanvas
        const offcanvasLinks = offcanvasElement.querySelectorAll('.nav-link, .btn');
        
        offcanvasLinks.forEach(link => {
            link.addEventListener('click', function() {
                // Close the offcanvas after a short delay to allow smooth scrolling
                setTimeout(() => {
                    offcanvas.hide();
                }, 100);
            });
        });
    }

});

document.querySelectorAll(".current-year").forEach(el => {
    el.textContent = new Date().getFullYear();
});

