const { scrollTop, clientHeight } = document.documentElement;

window.addEventListener("scroll", () => {
  // conception_content
  const conceptionContent1 = document.querySelector(".conception_content_1");
  const conceptionContent2 = document.querySelector(".conception_content_2");
  const conceptionContent3 = document.querySelector(".conception_content_3");
  const allConceptionContent = [
    conceptionContent1,
    conceptionContent2,
    conceptionContent3,
  ];

  allConceptionContent.map((conceptionContent) => {
    const conceptionContentTop = conceptionContent.getBoundingClientRect().top;
    if (scrollTop > scrollTop + conceptionContentTop - clientHeight * 0.8) {
      conceptionContent.classList.add("anim-x");
    }
  });

  // fonctionnement_wrapper_1
  const fonctionnementWrapper1 = document.querySelector(
    ".fonctionnement_wrapper_1"
  );
  const iphoneA = document.querySelector(".iphone-3-a");
  const iphoneB = document.querySelector(".iphone-3-b");
  const fonctionnementTitle = document.querySelector(".fonctionnement_title_1");
  const fonctionnementText = document.querySelector(".fonctionnement_text");
  const fonctionnementBtn = document.querySelector(".fonctionnement_btn");
  const fonctionnementWrapper1Top =
    fonctionnementWrapper1.getBoundingClientRect().top;

  if (scrollTop > scrollTop + fonctionnementWrapper1Top - clientHeight * 0.8) {
    iphoneA.classList.add("anim-iphone-3-top");
    iphoneB.classList.add("anim-iphone-3-down");
    fonctionnementWrapper1.classList.add("anim-y-both");
    fonctionnementTitle.classList.add("anim-y");
    fonctionnementText.classList.add("anim-y");
    fonctionnementBtn.classList.add("anim-y");
  }

  // fonctionnement_wrapper_2 & fonctionnement_wrapper_3
  const fonctionnementWrapper2 = document.querySelector(
    ".fonctionnement_wrapper_2"
  );
  const fonctionnementWrapper3 = document.querySelector(
    ".fonctionnement_wrapper_3"
  );
  const fonctionnementTitle2 = document.querySelector(
    ".fonctionnement_title_2"
  );
  const fonctionnementTitle3 = document.querySelector(
    ".fonctionnement_title_3"
  );
  const fonctionnementIphone1 = document.querySelector(
    ".fonctionnement_iphone_1"
  );
  const fonctionnementIphone2 = document.querySelector(
    ".fonctionnement_iphone_2"
  );
  const fonctionnementIphone3 = document.querySelector(
    ".fonctionnement_iphone_3"
  );
  const progressbar = document.querySelector(".progress_bar");
  const check1 = document.querySelector(".check_1");
  const check2 = document.querySelector(".check_2");
  const checkwrapper1Text = document.querySelector(".check_wrapper_1_text");
  const checkwrapper2Text = document.querySelector(".check_wrapper_2_text");
  const fonctionnementWrapper2Top = fonctionnementWrapper2.getBoundingClientRect().top;

  if (scrollTop > scrollTop + fonctionnementWrapper2Top - clientHeight * 0.8) {
    // fonctionnement_wrapper_2
    fonctionnementWrapper2.classList.add("anim-y-both");
    fonctionnementTitle2.classList.add("anim-y");
    fonctionnementIphone1.classList.add("anim-top-20");
    fonctionnementIphone2.classList.add("anim-bottom-20");
    // fonctionnement_wrapper_3
    fonctionnementWrapper3.classList.add("anim-y-both");
    fonctionnementTitle3.classList.add("anim-y");
    fonctionnementIphone3.classList.add("anim-y-both");
    progressbar.classList.add("anim-x");
    check1.classList.add("anim_scale_100");
    checkwrapper1Text.classList.add("anim-y-both");
    check2.classList.add("anim_scale_100");
    checkwrapper2Text.classList.add("anim-y-both");
  }

  // outil
  const outil = document.querySelector(".outil");
  const outilTitle = document.querySelector(".outil_title");
  const outilContent1 = document.querySelector(".outil_content_1");
  const outilContent2 = document.querySelector(".outil_content_2");
  const outilBtn = document.querySelector(".outil_btn");
  const outilTop = outil.getBoundingClientRect().top;

  if (scrollTop > scrollTop + outilTop - clientHeight * 0.8) {
    outil.classList.add("anim-y-both");
    outilTitle.classList.add("anim-y");
    outilContent1.classList.add("anim-y");
    outilContent2.classList.add("anim-y");
    outilBtn.classList.add("anim-y");
  }

  // correction_notation
  const correction = document.querySelector(".correction_wrapper");
  const notation = document.querySelector(".notation_wrapper");
  const correctionTitle = document.querySelector(".correction_wrapper h3");
  const notationTitle = document.querySelector(".notation_wrapper h3");
  const correctionNaration = [correction, notation];
  const correctionContainer = document.querySelector(".correction_container");
  const notationContainer = document.querySelector(".notation_container");

  correctionNaration.map((element) => {
    const correctionNarationTop = element.getBoundingClientRect().top;
    if (scrollTop > scrollTop + correctionNarationTop - clientHeight * 0.8) {
      correctionContainer.classList.add("anim-y-both");
      notationContainer.classList.add("anim-y-both");
      correctionTitle.classList.add("anim-y-both");
      notationTitle.classList.add("anim-y-both");
    }
  });

  // communaute
  const communauteWrapper = document.querySelector(".communaute_wrapper");
  const communauteTitle = document.querySelector(".communaute_title");
  const communauteText = document.querySelector(".communaute_text");
  const communauteBtn = document.querySelector(".communaute_btn");
  const iphone3c = document.querySelector(".iphone-3-c");
  const iphone3d = document.querySelector(".iphone-3-d");
  const communauteWrapperTop = communauteWrapper.getBoundingClientRect().top;

  if (scrollTop > scrollTop + communauteWrapperTop - clientHeight * 0.8) {
    communauteWrapper.classList.add("anim-y-both");
    iphone3c.classList.add("anim-iphone-3-top");
    iphone3d.classList.add("anim-iphone-3-down");
    communauteTitle.classList.add("anim-y");
    communauteBtn.classList.add("anim-y");
    communauteText.classList.add("anim-y");
  }
});


