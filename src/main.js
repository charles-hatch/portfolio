import "./style.css";

const modal = document.getElementById("projectModal");
const titleEl = modal.querySelector(".modal-title");
const descEl = modal.querySelector(".modal-description");
const liveBtn = modal.querySelector(".modal-btn");
const githubBtn = modal.querySelector(".modal-btn.secondary");
const closeBtn = modal.querySelector(".modal-close");

window.openModal = function ({ title, description, live, github }) {
  titleEl.textContent = title;
  descEl.textContent = description;

  githubBtn.href = github;
  githubBtn.style.display = "inline-flex";

  // Live Demo (only show if provided)
  if (live && live.trim() !== "") {
    liveBtn.href = live;
    liveBtn.style.display = "inline-flex";
  } else {
    liveBtn.removeAttribute("href");
    liveBtn.style.display = "none";
  }

  modal.hidden = false;
};

closeBtn.addEventListener("click", () => {
  modal.hidden = true;
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.hidden = true;
});
