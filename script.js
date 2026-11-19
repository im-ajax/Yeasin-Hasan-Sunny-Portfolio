const GITHUB_USERNAME = "im-ajax";
const PROFILE_PHOTO = "photo.jpg";

const navToggle = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");
const contactForm = document.getElementById("contact-form");
const contactSuccess = document.getElementById("contact-success");
const projectsGrid = document.getElementById("projects-grid");
const profilePhoto = document.getElementById("profile-photo");

function setupNav() {
  if (!navToggle || !navLinks) return;

  navToggle.addEventListener("click", function () {
    navLinks.classList.toggle("open");
  });

  const links = navLinks.querySelectorAll("a");
  for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function () {
      navLinks.classList.remove("open");
    });
  }
}

function setupScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    for (let i = 0; i < revealElements.length; i++) {
      revealElements[i].classList.add("visible");
    }
    return;
  }

  const observer = new IntersectionObserver(function (entries) {
    for (let j = 0; j < entries.length; j++) {
      if (entries[j].isIntersecting) {
        entries[j].target.classList.add("visible");
        observer.unobserve(entries[j].target);
      }
    }
  }, { threshold: 0.12 });

  for (let k = 0; k < revealElements.length; k++) {
    observer.observe(revealElements[k]);
  }
}

function tryLocalPhoto() {
  if (!profilePhoto) return;

  const img = new Image();
  img.onload = function () {
    profilePhoto.src = PROFILE_PHOTO;
  };
  img.src = PROFILE_PHOTO;
}

function loadGitHubProfile() {
  fetch("https://api.github.com/users/" + encodeURIComponent(GITHUB_USERNAME))
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.public_repos !== undefined) {
        document.getElementById("stat-repos").textContent = data.public_repos;
      }
      if (data.followers !== undefined) {
        document.getElementById("stat-followers").textContent = data.followers;
      }
    })
    .catch(function () {});
}

function isSafeUrl(url) {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" && parsed.hostname === "github.com";
  } catch (e) {
    return false;
  }
}

function showGridMessage(text, includeLink) {
  projectsGrid.textContent = "";
  const p = document.createElement("p");
  p.className = "loading";
  p.textContent = text;

  if (includeLink) {
    const link = document.createElement("a");
    link.href = "https://github.com/" + encodeURIComponent(GITHUB_USERNAME);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.style.color = "#a78bfa";
    link.textContent = "Visit GitHub";
    p.appendChild(link);
  }

  projectsGrid.appendChild(p);
}

function loadGitHubProjects() {
  if (!projectsGrid) return;

  fetch("https://api.github.com/users/" + encodeURIComponent(GITHUB_USERNAME) + "/repos?sort=updated&per_page=6")
    .then(function (response) {
      return response.json();
    })
    .then(function (repos) {
      projectsGrid.textContent = "";

      if (!Array.isArray(repos) || repos.length === 0) {
        showGridMessage("No projects found.", false);
        return;
      }

      for (let i = 0; i < repos.length; i++) {
        const repo = repos[i];
        if (repo.fork || !isSafeUrl(repo.html_url)) {
          continue;
        }

        const card = document.createElement("div");
        card.className = "project-card";
        card.style.animationDelay = (i * 0.1) + "s";

        const titleHeading = document.createElement("h3");
        const titleLink = document.createElement("a");
        titleLink.href = repo.html_url;
        titleLink.target = "_blank";
        titleLink.rel = "noopener noreferrer";
        titleLink.textContent = repo.name || "Untitled Project";
        titleHeading.appendChild(titleLink);

        const descP = document.createElement("p");
        descP.className = "project-desc";
        descP.textContent = repo.description || "A project built with passion and curiosity.";

        const metaDiv = document.createElement("div");
        metaDiv.className = "project-meta";

        const langSpan = document.createElement("span");
        langSpan.className = "project-lang";
        langSpan.textContent = repo.language || "Code";

        const viewLink = document.createElement("a");
        viewLink.href = repo.html_url;
        viewLink.target = "_blank";
        viewLink.rel = "noopener noreferrer";
        viewLink.className = "project-link";
        viewLink.textContent = "View →";

        metaDiv.appendChild(langSpan);
        metaDiv.appendChild(viewLink);

        card.appendChild(titleHeading);
        card.appendChild(descP);
        card.appendChild(metaDiv);

        projectsGrid.appendChild(card);
      }

      if (projectsGrid.children.length === 0) {
        showGridMessage("No projects found.", false);
      }
    })
    .catch(function () {
      showGridMessage("Could not load projects. ", true);
    });
}

function showError(input, message) {
  input.classList.add("invalid");
  const errorEl = input.parentElement.querySelector(".error-msg");
  if (errorEl) {
    errorEl.textContent = message;
  }
}

function clearError(input) {
  input.classList.remove("invalid");
  const errorEl = input.parentElement.querySelector(".error-msg");
  if (errorEl) {
    errorEl.textContent = "";
  }
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function handleContactSubmit(event) {
  event.preventDefault();

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  let isValid = true;

  const fields = [nameInput, emailInput, messageInput];
  for (let i = 0; i < fields.length; i++) {
    clearError(fields[i]);
  }

  if (nameInput.value.trim() === "") {
    showError(nameInput, "Name is required.");
    isValid = false;
  }

  if (emailInput.value.trim() === "") {
    showError(emailInput, "Email is required.");
    isValid = false;
  } else if (!validateEmail(emailInput.value.trim())) {
    showError(emailInput, "Please enter a valid email.");
    isValid = false;
  }

  if (messageInput.value.trim() === "") {
    showError(messageInput, "Message is required.");
    isValid = false;
  }

  if (!isValid) {
    return;
  }

  const subject = encodeURIComponent("Portfolio Contact from " + nameInput.value.trim());
  const body = encodeURIComponent(
    "Name: " + nameInput.value.trim() + "\n" +
    "Email: " + emailInput.value.trim() + "\n\n" +
    messageInput.value.trim()
  );

  window.location.href = "mailto:saniahmed0480@gmail.com?subject=" + subject + "&body=" + body;

  contactForm.classList.add("hidden");
  contactSuccess.classList.remove("hidden");
}

setupNav();
setupScrollReveal();
tryLocalPhoto();
loadGitHubProfile();
loadGitHubProjects();
if (contactForm) {
  contactForm.addEventListener("submit", handleContactSubmit);
}