///////////////////////////////////////////////////////////////
///// Animation: Il vous reste des questions - accordeon /////

///////////////////////////////
///// accordeon checkbox /////
function initCheckboxAccordions() {
  document.querySelectorAll(".accordion_checkbox_title").forEach(accordionCheckboxTitle => {
    const checkboxPrincipal = accordionCheckboxTitle.querySelector(".checkbox");
    const label = accordionCheckboxTitle.querySelector('label');
    const chevron = accordionCheckboxTitle.querySelector('.chevron');
    const subQuestionCheckboxes = accordionCheckboxTitle.closest('.accordion_checkbox').querySelectorAll('.sub_question_content .checkbox');

    const updateCheckboxPrincipalState = () => {
      const totalSubCheckboxes = subQuestionCheckboxes.length;
      const checkedSubCheckboxes = Array.from(subQuestionCheckboxes).filter(Checkbox => Checkbox.checked).length;

      checkboxPrincipal.checked = checkedSubCheckboxes === totalSubCheckboxes;
      checkboxPrincipal.indeterminate = checkedSubCheckboxes > 0 && checkedSubCheckboxes < totalSubCheckboxes;

      label.classList.toggle('indeterminate', checkboxPrincipal.indeterminate);
      label.classList.toggle('checked', checkboxPrincipal.checked && !checkboxPrincipal.indeterminate);
    };

    subQuestionCheckboxes.forEach(subCheckbox => {
      subCheckbox.addEventListener("change", updateCheckboxPrincipalState);
    });

    label.addEventListener("click", function() {
      accordionCheckboxTitle.classList.toggle("active");
      chevron.classList.toggle('rotate');
      const accordionCheckboxText = accordionCheckboxTitle.nextElementSibling;
      accordionCheckboxText.style.maxHeight = accordionCheckboxTitle.classList.contains("active") ? accordionCheckboxText.scrollHeight + "px" : null;
    });

    checkboxPrincipal.addEventListener("change", () => {
      if (!accordionCheckboxTitle.classList.contains("active")) {
        accordionCheckboxTitle.classList.add("active");
        chevron.classList.add('rotate');
        const accordionCheckboxText = accordionCheckboxTitle.nextElementSibling;
        accordionCheckboxText.style.maxHeight = accordionCheckboxText.scrollHeight + "px";
      }
      Array.from(subQuestionCheckboxes).forEach(checkbox => checkbox.checked = checkboxPrincipal.checked);
      updateCheckboxPrincipalState();
    });

    updateCheckboxPrincipalState();
  });
}

