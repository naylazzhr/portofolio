/**
 * Portfolio Interactive Scripts
 * Handles mobile navigation, smooth scrolling, active link state,
 * and contact modal/form interaction.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navLinkItems = document.querySelectorAll('.nav-link');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking any nav link
    navLinkItems.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 2. Navbar Background on Scroll
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  // 3. Highlight Active Navigation Item on Scroll
  const sections = document.querySelectorAll('section[id]');
  
  function highlightNavigation() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetNav = document.querySelector(`.nav-links a[href*="#${sectionId}"]`);

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        targetNav?.classList.add('active');
      } else {
        targetNav?.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', highlightNavigation);

  // 4. Contact Form Submission (Feedback Simulation)
  const contactForm = document.getElementById('contactForm');
  const toastNotice = document.getElementById('toastNotice');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('senderName');
      const emailInput = document.getElementById('senderEmail');
      const messageInput = document.getElementById('senderMessage');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      if (!name || !email || !message) {
        showToast('Mohon lengkapi semua bidang isian formulir.');
        return;
      }

      // Prepare mailto fallback or simulated success
      const subject = encodeURIComponent(`Pesan Portofolio dari ${name}`);
      const body = encodeURIComponent(`Nama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`);
      
      // Show confirmation toast
      showToast('Terima kasih! Membuka aplikasi email Anda...');

      setTimeout(() => {
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
        contactForm.reset();
      }, 700);
    });
  }

  // Helper: Display Toast Notification
  function showToast(text) {
    if (!toastNotice) return;
    toastNotice.textContent = text;
    toastNotice.style.display = 'block';

    setTimeout(() => {
      toastNotice.style.display = 'none';
    }, 4000);
  }

  // 5. Back to top button smooth behavior
  const backToTopBtn = document.querySelector('.back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
