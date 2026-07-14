console.log("main.js loaded");

// Using a centralized event delegation approach for 100% reliability and consistency.
// This completely avoids any DOMContentLoaded timing issues.
document.addEventListener('click', (e) => {
  // 1. Mobile Navigation Toggle (Hamburger Icon)
  const mobileToggle = e.target.closest('.mobile-nav-toggle');
  if (mobileToggle) {
    const mobileMenu = document.querySelector('.mobile-nav-menu');
    if (mobileMenu) {
      mobileMenu.classList.remove('hidden');
    }
    return;
  }

  // 2. Mobile Navigation Close (X Icon)
  const mobileClose = e.target.closest('.mobile-nav-close');
  if (mobileClose) {
    const mobileMenu = document.querySelector('.mobile-nav-menu');
    if (mobileMenu) {
      mobileMenu.classList.add('hidden');
    }
    return;
  }

  // 3. Dropdown Menu Toggles (Desktop & Mobile)
  // Check if we clicked on an anchor link that is immediately followed by a dropdown div
  const toggleLink = e.target.closest('li > a');
  if (toggleLink && toggleLink.nextElementSibling && toggleLink.nextElementSibling.tagName === 'DIV') {
    e.preventDefault();
    const currentMenu = toggleLink.nextElementSibling;
    
    // Close any other open dropdowns at the same level to keep navigation clean
    const parentLi = toggleLink.parentElement;
    if (parentLi && parentLi.parentElement) {
      const siblingLis = parentLi.parentElement.children;
      for (let sibling of siblingLis) {
        if (sibling !== parentLi) {
          const siblingMenu = sibling.querySelector(':scope > div');
          if (siblingMenu) {
            siblingMenu.classList.add('hidden');
          }
        }
      }
    }
    
    // Toggle visibility of the clicked dropdown
    currentMenu.classList.toggle('hidden');
    return;
  }

  // 4. Click Outside to Close Dropdowns
  // If the user clicks anywhere outside an active dropdown list item, close all dropdowns
  if (!e.target.closest('li')) {
    const allDropdowns = document.querySelectorAll('li > a + div');
    allDropdowns.forEach(menu => {
      menu.classList.add('hidden');
    });
  }

  // 5. FAQ Accordion Toggle
  // Clicking anywhere in the FAQ box opens its answer and closes any other
  // open answer, so only one FAQ is expanded at a time.
  // 5. FAQ Accordion Toggle
  // Clicking anywhere in the FAQ box opens its answer and closes any other
  // open answer, so only one FAQ is expanded at a time.
  const faqItem = e.target.closest('.faq-item');
  if (faqItem) {
    const question = faqItem.querySelector('.faq-question');
    const answer = faqItem.querySelector('.faq-answer');
    const icon = faqItem.querySelector('.faq-icon');
    const isCurrentlyOpen = answer.classList.contains('is-open');

    // Close every FAQ item first
    document.querySelectorAll('.faq-item').forEach((item) => {
      item.querySelector('.faq-question').classList.remove('text-secondary');
      item.querySelector('.faq-answer').classList.remove('is-open');
      item.querySelector('.faq-icon').classList.remove('is-open');
    });

    // Re-open the clicked one, unless it was already open (acts as a toggle)
    if (!isCurrentlyOpen) {
      question.classList.add('text-secondary');
      answer.classList.add('is-open');
      icon.classList.add('is-open');
    }
    return;
  }

  // 6. Portfolio Filter
  const filterBtn = e.target.closest('.portfolio-filter');
  if (filterBtn) {
    const filterValue = filterBtn.dataset.filter;

    // Reset every filter pill, then highlight only the clicked one
    document.querySelectorAll('.portfolio-filter').forEach((btn) => {
      btn.classList.remove('is-active', 'text-secondary');
    });
    filterBtn.classList.add('is-active', 'text-secondary');

    // Show only items matching the selected category ("all" shows everything)
    document.querySelectorAll('.portfolio-item').forEach((item) => {
      const matches = filterValue === 'all' || item.dataset.category === filterValue;
      item.classList.toggle('hidden', !matches);
    });
    return;
  }
  
});

console.log(typeof Swiper);

const testimonialSwiper = new Swiper(".testimonial-slider", {
    loop: true,

    speed: 800,

    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },

    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 24,
      },

      768: {
        slidesPerView: 2,
        spaceBetween: 24,
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
    },
  });