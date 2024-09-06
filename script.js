// Smooth scrolling with Locomotive Scroll (for index.html only)
if (
  window.location.pathname === "/index.html" ||
  window.location.pathname === "/"
) {
  document.addEventListener("DOMContentLoaded", () => {
    const scroll = new LocomotiveScroll({
      el: document.querySelector(".smooth-scroll"),
      smooth: true,
      lerp: 0.05, // Smoothness level for scrolling
    });

    // Update Locomotive Scroll on window resize
    window.addEventListener("resize", () => {
      scroll.update();
    });
  });
}

// Dialog handling
document.addEventListener("DOMContentLoaded", () => {
  const openDialogBtns = document.querySelectorAll(".dialog-trigger");
  const closeDialogBtns = document.querySelectorAll(".dialog-close");

  // Function to open a dialog
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

  // Function to close a dialog
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

  // Add event listeners for opening dialogs
  openDialogBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => openDialog(index));
  });

  // Add event listeners for closing dialogs
  closeDialogBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const dialogContainer = btn.closest(".dialog-container");
      if (dialogContainer) {
        closeDialog(dialogContainer);
      }
    });
  });

  // Close the dialog if clicked outside of it
  window.addEventListener("click", (event) => {
    if (event.target.classList.contains("dialog-container")) {
      closeDialog(event.target);
    }
  });
});
