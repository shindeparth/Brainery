document.addEventListener("DOMContentLoaded", () => {
  const openDialogBtns = document.querySelectorAll(".dialog-trigger");
  const dialogContainers = document.querySelectorAll(".dialog-container");
  const closeDialogBtns = document.querySelectorAll(".dialog-close");

  openDialogBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      const dialogContainer = dialogContainers[index];
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
    });
  });

  closeDialogBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const dialogContainer = btn.closest(".dialog-container");
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
    });
  });

  // Close the dialog if clicked outside of it
  window.addEventListener("click", (event) => {
    if (event.target.classList.contains("dialog-container")) {
      const dialogContainer = event.target;
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
  });
});