////////////////////////////
///// accordeon radio /////
function initRadioAccordions() {
  document.querySelectorAll(".accordion_radio_title").forEach(accordionRadioTitle => {
    const chevronRadio = accordionRadioTitle.querySelector('.chevron');
    const alertIcon = accordionRadioTitle.querySelector('.alerte');
    const checkIcon = accordionRadioTitle.querySelector('.check_green');
    const radioWrapperLabel = accordionRadioTitle.closest('.accordion_radio').querySelector('.radio_wrapper label');
    const radioChoicesWrapper = accordionRadioTitle.closest('.accordion_radio').querySelector('.radio_choice_wrapper');

    accordionRadioTitle.addEventListener("click", () => {
      if (radioChoicesWrapper) {
        accordionRadioTitle.classList.toggle("active");
        chevronRadio.classList.toggle('rotate');
        radioChoicesWrapper.style.maxHeight = accordionRadioTitle.classList.contains("active") ? radioChoicesWrapper.scrollHeight + "px" : null;
      }
    });

    const radioInputs = radioChoicesWrapper.querySelectorAll('input[type="radio"]');
    radioInputs.forEach((radioInput, index) => {
      radioInput.addEventListener("change", () => {
        if (radioInput.checked) {
          alertIcon.style.display = 'none';
          checkIcon.style.display = 'block';

          // Reset class states
          radioWrapperLabel.classList.remove('checked', 'indeterminate');

          // Apply specific class based on the number of radio inputs and which one is selected
          if (radioInputs.length === 3 && index === 1) { // For 3 inputs, add 'indeterminate' if the second one is selected
            radioWrapperLabel.classList.add('indeterminate');
          } else if (index === 0) { // For the first radio input selected, add 'checked'
            radioWrapperLabel.classList.add('checked');
          }
        }
      });
    });
  });
}

// Initialiser les accordéons
initCheckboxAccordions();
initRadioAccordions();

////////////////////////////
///// notations range /////

   const textQuestions = [
    { title: "Performance insuffisante", text: "Pose des questions fermées ou trop directives ou qui ne répondent pas aux objectifs. Utilise le jargon médical."},
    { title: "Performance limité", text: "Pose des questions qui s'éloignent des objectifs. Utilise quelques fois un jargon médical sans explication." },
    { title: "Performance satisfaisante", text: "Utilise différents types de questions couvrant les éléments essentiels. Utilise quelques fois un jargon médical mais toujours avec explications. " },
    { title: "Performance très satisfaisante", text: "Pose des questions précises couvrant la plupart des éléments avec quelques omissions mineures. Utilise le language approprié." },
    { title: "Performance remarquable", text: "Pose des questions avec assurance et savoir-faire." }
];

  const textEntrevue = [
    { title: "Performance insuffisante", text: "Approche désordonnée."},
    { title: "Performance limité", text: "Entrevue peu structuré, présente les difficultés à recadrer les discussions qui s'éloignent des objectifs." },
    { title: "Performance satisfaisante", text: "Entrevue centrée sur le problème et couvre les éléments essentiels." },
    { title: "Performance très satisfaisante", text: "Entrevue menée de façon logique, structurée, centrée sur le problème, ne cherche pas l'information non pertinente." },
    { title: "Performance remarquable", text: "Entrevue ayant un but précis, approche intégrée." }
  ];

// Tableau contenant les ensembles de textes pour un accès facile par index
const textsSets = [textQuestions, textEntrevue];

// Fonction pour mettre à jour les titres et les textes en fonction de la valeur du curseur
function updateTexts(range) {
    const notationText = range.closest('.notation_text');
    const index = Array.from(notationText.parentNode.children).indexOf(notationText);
    const texts = textsSets[index]; // Sélectionne le bon ensemble de textes en fonction de l'index
    const stepTitle = notationText.querySelector('.step_title');
    const stepText = notationText.querySelector('.step_text');
    
    const currentValue = range.value;
    stepTitle.innerText = texts[currentValue].title;
    stepText.innerText = texts[currentValue].text;
}

