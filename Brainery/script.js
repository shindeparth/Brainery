document.addEventListener("DOMContentLoaded", () => {
  const openDialogBtns = document.querySelectorAll(".dialog-trigger");
  const dialogContainers = document.querySelectorAll(".dialog-container");
  const closeDialogBtns = document.querySelectorAll(".dialog-close");

  openDialogBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      const dialogContainer = dialogContainers[index];
      dialogContainer.style.display = "flex";
      dialogContainer.classList.remove("fade-out");
      dialogContainer.classList.add("fade-in");
      dialogContainer
        .querySelector(".dialog-content")
        .classList.remove("zoom-out");
      dialogContainer.querySelector(".dialog-content").classList.add("zoom-in");
    });
  });

  closeDialogBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const dialogContainer = btn.closest(".dialog-container");
      dialogContainer.classList.remove("fade-in");
      dialogContainer.classList.add("fade-out");
      dialogContainer
        .querySelector(".dialog-content")
        .classList.remove("zoom-in");
      dialogContainer
        .querySelector(".dialog-content")
        .classList.add("zoom-out");
      setTimeout(() => {
        dialogContainer.style.display = "none";
      }, 300); // Match animation duration
    });
  });

  // Close the dialog if clicked outside of it
  window.addEventListener("click", (event) => {
    if (event.target.classList.contains("dialog-container")) {
      event.target.classList.remove("fade-in");
      event.target.classList.add("fade-out");
      event.target.querySelector(".dialog-content").classList.remove("zoom-in");
      event.target.querySelector(".dialog-content").classList.add("zoom-out");
      setTimeout(() => {
        event.target.style.display = "none";
      }, 300); // Match animation duration
    }
  });
});
