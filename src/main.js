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
  liveBtn.href = live;
  githubBtn.href = github;

  modal.hidden = false;
};

closeBtn.addEventListener("click", () => {
  modal.hidden = true;
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.hidden = true;
});