// Initialisation et écouteurs d'événements pour chaque curseur
document.querySelectorAll('.notation_range_wrapper input[type="range"]').forEach(range => {
    range.value = "0"; // Initialise à 0
    updateTexts(range); // Mise à jour initiale basée sur la valeur par défaut

    range.addEventListener('input', function() {
        updateTexts(this); // Mise à jour lors du changement
    });
});

///////////////////////////////////////
///// Evénements sur btnDownload /////
const allBtnDownload = document.querySelectorAll(".btn_blue");
const parcoursBtnDownload = document.querySelectorAll(".parcours_phase_btn");
const modalDownloadWrapper = document.querySelector(".modal_download_wrapper");
const modal = document.querySelector(".modal_download");

allBtnDownload.forEach((btnDownload) => {
  btnDownload.addEventListener("click", () => {
    modalDownloadWrapper.style.visibility = "visible";
    modalDownloadWrapper.classList.add("display");
    modal.classList.add("anim_download");
  });
});


parcoursBtnDownload.forEach((btnDownload) => {
  btnDownload.addEventListener("click", () => {
    modalDownloadWrapper.style.visibility = "visible";
    modalDownloadWrapper.classList.add("display");
    modal.classList.add("anim_download");
  });
});

///////////////////////////////////////////////////////
///// Écouter les événements sur btn modal_close /////
const closeModal = document.querySelector(".modal_close");

closeModal.addEventListener("click", () => {
  modal.classList.remove("anim_download");
  modalDownloadWrapper.style.visibility = "hidden";
  modalDownloadWrapper.classList.remove("display");
});

//////////////////////////////////////////////////////
///// Écouter les événements sur correction_btn /////
const correctionBtn = document.querySelector(".correction_btn");
const popupCorrectionWrapper = document.querySelector(
  ".popup_correction_wrapper"
);
const popupCorrection = document.querySelector(".popup_correction");

correctionBtn.addEventListener("click", () => {
  popupCorrectionWrapper.style.visibility = "visible";
  popupCorrectionWrapper.classList.add("display");
  popupCorrection.classList.add("anim_download");
});

////////////////////////////////////////////////////
///// Écouter les événements sur notation_btn /////
const notationBtn = document.querySelector(".notation_btn");
const popupNotationWrapper = document.querySelector(".popup_notation_wrapper");
const popupNotation = document.querySelector(".popup_notation");

notationBtn.addEventListener("click", () => {
  popupNotationWrapper.style.visibility = "visible";
  popupNotationWrapper.classList.add("display");
  popupNotation.classList.add("anim_download");
});

//////////////////////////////////////////////////////////////
///// Écouter les événements sur popup_correction_close /////
const popupCorrectionClose = document.querySelector(".popup_correction_close");

popupCorrectionClose.addEventListener("click", () => {
  popupCorrection.classList.remove("anim_download");
  popupCorrectionWrapper.style.visibility = "hidden";
  popupCorrectionWrapper.classList.remove("display");
});

/////////////////////////////////////////////////////////////
///// Écouter les événements sur popup_notation_close //////
const popupNotationClose = document.querySelector(".popup_notation_close");

popupNotationClose.addEventListener("click", () => {
  popupNotation.classList.remove("anim_download");
  popupNotationWrapper.style.visibility = "hidden";
  popupNotationWrapper.classList.remove("display");
});

//////////////////////////////////////////////
///// Écouter les événements mousedown //////
document.addEventListener("mousedown", (event) => {
  // Si le clic n'a pas été effectué sur modal_download et effectué sur modal_download_wrapper
  if (
    !event.target.closest(".modal_download") &&
    event.target.closest(".modal_download_wrapper")
  ) {
    modal.classList.remove("anim_download");
    modalDownloadWrapper.classList.remove("display");
    modalDownloadWrapper.style.visibility = "hidden";
  }
  if (
    !event.target.closest(".popup_correction") &&
    event.target.closest(".popup_correction_wrapper")
  ) {
    popupCorrection.classList.remove("anim_download");
    popupCorrectionWrapper.classList.remove("display");
    popupCorrectionWrapper.style.visibility = "hidden";
  }
  if (
    !event.target.closest(".popup_notation") &&
    event.target.closest(".popup_notation_wrapper")
  ) {
    popupNotation.classList.remove("anim_download");
    popupNotationWrapper.classList.remove("display");
    popupNotationWrapper.style.visibility = "hidden";
  }
});


