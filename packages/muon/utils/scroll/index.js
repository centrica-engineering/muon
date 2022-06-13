export default ({
  element, // the element to scroll to
  focusOn = element // optional element that gets focus
} = {}) => {
  const motionQuery = window.matchMedia('(prefers-reduced-motion)');

  setTimeout(function () { // Firefox needs this in order to allow the event queue to clear before scrolling
    if (!motionQuery.matches) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }, 0);

  focusOn.focus({
    preventScroll: !motionQuery.matches
  });

  // https://css-tricks.com/smooth-scrolling-accessibility/
  // "In order for this to work on non-focusable target elements (section, div, span, h1-6, ect),
  // we have to set tabindex="-1" on them"

  if (focusOn !== document.activeElement) { // Checking if the target was focused
    const tabIndex = focusOn.getAttribute('tabindex');
    focusOn.setAttribute('tabindex', '-1'); // Adding tabindex for elements not focusable
    focusOn.focus({
      preventScroll: !motionQuery.matches
    }); // Setting focus
    focusOn.setAttribute('tabindex', tabIndex); //resetting tabindex
  }
};
