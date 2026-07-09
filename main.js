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
});