//Parcours
const imagesParRole = {
  medecin: ["img/medecin-1.png", "img/medecin-2.png", "img/medecin-3.png"],
  patient: ["img/medecin-1.png", "img/medecin-2.png"],
  evaluateur: [
    "img/medecin-1.png",
    "img/medecin-2.png",
    "img/evaluateur-3.png",
  ],
};
let roleActif = "medecin";

//Progress bar
function adjustProgressBar() {
  const activePhases = Array.from(
    document.querySelectorAll(".parcours_phase")
  ).filter((phase) => phase.style.display !== "none");
  const progressBar = document.querySelector(".parcours_progress_bar");

  if (activePhases.length > 1) {
    const startTop =
      activePhases[0].getBoundingClientRect().top + window.scrollY;
    const endTop =
      activePhases[activePhases.length - 1].getBoundingClientRect().top +
      window.scrollY;
    const height = endTop - startTop;

    progressBar.style.height = `${height}px`;
  }
}

document.addEventListener("scroll", function () {
  const phases = document.querySelectorAll(".parcours_phase");
  const progressFill = document.querySelector(".progress_fill");
  const progressBar = document.querySelector(".parcours_progress_bar");
  let windowHeight = window.innerHeight;
  let triggerPoint = windowHeight * 0.6;
  let lastActivePhaseIndex = -1;

  const progressFillMaxHeight = progressBar.offsetHeight;
  progressFill.style.maxHeight = `${progressFillMaxHeight}px`;

  phases.forEach((phase, index) => {
    let phaseTop = phase.getBoundingClientRect().top;
    let phaseDisplay = window.getComputedStyle(phase).display;

    if (phase.classList.contains("phase-active")) {
      lastActivePhaseIndex = index;
    }

    if (phaseTop < triggerPoint && phaseDisplay !== "none") {
      phase.classList.add("phase-active");

      if (imagesParRole[roleActif] && imagesParRole[roleActif][index]) {
        document.querySelector(".parcours_img").src =
          imagesParRole[roleActif][index];
      }

      if (index === 1) {
        let fillPercentage = Math.min(
          100,
          Math.max(0, (1 - phaseTop / triggerPoint) * 100)
        );
        progressFill.style.height = `${fillPercentage}%`;
      }
    } else {
      phase.classList.remove("phase-active");
      if (index === 1) {
        progressFill.style.height = `0%`;
      }
    }
  });

  if (window.innerWidth > 1024) {
    if (lastActivePhaseIndex !== -1) {
      updatePopupContent(lastActivePhaseIndex);
    }
  }
});

//changer la taille de la progress bar dynamiquement
const observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    if (mutation.type === "attributes" && mutation.attributeName === "class") {
      const targetElement = mutation.target;
      if (targetElement.classList.contains("phase-active")) {
        adjustProgressBar();
      }
    }
  });
});
const phases = document.querySelectorAll(".parcours_phase");
phases.forEach(function (phase) {
  observer.observe(phase, {
    attributes: true,
    attributeFilter: ["class"],
  });
});

// Popup
document.addEventListener("DOMContentLoaded", function () {
  const openButton = document.getElementById("open_popup");
  const closeX = document.getElementById("close_popup");
  const closeButton = document.getElementById("btn_close_popup");
  const popupContainer = document.querySelector(".popup_container");

  // Fonction pour ouvrir la popup
  function openPopup() {
    popupContainer.classList.add("active");
    console.log("popup ouverte");
  }

  // Fonction pour fermer la popup
  function closePopup() {
    popupContainer.classList.remove("active");
  }

  document.querySelectorAll(".parcours_img_button").forEach((button) => {
    button.addEventListener("click", function () {
      openPopup();
    });
  });
  openButton.addEventListener("click", openPopup);
  closeButton.addEventListener("click", closePopup);
  closeX.addEventListener("click", closePopup);

  // Fermer la popup en cliquant sur l'arrière-plan
  popupContainer.addEventListener("click", function (event) {
    if (event.target === popupContainer) {
      closePopup();
    }
  });

  // Empêcher la fermeture de la popup lors du clic sur son contenu
  document.querySelector(".popup").addEventListener("click", function (event) {
    event.stopPropagation();
  });
});

