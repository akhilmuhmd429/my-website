// Initialize Lucide icons
lucide.createIcons();

$(document).ready(function() {
  // Mobile Menu Toggle
  $('#mobile-menu-btn').on('click', function() {
    const $menu = $('#mobile-menu');
    $menu.toggleClass('hidden');
  });

  // Close mobile menu when clicking on a link
  $('.mobile-link').on('click', function() {
    $('#mobile-menu').addClass('hidden');
  });

  // Smooth Scrolling
  $('a[href^="#"]').on('click', function(event) {
    var target = $(this.getAttribute('href'));
    if(target.length) {
      event.preventDefault();
      $('html, body').stop().animate({
        scrollTop: target.offset().top - 80 // offset for fixed header
      }, 800);
    }
  });

  // Hero Animation on Load
  setTimeout(function() {
    $('.hero-content').removeClass('opacity-0 translate-y-10');
    $('.hero-visual').removeClass('opacity-0 scale-90');
  }, 100);

  // Scroll Reveal Animation (Fade In Up)
  $(window).on('scroll', function() {
    $('.fade-in-up').each(function() {
      var bottom_of_object = $(this).offset().top + 50;
      var bottom_of_window = $(window).scrollTop() + $(window).height();
      
      if(bottom_of_window > bottom_of_object) {
        $(this).removeClass('opacity-0 translate-y-10');
      }
    });

    // Service cards
    $('.service-card').each(function() {
      var bottom_of_object = $(this).offset().top + 50;
      var bottom_of_window = $(window).scrollTop() + $(window).height();
      
      if(bottom_of_window > bottom_of_object) {
        $(this).removeClass('opacity-0 translate-y-10');
      }
    });

    // Project cards
    $('.project-card').each(function() {
      var bottom_of_object = $(this).offset().top + 50;
      var bottom_of_window = $(window).scrollTop() + $(window).height();
      
      if(bottom_of_window > bottom_of_object) {
        $(this).removeClass('opacity-0 translate-y-10');
      }
    });
  });
  
  // Trigger scroll once to show elements already in view
  $(window).trigger('scroll');

  // Form Submission Mock
  $('#contact-form').on('submit', function(e) {
    e.preventDefault();
    const $btn = $(this).find('button[type="submit"]');
    const originalHTML = $btn.html();
    
    // Show loading state
    $btn.html('<i data-lucide="loader" class="w-4 h-4 mr-2 animate-spin"></i> Sending...');
    lucide.createIcons();
    
    // Simulate sending
    setTimeout(function() {
      $btn.html('<i data-lucide="check" class="w-4 h-4 mr-2"></i> Sent!');
      lucide.createIcons();
      $('#contact-form')[0].reset();
      
      // Reset button after 3 seconds
      setTimeout(function() {
        $btn.html(originalHTML);
        lucide.createIcons();
      }, 3000);
    }, 1500);
  });

  // Add navbar background on scroll
  $(window).on('scroll', function() {
    if($(window).scrollTop() > 50) {
      $('nav').addClass('backdrop-blur-xl');
    } else {
      $('nav').removeClass('backdrop-blur-xl');
    }
  });
});