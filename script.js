// Smooth scrolling with Locomotive Scroll
document.addEventListener("DOMContentLoaded", () => {
  if (
    window.location.pathname === "/index.html" ||
    window.location.pathname === "/"
  ) {
    try {
      const scroll = new LocomotiveScroll({
        el: document.querySelector(".smooth-scroll"),
        smooth: true,
        lerp: 0.05,
      });
      window.addEventListener("resize", () => scroll.update());
    } catch (error) {
      console.error("Error initializing Locomotive Scroll:", error);
    }
  }
});

// Dialog handling
document.addEventListener("DOMContentLoaded", () => {
  const openDialogBtns = document.querySelectorAll(".dialog-trigger");
  const closeDialogBtns = document.querySelectorAll(".dialog-close");

  function openDialog(index) {
    const dialogContainer =
      document.querySelectorAll(".dialog-container")[index];
    dialogContainer.style.display = "flex";
    gsap.fromTo(
      dialogContainer,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: "power2.out" }
    );
    gsap.fromTo(
      dialogContainer.querySelector(".dialog-content"),
      { scale: 0.8 },
      { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.5)" }
    );
  }

  function closeDialog(dialogContainer) {
    gsap.to(dialogContainer, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => (dialogContainer.style.display = "none"),
    });
    gsap.to(dialogContainer.querySelector(".dialog-content"), {
      scale: 0.8,
      duration: 0.5,
      ease: "power2.in",
    });
  }

  const dialogContainer = document.querySelector(".dialog-container");
  if (dialogContainer) {
    dialogContainer.addEventListener("click", (event) => {
      if (event.target.classList.contains("dialog-trigger")) {
        openDialog(
          Array.from(event.target.parentNode.children).indexOf(event.target)
        );
      } else if (
        event.target.classList.contains("dialog-close") ||
        event.target === dialogContainer
      ) {
        closeDialog(dialogContainer);
      }
    });
  }

  openDialogBtns.forEach((btn, index) =>
    btn.addEventListener("click", () => openDialog(index))
  );
  closeDialogBtns.forEach((btn) =>
    btn.addEventListener("click", () =>
      closeDialog(btn.closest(".dialog-container"))
    )
  );
  window.addEventListener("click", (event) => {
    if (event.target.classList.contains("dialog-container"))
      closeDialog(event.target);
  });
});

// Dropdown menu accessibility
document.addEventListener("DOMContentLoaded", () => {
  const dropdownToggle = document.querySelector(".dropdown-toggle");
  const dropdownMenu = document.querySelector(".drop-down");

  dropdownToggle.addEventListener("click", (e) => {
    e.preventDefault();
    const expanded =
      dropdownToggle.getAttribute("aria-expanded") === "true" || false;
    dropdownToggle.setAttribute("aria-expanded", !expanded);
    dropdownMenu.classList.toggle("show");
  });

  dropdownToggle.addEventListener("keydown", handleDropdownKeyboard);
  document.addEventListener("click", closeDropdownOutside);

  // Close the dropdown when clicking outside
  function closeDropdownOutside(e) {
    if (
      !dropdownToggle.contains(e.target) &&
      !dropdownMenu.contains(e.target)
    ) {
      dropdownToggle.setAttribute("aria-expanded", "false");
      dropdownMenu.classList.remove("show");
    }
  }

  function handleDropdownKeyboard(e) {
    if (e.key === "Escape") {
      dropdownToggle.setAttribute("aria-expanded", "false");
      dropdownMenu.classList.remove("show");
    }
  }
});