//Mise à jour du contenu de la popup
function updatePopupContent(phaseIndex) {
  const popupTitle = document.querySelector(".popup_title");
  const popupText = document.querySelector(".popup_text");
  const popupImage = document.querySelector(".popup_img");

  popupTitle.style.background = "";
  popupTitle.style.backgroundClip = "";
  popupTitle.style.webkitBackgroundClip = "";
  popupTitle.style.webkitTextFillColor = "";

  switch (phaseIndex) {
    case 0:
      popupTitle.textContent = "Étape 1";
      popupTitle.style.background =
        "linear-gradient(87deg, #0A68CF 3.41%, #469EFF 28.39%)";
      popupTitle.style.backgroundClip = "text";
      popupTitle.style.webkitBackgroundClip = "text";
      popupTitle.style.webkitTextFillColor = "transparent";
      popupText.textContent =
        "Le patient prend connaissance de sa fiche, et l'évaluateur de sa grille. Lorsqu'ils sont prêts, le médecin lance le chronomètre pour lire les consignes";
      popupImage.src = "./img/iphone-7.png";
      break;
    case 1:
      popupTitle.textContent = "Étape 2";
      popupTitle.style.background =
        "linear-gradient(265deg, #FFE9E9 65.15%, #FF7474 79.87%)";
      popupTitle.style.backgroundClip = "text";
      popupTitle.style.webkitBackgroundClip = "text";
      popupTitle.style.webkitTextFillColor = "transparent";
      popupText.textContent =
        "Lorsqu'il est prêt, le médecin lance un nouveau chronomètre pour lancer la partie";
      popupImage.src = "./img/iphone-7.png";
      break;
    case 2:
      popupTitle.textContent = "Étape 3";
      popupTitle.style.background =
        "linear-gradient(260deg, #FFEED3 54.11%, #FFB850 83.54%)";
      popupTitle.style.backgroundClip = "text";
      popupTitle.style.webkitBackgroundClip = "text";
      popupTitle.style.webkitTextFillColor = "transparent";
      popupText.textContent =
        "L'évaluateur termine son évaluation, même après 8 minutes. Le médecin a ensuite accès à la grille et la correction détaillée";
      popupImage.src = "./img/iphone-8.png";
      break;
    case 3:
      popupTitle.textContent = "Étape 1";
      popupTitle.style.background =
        "linear-gradient(87deg, #0A68CF 3.41%, #469EFF 28.39%)";
      popupTitle.style.backgroundClip = "text";
      popupTitle.style.webkitBackgroundClip = "text";
      popupTitle.style.webkitTextFillColor = "transparent";
      popupText.textContent =
        "Le patient prend connaissance de sa fiche, et l'évaluateur de sa grille. Lorsqu'ils sont prêts, le médecin lance le chronomètre pour lire les consignes";
      popupImage.src = "./img/iphone-10.png";
      break;
    case 4:
      popupTitle.textContent = "Étape 2";
      popupTitle.style.background =
        "linear-gradient(265deg, #FFE9E9 65.15%, #FF7474 79.87%)";
      popupTitle.style.backgroundClip = "text";
      popupTitle.style.webkitBackgroundClip = "text";
      popupTitle.style.webkitTextFillColor = "transparent";
      popupText.textContent =
        "Lorsqu'il est prêt, le médecin lance un nouveau chronomètre pour lancer la partie";
      popupImage.src = "./img/iphone-10.png";
      break;
    case 5:
      popupTitle.textContent = "Étape 3";
      popupTitle.style.background =
        "linear-gradient(260deg, #FFEED3 54.11%, #FFB850 83.54%)";
      popupTitle.style.backgroundClip = "text";
      popupTitle.style.webkitBackgroundClip = "text";
      popupTitle.style.webkitTextFillColor = "transparent";
      popupText.textContent =
        "L'évaluateur termine son évaluation, même après 8 minutes. Le médecin a ensuite accès à la grille et la correction détaillée";
      popupImage.src = "./img/iphone-9.png";
      break;
  }
}

//onglets mobile
document.getElementById("btn_phase_1").addEventListener("click", function () {
  updatePopupContent(3);
});
document.getElementById("btn_phase_2").addEventListener("click", function () {
  updatePopupContent(4);
});
document.getElementById("btn_phase_3").addEventListener("click", function () {
  updatePopupContent(5);
});

