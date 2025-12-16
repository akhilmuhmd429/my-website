/**
 * Full-Stack .NET Developer Portfolio
 * Main JavaScript File with jQuery
 */

$(document).ready(function() {
    'use strict';

    // ===================================
    // Navigation
    // ===================================
    
    // Navbar scroll effect
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });

    // Mobile menu toggle
    $('#hamburger').click(function() {
        $(this).toggleClass('active');
        $('#navMenu').toggleClass('active');
        $('body').toggleClass('menu-open');
    });

    // Close mobile menu when clicking on a link
    $('.nav-link').click(function() {
        $('#hamburger').removeClass('active');
        $('#navMenu').removeClass('active');
        $('body').removeClass('menu-open');
    });

    // Smooth scrolling for navigation links
    $('.nav-link, .btn[href^="#"], .scroll-down a').click(function(e) {
        e.preventDefault();
        var target = $(this).attr('href');
        
        if ($(target).length) {
            $('html, body').animate({
                scrollTop: $(target).offset().top - 80
            }, 800);
        }
    });

    // Active navigation link on scroll
    $(window).scroll(function() {
        var scrollPos = $(window).scrollTop() + 100;
        
        $('section').each(function() {
            var sectionTop = $(this).offset().top;
            var sectionBottom = sectionTop + $(this).outerHeight();
            var sectionId = $(this).attr('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                $('.nav-link').removeClass('active');
                $('.nav-link[href="#' + sectionId + '"]').addClass('active');
            }
        });
    });

    // ===================================
    // Typing Effect for Hero Section
    // ===================================
    
    var typingTexts = [
        '.NET Developer',
        'Web Designer',
        'Full-Stack Developer',
        'Freelancer'
    ];
    var typingIndex = 0;
    var charIndex = 0;
    var isDeleting = false;
    var typingSpeed = 150;
    var deletingSpeed = 100;
    var delayBetweenWords = 2000;

    function typeText() {
        var currentText = typingTexts[typingIndex];
        
        if (isDeleting) {
            $('.typed-text').text(currentText.substring(0, charIndex - 1));
            charIndex--;
            typingSpeed = deletingSpeed;
        } else {
            $('.typed-text').text(currentText.substring(0, charIndex + 1));
            charIndex++;
            typingSpeed = 150;
        }

        if (!isDeleting && charIndex === currentText.length) {
            typingSpeed = delayBetweenWords;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            typingIndex = (typingIndex + 1) % typingTexts.length;
            typingSpeed = 500;
        }

        setTimeout(typeText, typingSpeed);
    }

    // Start typing effect
    setTimeout(typeText, 1000);

    // ===================================
    // Counter Animation for About Stats
    // ===================================
    
    var hasCounterAnimated = false;

    function animateCounter() {
        if (!hasCounterAnimated && isElementInViewport($('.about-stats'))) {
            hasCounterAnimated = true;
            
            $('.stat-number').each(function() {
                var $this = $(this);
                var target = parseInt($this.attr('data-target'));
                var duration = 2000;
                var steps = 50;
                var increment = target / steps;
                var current = 0;
                var stepDuration = duration / steps;

                var counter = setInterval(function() {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(counter);
                    }
                    $this.text(Math.floor(current) + '+');
                }, stepDuration);
            });
        }
    }

    // ===================================
    // Skills Progress Bar Animation
    // ===================================
    
    var hasSkillsAnimated = false;

    function animateSkills() {
        if (!hasSkillsAnimated && isElementInViewport($('.skills'))) {
            hasSkillsAnimated = true;
            
            $('.skill-progress').each(function() {
                var progress = $(this).attr('data-progress');
                $(this).css('width', progress + '%');
            });
        }
    }

    // ===================================
    // Projects Filtering
    // ===================================
    
    $('.filter-btn').click(function() {
        var filterValue = $(this).attr('data-filter');
        
        // Update active button
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        
        // Filter projects
        if (filterValue === 'all') {
            $('.project-card').removeClass('hide').fadeIn(400);
        } else {
            $('.project-card').each(function() {
                if ($(this).attr('data-category') === filterValue) {
                    $(this).removeClass('hide').fadeIn(400);
                } else {
                    $(this).addClass('hide').fadeOut(400);
                }
            });
        }
    });

    // ===================================
    // Contact Form Handling
    // ===================================
    
    $('#contactForm').submit(function(e) {
        e.preventDefault();
        
        var $form = $(this);
        var $button = $form.find('.btn-submit');
        var $message = $form.find('.form-message');
        
        // Get form data
        var formData = {
            name: $('#name').val(),
            email: $('#email').val(),
            subject: $('#subject').val(),
            message: $('#message').val()
        };
        
        // Disable submit button
        $button.prop('disabled', true);
        $button.find('.btn-text').text('Sending...');
        
        // Simulate form submission (replace with actual AJAX call)
        setTimeout(function() {
            // Show success message
            $message.removeClass('error').addClass('success');
            $message.html('<i class="fas fa-check-circle"></i> Thank you! Your message has been sent successfully.');
            
            // Reset form
            $form[0].reset();
            
            // Enable submit button
            $button.prop('disabled', false);
            $button.find('.btn-text').text('Send Message');
            
            // Hide message after 5 seconds
            setTimeout(function() {
                $message.fadeOut(400, function() {
                    $message.removeClass('success').hide();
                });
            }, 5000);
        }, 1500);
        
        /* 
        // Example AJAX implementation:
        $.ajax({
            url: 'your-backend-endpoint.php',
            method: 'POST',
            data: formData,
            success: function(response) {
                $message.removeClass('error').addClass('success');
                $message.html('<i class="fas fa-check-circle"></i> ' + response.message);
                $form[0].reset();
            },
            error: function() {
                $message.removeClass('success').addClass('error');
                $message.html('<i class="fas fa-exclamation-circle"></i> Oops! Something went wrong. Please try again.');
            },
            complete: function() {
                $button.prop('disabled', false);
                $button.find('.btn-text').text('Send Message');
            }
        });
        */
    });

    // ===================================
    // Back to Top Button
    // ===================================
    
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('#backToTop').addClass('show');
        } else {
            $('#backToTop').removeClass('show');
        }
    });

    $('#backToTop').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 800);
        return false;
    });

    // ===================================
    // Scroll Animations
    // ===================================
    
    function isElementInViewport(el) {
        if (el.length === 0) return false;
        
        var rect = el[0].getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function checkScrollAnimations() {
        // Counter animation
        animateCounter();
        
        // Skills animation
        animateSkills();
        
        // Fade in animations for sections
        $('.section-header, .service-card, .project-card, .skill-category').each(function() {
            if (isElementInViewport($(this)) && !$(this).hasClass('animated')) {
                $(this).addClass('animated fade-in-up');
            }
        });
    }

    // Run on scroll
    $(window).scroll(function() {
        checkScrollAnimations();
    });

    // Run on page load
    checkScrollAnimations();

    // ===================================
    // Parallax Effect for Hero Section
    // ===================================
    
    $(window).scroll(function() {
        var scrolled = $(window).scrollTop();
        $('.hero-particles').css('transform', 'translateY(' + (scrolled * 0.3) + 'px)');
    });

    // ===================================
    // Image Lazy Loading (for when real images are added)
    // ===================================
    
    function lazyLoadImages() {
        $('img[data-src]').each(function() {
            if (isElementInViewport($(this))) {
                var $img = $(this);
                $img.attr('src', $img.attr('data-src'));
                $img.removeAttr('data-src');
            }
        });
    }

    $(window).scroll(lazyLoadImages);
    lazyLoadImages();

    // ===================================
    // Smooth Page Load Animation
    // ===================================
    
    $('body').css('opacity', '0');
    
    $(window).on('load', function() {
        $('body').animate({ opacity: 1 }, 500);
        
        // Animate hero content
        $('.hero-text').css({ opacity: 0, transform: 'translateY(30px)' });
        $('.hero-image').css({ opacity: 0, transform: 'translateY(30px)' });
        
        setTimeout(function() {
            $('.hero-text').animate({ opacity: 1 }, 600).css('transform', 'translateY(0)');
        }, 200);
        
        setTimeout(function() {
            $('.hero-image').animate({ opacity: 1 }, 600).css('transform', 'translateY(0)');
        }, 400);
    });

    // ===================================
    // Prevent Menu Close on Outside Click
    // ===================================
    
    $(document).click(function(e) {
        if (!$(e.target).closest('.navbar').length && $('#navMenu').hasClass('active')) {
            $('#hamburger').removeClass('active');
            $('#navMenu').removeClass('active');
            $('body').removeClass('menu-open');
        }
    });

    // ===================================
    // Dynamic Year in Footer
    // ===================================
    
    $('.footer-text p').html(function(i, html) {
        return html.replace('2024', new Date().getFullYear());
    });

    // ===================================
    // Console Welcome Message
    // ===================================
    
    console.log('%c👋 Welcome to My Portfolio!', 'color: #6366f1; font-size: 20px; font-weight: bold;');
    console.log('%cLooking for a Full-Stack .NET Developer? Let\'s connect!', 'color: #10b981; font-size: 14px;');
    console.log('%c📧 Email: your.email@example.com', 'color: #64748b; font-size: 12px;');

    // ===================================
    // Service Card Interaction Enhancement
    // ===================================
    
    $('.service-card').hover(
        function() {
            $(this).find('.service-icon').css('transform', 'scale(1.1) rotate(5deg)');
        },
        function() {
            $(this).find('.service-icon').css('transform', 'scale(1) rotate(0deg)');
        }
    );

    // ===================================
    // Project Card Hover Effect
    // ===================================
    
    $('.project-card').hover(
        function() {
            $(this).find('.project-placeholder').css('transform', 'scale(1.1)');
        },
        function() {
            $(this).find('.project-placeholder').css('transform', 'scale(1)');
        }
    );

    // Add smooth transition to placeholders
    $('.project-placeholder').css('transition', 'transform 0.3s ease');

    // ===================================
    // Preloader (Optional - commented out)
    // ===================================
    
    /*
    // Add this HTML before closing </body>:
    // <div class="preloader">
    //     <div class="loader"></div>
    // </div>
    
    $(window).on('load', function() {
        $('.preloader').fadeOut(800, function() {
            $(this).remove();
        });
    });
    */

    // ===================================
    // Print Debug Info
    // ===================================
    
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('%c🔧 Development Mode', 'color: #f59e0b; font-size: 12px; font-weight: bold;');
        console.log('jQuery Version:', $.fn.jquery);
        console.log('Viewport Width:', $(window).width());
        console.log('Viewport Height:', $(window).height());
    }

}); // End of document ready

