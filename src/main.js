import "./style.css";

/* =========================
   i18n (EN / JA)
   ========================= */

const translations = {
  en: {
    docTitle: "Charles Hatch Portfolio",
    tagline: "Web Developer in Tokyo",
    section: { profile: "My Profile", projects: "My Projects" },
    intro: {
      p1: "I’m a junior web developer from the UK, living in Japan, with a Computer Science degree and experience in IT support. I build practical web projects and am aiming to move into web development.",
      p2: "The projects below are built with HTML, CSS, and JavaScript, and I’m currently learning Node.js and React.",
    },
    chip: {
      selfTaught: "Self-taught Web Dev",
      jlpt: "JLPT N2",
      visa: "Japan Spouse Visa Holder",
      yearsTokyo: "4 years in Tokyo",
    },
    project: {
      memo: {
        title: "Memo App",
        cardDesc:
          "A lightweight memo logging web app with a responsive UI, that uses JavaScript ES Modules and localStorage.",
        modalDesc:
          "This is a simple browser-based memo-taking app. I focused on a clean, modern, responsive UI. It uses LocalStorage to save the user’s memos and restore them on the next visit.\n\nFor more details, please see the GitHub link.",
      },
      directions: {
        title: "Directions Game",
        cardDesc:
          "A simple browser game that can be used in the classroom to teach Japanese elementary school students English phrases.",
        modalDesc:
          "This game can be used in Japanese classrooms to teach the English phrases for directions. The game has two modes, and the menu features information on how the game can be used in class. The game loads immediately, uses a grid system, and has various JS modules to maintain a simple and clean architecture.\n\nFor more information, please see the GitHub link.",
      },
      other: {
        title: "Other Projects",
        cardDesc:
          "A collection of smaller experiments and learning projects, including layout tests and JavaScript exercises.",
        modalDesc:
          "Following the Odin Project guidelines, I am developing a number of personal projects, exercises, etc. to improve my skills. Check out my other projects below.",
      },
    },
    modal: { live: "Live Demo", github: "GitHub", close: "Close" },
  },

  ja: {
    docTitle: "Charles Hatch ポートフォリオ",
    tagline: "東京のWeb Developer",
    section: { profile: "プロフィール", projects: "制作物" },
    intro: {
      p1: "英国出身のWebエンジニアで、日本在住です。コンピュータサイエンスの学位とITサポートの経験があります。フロントエンドエンジニアを目指し、Web開発の学習を続けています。",
      p2: "下記のプロジェクトはHTML / CSS / JavaScriptで作成しています。現在はNode.jsとReactも学習中です。",
    },
    chip: {
      selfTaught: "Web開発を学習中",
      jlpt: "JLPT N2",
      visa: "配偶者ビザ",
      yearsTokyo: "東京在住4年",
    },
    project: {
      memo: {
        title: "メモアプリ",
        cardDesc:
          "レスポンシブなUIのメモアプリ。JavaScript（ES Modules）とlocalStorageでデータを保存します。",
        modalDesc:
          "ブラウザで使えるシンプルなメモアプリです。見やすい・モダン・レスポンシブなUIを意識しました。localStorageでメモを保存し、次回の訪問時に復元します。\n\n詳細はGitHubをご覧ください。",
      },
      directions: {
        title: "Directions Game",
        cardDesc:
          "授業で使えるシンプルなブラウザゲーム。小学生向けに方向の英語表現を練習できます。",
        modalDesc:
          "日本の授業で、道案内の英語表現を練習するためのゲームです。2つのモードがあり、メニューには授業での使い方も載せています。起動が速く、グリッド移動で遊べます。JavaScriptのモジュール分割で、シンプルな構成を意識しました。\n\n詳細はGitHubをご覧ください。",
      },
      other: {
        title: "その他のプロジェット",
        cardDesc:
          "小さな実験・学習用の制作物（レイアウト検証やJavaScript練習など）のまとめです。",
        modalDesc:
          "The Odin Projectの学習に沿って、スキルアップのための個人制作や練習課題に取り組んでいます。その他のリポジトリはGitHubリンクから確認できます。",
      },
    },
    modal: { live: "デモ", github: "GitHub", close: "閉じる" },
  },
};

function getSystemLang() {
  const lang = (
    navigator.languages?.[0] ||
    navigator.language ||
    "en"
  ).toLowerCase();
  return lang.startsWith("ja") ? "ja" : "en";
}

let currentLang = localStorage.getItem("lang") || getSystemLang();

function t(key) {
  const parts = key.split(".");
  let obj = translations[currentLang];
  for (const p of parts) obj = obj?.[p];
  return obj ?? key;
}

function applyTranslations() {
  document.documentElement.lang = currentLang;
  document.title = translations[currentLang].docTitle;

  // Text nodes
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });

  // aria-label nodes
  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    el.setAttribute("aria-label", t(el.dataset.i18nAria));
  });

  // Toggle active button
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.lang === currentLang);
  });
}

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem("lang", lang);
  applyTranslations();
}

/* Wire language buttons */
document.querySelectorAll(".lang-btn").forEach((btn) => {
  btn.addEventListener("click", () => setLang(btn.dataset.lang));
});

/* =========================
   Modal (language-aware)
   ========================= */

const modal = document.getElementById("projectModal");
const titleEl = modal.querySelector(".modal-title");
const descEl = modal.querySelector(".modal-description");
const liveBtn = modal.querySelector(".modal-btn");
const githubBtn = modal.querySelector(".modal-btn.secondary");
const closeBtn = modal.querySelector(".modal-close");

window.openModal = function ({ id, live, github }) {
  const project = translations[currentLang]?.project?.[id];

  titleEl.textContent = project?.title ?? "Project";
  descEl.textContent = project?.modalDesc ?? "";

  githubBtn.href = github;
  githubBtn.style.display = "inline-flex";

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

/* Init */
applyTranslations();