//Onglets
function changeTab() {
  const links = document.querySelectorAll(".parcours_nav a");
  const navBackground = document.querySelector(".nav-background");
  const phase_1 = document.getElementById("phase_1");
  const phase_2 = document.getElementById("phase_2");
  const phase_3 = document.getElementById("phase_3");
  const texte_1 = document.getElementById("texte_phase_1");
  const texte_2 = document.getElementById("texte_phase_2");
  const texte_3 = document.getElementById("texte_phase_3");
  const phase_1_numero = document.getElementById("titre_phase_1");
  const phase_2_numero = document.getElementById("titre_phase_2");
  const phase_3_numero = document.getElementById("titre_phase_3");
  const image = document.querySelector(".parcours_img");
  const phase_3_container = document.getElementById("phase_3_container");
  const phase_2_container = document.getElementById("phase_2_container");

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const linkWidth = this.offsetWidth;
      const linkLeftOffset = this.offsetLeft;
      navBackground.style.width = `${linkWidth}px`;
      navBackground.style.transform = `translateX(${linkLeftOffset}px)`;

      document
        .querySelector(".parcours_nav a.active")
        ?.classList.remove("active");
      this.classList.add("active");

      roleActif = this.getAttribute("data-role");
      image.src = imagesParRole[roleActif][0];

      const role = this.getAttribute("data-role");

      switch (role) {
        case "medecin":
          phase_1.textContent = "Préparation des joueurs";
          texte_1.textContent =
            "Les étudiants se préparent. L'acteur prend connaissance de son rôle, et l’évaluateur de la grille de correction et des annexes. Lorsqu'ils sont prêts, le médecin lance le chronomètre pour lire ses consignes en 1 minute maximum.";
          phase_2.textContent = "Simulation";
          texte_2.textContent =
            "Lorsque tous les joueurs sont prêts, le médecin lance un nouveau chronomètre pour débuter la simulation et l’évaluateur note sa prestation dans une limite de 8 minutes maximum (7 minutes + temps de préparation non consommé).";
          phase_3.textContent = "Résultat";
          texte_3.textContent =
            "L'évaluateur termine son évaluation, même après 8 minutes. Il peut ensuite la transmettre à l'étudiant qui a accès à sa note, sa grille d'évaluation et une correction détaillée du cas.";
          phase_3_container.style.display = "flex";
          phase_1_numero.textContent = "Phase 1/3";
          phase_2_numero.textContent = "Phase 2/3";
          phase_3_numero.textContent = "Phase 3/3";
          break;
        case "patient":
          phase_1.textContent = "Préparation des joueurs";
          texte_1.textContent = "Les étudiants se préparent. L'acteur prend connaissance de son rôle, et l’évaluateur de la grille de correction et des annexes. Lorsqu'ils sont prêts, le médecin lance le chronomètre pour lire ses consignes en 1 minute maximum.";
          phase_2.textContent = "Simulation";
          texte_2.textContent = "Lorsque tous les joueurs sont prêts, le médecin lance un nouveau chronomètre pour débuter la simulation et l’évaluateur note sa prestation dans une limite de 8 minutes maximum (7 minutes + temps de préparation non consommé).";
          phase_1_numero.textContent = "Phase 1/2";
          phase_2_numero.textContent = "Phase 2/2";
          phase_2_container.style.marginBottom = "300px";
          phase_3_container.style.display = "none";
          break;
        case "evaluateur":
          phase_1.textContent = "Préparation des joueurs";
          texte_1.textContent = "Les étudiants se préparent. L'acteur prend connaissance de son rôle, et l’évaluateur de la grille de correction et des annexes. Lorsqu'ils sont prêts, le médecin lance le chronomètre pour lire ses consignes en 1 minute maximum.";
          phase_2.textContent = "Simulation";
          texte_2.textContent = "Lorsque tous les joueurs sont prêts, le médecin lance un nouveau chronomètre pour débuter la simulation et l’évaluateur note sa prestation dans une limite de 8 minutes maximum (7 minutes + temps de préparation non consommé).";
          phase_3.textContent = "Résultat";
          texte_3.textContent = "L'évaluateur termine son évaluation, même après 8 minutes. Il peut ensuite la transmettre à l'étudiant qui a accès à sa note, sa grille d'évaluation et une correction détaillée du cas.";
          phase_3_container.style.display = "flex";
          phase_1_numero.textContent = "Phase 1/3";
          phase_2_numero.textContent = "Phase 2/3";
          phase_3_numero.textContent = "Phase 3/3";
          break;
      }
      adjustProgressBar();
    });
  });
}