// ===================================
// Window Resize Handler
// ===================================

var resizeTimer;
$(window).resize(function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Recalculate layouts or refresh animations if needed
        console.log('Window resized to:', $(window).width(), 'x', $(window).height());
    }, 250);
});

// ===================================
// Utility Functions
// ===================================

/**
 * Generate random particles for hero background
 */
function generateParticles() {
    var particlesHTML = '';
    for (var i = 0; i < 50; i++) {
        var size = Math.random() * 3 + 1;
        var posX = Math.random() * 100;
        var posY = Math.random() * 100;
        var duration = Math.random() * 20 + 10;
        var delay = Math.random() * 5;
        
        particlesHTML += '<div class="particle" style="' +
            'width: ' + size + 'px; ' +
            'height: ' + size + 'px; ' +
            'left: ' + posX + '%; ' +
            'top: ' + posY + '%; ' +
            'animation: float ' + duration + 's ease-in-out ' + delay + 's infinite;' +
            '"></div>';
    }
    
    // Uncomment to add particles:
    // $('.hero-particles').append(particlesHTML);
}

/**
 * Validate email format
 */
function isValidEmail(email) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/**
 * Get browser information
 */
function getBrowserInfo() {
    var ua = navigator.userAgent;
    var tem;
    var M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return { name: 'IE', version: (tem[1] || '') };
    }
    
    if (M[1] === 'Chrome') {
        tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
        if (tem != null) return { name: tem[1].replace('OPR', 'Opera'), version: tem[2] };
    }
    
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    
    if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
    
    return { name: M[0], version: M[1] };
}