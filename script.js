var GITHUB_USERNAME = "im-ajax";
var PROFILE_PHOTO = "photo.jpg";

var navToggle = document.getElementById("nav-toggle");
var navLinks = document.getElementById("nav-links");
var contactForm = document.getElementById("contact-form");
var contactSuccess = document.getElementById("contact-success");
var projectsGrid = document.getElementById("projects-grid");
var profilePhoto = document.getElementById("profile-photo");

function setupNav() {
  navToggle.addEventListener("click", function () {
    navLinks.classList.toggle("open");
  });

  var links = navLinks.querySelectorAll("a");
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function () {
      navLinks.classList.remove("open");
    });
  }
}

function setupScrollReveal() {
  var revealElements = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    for (var i = 0; i < revealElements.length; i++) {
      revealElements[i].classList.add("visible");
    }
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    for (var j = 0; j < entries.length; j++) {
      if (entries[j].isIntersecting) {
        entries[j].target.classList.add("visible");
        observer.unobserve(entries[j].target);
      }
    }
  }, { threshold: 0.12 });

  for (var k = 0; k < revealElements.length; k++) {
    observer.observe(revealElements[k]);
  }
}

function tryLocalPhoto() {
  var img = new Image();
  img.onload = function () {
    profilePhoto.src = PROFILE_PHOTO;
  };
  img.src = PROFILE_PHOTO;
}

function loadGitHubProfile() {
  fetch("https://api.github.com/users/" + GITHUB_USERNAME)
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
    .catch(function () {
      /* keep default values */
    });
}

function loadGitHubProjects() {
  fetch("https://api.github.com/users/" + GITHUB_USERNAME + "/repos?sort=updated&per_page=6")
    .then(function (response) {
      return response.json();
    })
    .then(function (repos) {
      projectsGrid.innerHTML = "";

      if (!repos || repos.length === 0) {
        projectsGrid.innerHTML = '<p class="loading">No projects found.</p>';
        return;
      }

      for (var i = 0; i < repos.length; i++) {
        var repo = repos[i];
        if (repo.fork) {
          continue;
        }

        var card = document.createElement("div");
        card.className = "project-card";
        card.style.animationDelay = (i * 0.1) + "s";

        var desc = repo.description || "A project built with passion and curiosity.";
        var lang = repo.language || "Code";

        card.innerHTML =
          "<h3><a href=\"" + repo.html_url + "\" target=\"_blank\" rel=\"noopener\">" + repo.name + "</a></h3>" +
          "<p class=\"project-desc\">" + desc + "</p>" +
          "<div class=\"project-meta\">" +
            "<span class=\"project-lang\">" + lang + "</span>" +
            "<a href=\"" + repo.html_url + "\" target=\"_blank\" rel=\"noopener\" class=\"project-link\">View →</a>" +
          "</div>";

        projectsGrid.appendChild(card);
      }

      if (projectsGrid.children.length === 0) {
        projectsGrid.innerHTML = '<p class="loading">No projects found.</p>';
      }
    })
    .catch(function () {
      projectsGrid.innerHTML =
        "<p class=\"loading\">Could not load projects. " +
        "<a href=\"https://github.com/" + GITHUB_USERNAME + "\" target=\"_blank\" rel=\"noopener\" style=\"color:#a78bfa\">Visit GitHub</a></p>";
    });
}

function showError(input, message) {
  input.classList.add("invalid");
  var errorEl = input.parentElement.querySelector(".error-msg");
  if (errorEl) {
    errorEl.textContent = message;
  }
}

function clearError(input) {
  input.classList.remove("invalid");
  var errorEl = input.parentElement.querySelector(".error-msg");
  if (errorEl) {
    errorEl.textContent = "";
  }
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function handleContactSubmit(event) {
  event.preventDefault();

  var nameInput = document.getElementById("name");
  var emailInput = document.getElementById("email");
  var messageInput = document.getElementById("message");
  var isValid = true;

  var fields = [nameInput, emailInput, messageInput];
  for (var i = 0; i < fields.length; i++) {
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

  var subject = encodeURIComponent("Portfolio Contact from " + nameInput.value.trim());
  var body = encodeURIComponent(
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
contactForm.addEventListener("submit", handleContactSubmit);
