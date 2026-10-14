/**
 * Dr. Farhan Aman — Medical Professional Portfolio
 * Vanilla JavaScript (ES6+) Implementation
 * 
 * Features:
 * - Theme Switcher (Defaults directly to 'dark' mode with localStorage persistence)
 * - Accessible mobile navigation drawer with ARIA management & Escape key listener
 * - Sticky header elevation on scroll
 * - Active section navigation highlighting via IntersectionObserver
 * - Smooth anchor scrolling with sticky header offset
 * - Clipboard copy for doctor's email with accessible live feedback toast
 * - CV download availability check with graceful modal fallback
 * - Doctor profile photograph auto-detection (switches to real photo if present)
 * - Accessible reveal-on-scroll micro-animations with prefers-reduced-motion support
 * - Dynamic copyright year
 * - Back to top button
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. Theme Management (Defaults to Dark Mode)
  // --------------------------------------------------------------------------
  const themeToggle = document.getElementById('theme-toggle');

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('farhan_theme', theme);
    } catch (e) {
      // localStorage may fail in restricted/private browsing modes
    }

    if (themeToggle) {
      themeToggle.setAttribute(
        'aria-label',
        theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
      );
      themeToggle.setAttribute(
        'title',
        theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
      );
    }
  }

  // Read saved theme, or directly default to 'dark'
  let activeTheme = 'dark';
  try {
    const saved = localStorage.getItem('farhan_theme');
    if (saved === 'light' || saved === 'dark') {
      activeTheme = saved;
    }
  } catch (e) {
    activeTheme = 'dark';
  }
  applyTheme(activeTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
    });
  }

  // Check reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --------------------------------------------------------------------------
  // 2. Mobile Navigation Drawer
  // --------------------------------------------------------------------------
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  function openMenu() {
    if (!navToggle || !navMenu) return;
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Close navigation menu');
    navMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (!navToggle || !navMenu) return;
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open navigation menu');
    navMenu.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close menu when pressing Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        closeMenu();
        navToggle.focus();
      }
    });

    // Close menu when clicking any nav link
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        if (navMenu.classList.contains('open')) {
          closeMenu();
        }
      });
    });
  }

  // --------------------------------------------------------------------------
  // 3. Sticky Header Elevation on Scroll
  // --------------------------------------------------------------------------
  const siteHeader = document.getElementById('site-header');
  function handleHeaderScroll() {
    if (!siteHeader) return;
    if (window.scrollY > 20) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  // --------------------------------------------------------------------------
  // 4. Active Navigation State via IntersectionObserver
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  if ('IntersectionObserver' in window && sections.length > 0) {
    const navObserverOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach(function (link) {
            const href = link.getAttribute('href');
            if (href === '#' + currentId) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, navObserverOptions);

    sections.forEach(function (section) {
      navObserver.observe(section);
    });
  }

  // --------------------------------------------------------------------------
  // 5. Copy Email to Clipboard with Accessible Live Feedback
  // --------------------------------------------------------------------------
  const copyEmailBtns = document.querySelectorAll('.js-copy-email');
  const toastNotice = document.getElementById('toast-notice');
  const toastMessage = document.getElementById('toast-message');
  let toastTimer = null;

  function showToast(message) {
    if (!toastNotice || !toastMessage) return;
    toastMessage.textContent = message;
    toastNotice.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastNotice.classList.remove('show');
    }, 3500);
  }

  copyEmailBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const emailToCopy = btn.getAttribute('data-email') || 'Farhanaman7776@gmail.com';

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(emailToCopy)
          .then(function () {
            showToast('Email address copied to clipboard!');
          })
          .catch(function () {
            fallbackCopy(emailToCopy);
          });
      } else {
        fallbackCopy(emailToCopy);
      }
    });
  });

  function fallbackCopy(text) {
    try {
      const tempInput = document.createElement('input');
      tempInput.value = text;
      tempInput.style.position = 'fixed';
      tempInput.style.opacity = '0';
      document.body.appendChild(tempInput);
      tempInput.focus();
      tempInput.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(tempInput);
      if (successful) {
        showToast('Email address copied to clipboard!');
      } else {
        showToast('Please copy: ' + text);
      }
    } catch (err) {
      showToast('Please copy: ' + text);
    }
  }

  // --------------------------------------------------------------------------
  // 6. Download CV Availability Check & Graceful Modal Fallback
  // --------------------------------------------------------------------------
  const cvButtons = document.querySelectorAll('.js-download-cv');
  const cvModal = document.getElementById('cv-modal');
  const cvModalClose = document.getElementById('cv-modal-close');
  const cvModalDismiss = document.getElementById('cv-modal-dismiss');
  let lastFocusedTrigger = null;

  function openCvModal(trigger) {
    if (!cvModal) return;
    lastFocusedTrigger = trigger;
    cvModal.classList.add('open');
    cvModal.setAttribute('aria-hidden', 'false');
    if (cvModalClose) cvModalClose.focus();
    document.body.style.overflow = 'hidden';
  }

  function closeCvModal() {
    if (!cvModal) return;
    cvModal.classList.remove('open');
    cvModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocusedTrigger) {
      lastFocusedTrigger.focus();
    }
  }

  if (cvModal) {
    if (cvModalClose) cvModalClose.addEventListener('click', closeCvModal);
    if (cvModalDismiss) cvModalDismiss.addEventListener('click', closeCvModal);

    cvModal.addEventListener('click', function (e) {
      if (e.target === cvModal) {
        closeCvModal();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && cvModal.classList.contains('open')) {
        closeCvModal();
      }
    });
  }

  cvButtons.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      const targetUrl = btn.getAttribute('href');
      if (!targetUrl || targetUrl === '#' || targetUrl.includes('dr-farhan-aman-cv.pdf')) {
        e.preventDefault();
        
        fetch(targetUrl || 'assets/documents/dr-farhan-aman-cv.pdf', { method: 'HEAD' })
          .then(function (response) {
            if (response.ok && response.status === 200) {
              const downloadLink = document.createElement('a');
              downloadLink.href = targetUrl || 'assets/documents/dr-farhan-aman-cv.pdf';
              downloadLink.setAttribute('download', 'Dr-Farhan-Aman-CV.pdf');
              document.body.appendChild(downloadLink);
              downloadLink.click();
              document.body.removeChild(downloadLink);
            } else {
              openCvModal(btn);
            }
          })
          .catch(function () {
            openCvModal(btn);
          });
      }
    });
  });

  // --------------------------------------------------------------------------
  // 7. Profile Photo Auto-Detection
  // --------------------------------------------------------------------------
  const profileWrapper = document.getElementById('profile-card-wrapper');
  const profileImg = document.getElementById('doctor-profile-img');

  if (profileImg && profileWrapper) {
    const testImg = new Image();
    testImg.onload = function () {
      profileImg.src = testImg.src;
      profileWrapper.classList.add('has-actual-photo');
    };
    testImg.onerror = function () {
      profileWrapper.classList.remove('has-actual-photo');
    };
    testImg.src = 'assets/images/doctor-profile.jpg';
  }

  // --------------------------------------------------------------------------
  // 8. Reveal-on-Scroll Micro-Animations
  // --------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.fade-in-element');

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealElements.forEach(function (el) {
      el.classList.add('is-visible');
    });
  } else {
    const revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  // --------------------------------------------------------------------------
  // 9. Back to Top Button
  // --------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    });
  }

  // --------------------------------------------------------------------------
  // 10. Dynamic Copyright Year
  // --------------------------------------------------------------------------
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

})();
