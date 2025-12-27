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
                    
                    // Calculate offset (header height + some padding)
                    const headerOffset = 100;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    // Smooth scroll to target
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Scroll
    const sections = document.querySelectorAll("section[id]");

    window.addEventListener("scroll", navHighlighter);

    function navHighlighter() {

        let scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            sectionId = current.getAttribute("id");

            if (
                scrollY > sectionTop &&
                scrollY <= sectionTop + sectionHeight
            ) {
                const navLink = document.querySelector(".navbar-collapse a[href*=" + sectionId + "]");
                const offcanvasLink = document.querySelector("#offcanvasHeader a[href*=" + sectionId + "]");
                if (navLink) navLink.classList.add("active");
                if (offcanvasLink) offcanvasLink.classList.add("active");
            } else {
                const navLink = document.querySelector(".navbar-collapse a[href*=" + sectionId + "]");
                const offcanvasLink = document.querySelector("#offcanvasHeader a[href*=" + sectionId + "]");
                if (navLink) navLink.classList.remove("active");
                if (offcanvasLink) offcanvasLink.classList.remove("active");
            }
        });
    }

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