//Onglets responsive
function changeTabMobile() {
  const links = document.querySelectorAll(".parcours_nav a");
  const navBackground = document.querySelector(".nav-background");
  const phase_1 = document.getElementById("phase_1_mobile");
  const phase_2 = document.getElementById("phase_2_mobile");
  const phase_3 = document.getElementById("phase_3_mobile");
  const texte_1 = document.getElementById("texte_phase_1_mobile");
  const texte_2 = document.getElementById("texte_phase_2_mobile");
  const texte_3 = document.getElementById("texte_phase_3_mobile");
  const phase_1_numero = document.getElementById("titre_phase_1_mobile");
  const phase_2_numero = document.getElementById("titre_phase_2_mobile");
  const phase_3_numero = document.getElementById("titre_phase_3_mobile");
  const image = document.querySelector(".parcours_img");
  const phase_3_img = document.getElementById("evaluateur_img");
  const phase_3_container = document.getElementById("phase_3_container_mobile");

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const linkWidth = this.offsetWidth;
      const linkLeftOffset = this.offsetLeft;
      navBackground.style.width = `${linkWidth}px`;
      navBackground.style.transform = `translateX(${linkLeftOffset}px)`;

      document
        .querySelector(".parcours_nav a.active")
        ?.classList.remove("active");
      this.classList.add("active");

      roleActif = this.getAttribute("data-role");
      image.src = imagesParRole[roleActif][0];

      const role = this.getAttribute("data-role");

      switch (role) {
        case "medecin":
          phase_1.textContent = "Préparation des joueurs";
          texte_1.textContent =
            "Préparation des étudiants. Le patient prend connaissance de sa fiche, et l'évaluateur de sa grille. Lorsqu'ils sont prêts, le médecin lance le chronomètre pour lire les consignes";
          phase_2.textContent = "Simulation";
          texte_2.textContent =
            "Lorsqu'il est prêt, le médecin lance un nouveau chronomètre pour lancer la partie";
          phase_3.textContent = "Résultat";
          texte_3.textContent =
            "L'évaluateur termine son évaluation, même après 8 minutes. Le médecin a ensuite accès à la grille et la correction détaillée";
          phase_3_container.style.display = "flex";
          phase_1_numero.textContent = "Phase 1/3";
          phase_2_numero.textContent = "Phase 2/3";
          phase_3_numero.textContent = "Phase 3/3";
          phase_3_img.src = "./img/medecin-3.png";
          break;
        case "patient":
          phase_1.textContent = "Préparation des joueurs";
          texte_1.textContent = "Test tab 2";
          phase_2.textContent = "Simulation";
          texte_2.textContent = "Test tab 2";
          phase_1_numero.textContent = "Phase 1/2";
          phase_2_numero.textContent = "Phase 2/2";
          phase_3_container.style.display = "none";
          break;
        case "evaluateur":
          phase_1.textContent = "Préparation des joueurs";
          texte_1.textContent = "Test tab 3";
          phase_2.textContent = "Simulation";
          texte_2.textContent = "Test tab 3";
          phase_3.textContent = "Résultat";
          texte_3.textContent = "Test tab 3";
          phase_3_container.style.display = "flex";
          phase_1_numero.textContent = "Phase 1/3";
          phase_2_numero.textContent = "Phase 2/3";
          phase_3_numero.textContent = "Phase 3/3";
          phase_3_img.src = "./img/evaluateur-3.png";
          break;
      }
    });
  });
}
function adjustBehaviorBasedOnScreenSize() {
  if (window.innerWidth < 1024) {
    changeTabMobile();
  } else {
    changeTab();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  adjustBehaviorBasedOnScreenSize();
});
window.addEventListener("resize", adjustBehaviorBasedOnScreenSize);

//click sur medecin au chargement
document.addEventListener("DOMContentLoaded", function () {
  const medecinTab = document.querySelector('[data-role="medecin"]');
  if (medecinTab) {
    medecinTab.click();
  }
});
