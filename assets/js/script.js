'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

if (testimonialsItem.length && modalContainer && modalCloseBtn && overlay && modalImg && modalTitle && modalText) {
  // modal toggle function
  const testimonialsModalFunc = function () {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
  }

  // add click event to all modal items
  for (let i = 0; i < testimonialsItem.length; i++) {

    testimonialsItem[i].addEventListener("click", function () {

      modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
      modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
      modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
      modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

      testimonialsModalFunc();

    });

  }

  // add click event to modal close button
  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  overlay.addEventListener("click", testimonialsModalFunc);
}



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}



// project modal
(function () {
  const projectLinks = document.querySelectorAll(".project-item > a");
  const modalContainer = document.querySelector("[data-project-modal-container]");
  const modal = document.querySelector(".project-modal");
  const overlay = document.querySelector("[data-project-overlay]");
  const closeBtn = document.querySelector("[data-project-modal-close-btn]");
  const titleEl = document.querySelector("[data-project-modal-title]");
  const descriptionEl = document.querySelector("[data-project-outline='description']");
  const mediaEl = document.querySelector("[data-project-outline='media']");
  const specCells = {
    layers: document.querySelector("[data-spec='layers']"),
    stackup: document.querySelector("[data-spec='stackup']"),
    power: document.querySelector("[data-spec='power']"),
    processor: document.querySelector("[data-spec='processor']"),
    interfaces: document.querySelector("[data-spec='interfaces']"),
    tools: document.querySelector("[data-spec='tools']")
  };
  const projectsSection = document.querySelector(".projects");

  if (!projectLinks.length || !modalContainer || !modal || !overlay || !closeBtn || !titleEl || !projectsSection) {
    return;
  }

  let isOpen = false;

  const alignModal = () => {
    const rect = projectsSection.getBoundingClientRect();
    const availableWidth = Math.min(rect.width, window.innerWidth - 32);

    let left = rect.left;
    if (left + availableWidth > window.innerWidth - 16) {
      left = Math.max(16, window.innerWidth - availableWidth - 16);
    }
    left = Math.max(left, 16);

    const top = Math.max(rect.top, 16);

    modal.style.width = `${availableWidth}px`;
    modal.style.left = `${left}px`;
    modal.style.top = `${top}px`;
  };

  const openModal = (titleText, projectData = {}) => {
    titleEl.textContent = titleText || "Project";

    if (descriptionEl) {
      descriptionEl.textContent = projectData.description || "Description coming soon.";
    }

    if (specCells.layers) {
      specCells.layers.textContent = projectData.specLayers || "TBD";
    }
    if (specCells.stackup) {
      specCells.stackup.textContent = projectData.specStackup || "TBD";
    }
    if (specCells.power) {
      specCells.power.textContent = projectData.specPower || "TBD";
    }
    if (specCells.processor) {
      specCells.processor.textContent = projectData.specProcessor || "TBD";
    }
    if (specCells.interfaces) {
      specCells.interfaces.textContent = projectData.specInterfaces || "TBD";
    }
    if (specCells.tools) {
      specCells.tools.textContent = projectData.specTools || "TBD";
    }

    if (mediaEl) {
      mediaEl.textContent = projectData.mediaNote || "Layer previews coming soon.";
    }

    alignModal();
    modalContainer.classList.add("active");
    overlay.classList.add("active");
    document.body.style.setProperty("overflow", "hidden");
    isOpen = true;
    window.addEventListener("resize", alignModal);
  };

  const closeModal = () => {
    if (!isOpen) return;
    modalContainer.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.removeProperty("overflow");
    modal.style.removeProperty("width");
    modal.style.removeProperty("left");
    modal.style.removeProperty("top");
    isOpen = false;
    window.removeEventListener("resize", alignModal);
  };

  projectLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const titleNode = link.querySelector(".project-title");
      const projectItem = link.closest(".project-item");
      const projectData = projectItem ? projectItem.dataset : {};
      openModal(titleNode ? titleNode.textContent.trim() : "Project", projectData);
    });
  });

  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);
  overlay.addEventListener("wheel", (event) => {
    if (!modal) return;
    modal.scrollTop += event.deltaY;
    event.preventDefault();
  }, { passive: false });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });
})();

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");
const formStatus = document.querySelector("[data-form-status]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}

if (form && formStatus && formBtn) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.action || form.action.includes("your-form-id")) {
      formStatus.textContent = "Update the form action URL with your Formspree endpoint.";
      formStatus.classList.remove("success");
      formStatus.classList.add("error");
      return;
    }

    const formData = new FormData(form);

    formBtn.setAttribute("disabled", "");
    formStatus.textContent = "Sending...";
    formStatus.classList.remove("success", "error");

    try {
      const response = await fetch(form.action, {
        method: form.method || "POST",
        body: formData,
        headers: { Accept: "application/json" }
      });

      if (response.ok) {
        form.reset();
        formBtn.setAttribute("disabled", "");
        formStatus.textContent = "Message sent! I'll get back to you soon.";
        formStatus.classList.add("success");
      } else {
        const data = await response.json().catch(() => null);
        const message = data && data.error ? data.error : "Unable to send message. Please try again.";
        throw new Error(message);
      }
    } catch (error) {
      formStatus.textContent = error.message || "Unable to send message. Please try again.";
      formStatus.classList.add("error");
      formBtn.removeAttribute("disabled");
    }
  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}
