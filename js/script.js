const { scrollTop, clientHeight } = document.documentElement;
///////////////////////////
///// menu hamburger /////

const menuHamburger = document.querySelector(".menu_hamburger");
const headerNavWrapper = document.querySelector(".header_nav_wrapper");
const menuHamburgerLign1 = document.querySelector(".menu_hamburger_lign1");
const menuHamburgerLign2 = document.querySelector(".menu_hamburger_lign2");
const menuHamburgerLign3 = document.querySelector(".menu_hamburger_lign3");


menuHamburger.addEventListener('click', () => {
  headerNavWrapper.classList.toggle("show");
  menuHamburgerLign1.classList.toggle("anim");
  menuHamburgerLign2.classList.toggle("anim");
  menuHamburgerLign3.classList.toggle("anim");
});


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

  allConceptionContent.forEach((conceptionContent) => {
    if (conceptionContent) {
      const conceptionContentTop = conceptionContent.getBoundingClientRect().top;
      if (scrollTop > conceptionContentTop - clientHeight * 0.8) {
        conceptionContent.classList.add("anim-x");
      }
    }
  });

  // parcours_card
  const parcoursWrapper = document.querySelector(".parcours_wrapper");
  const parcoursCard1 = document.querySelector(".parcours_card_1");
  const parcoursCard2 = document.querySelector(".parcours_card_2");
  const parcoursCard3 = document.querySelector(".parcours_card_3");
  const parcoursCard4 = document.querySelector(".parcours_card_4");
  const parcoursTop = parcoursWrapper.getBoundingClientRect().top;

  if (scrollTop > scrollTop + parcoursTop - clientHeight * 0.8) {
    parcoursWrapper.classList.add("visible");
    parcoursCard1.classList.add("anim-y");
    parcoursCard2.classList.add("anim-y");
    parcoursCard3.classList.add("anim-y");
    parcoursCard4.classList.add("anim-y");
  }

  // entrainement_seul
  const entrainementWrapper = document.getElementById("entrainement_wrapper");
  const entrainementCard1 = document.querySelector(".entrainement_seul_card_1");
  const entrainementCard2 = document.querySelector(".entrainement_seul_card_2");
  const entrainementCard3 = document.querySelector(".entrainement_seul_card_3");
  const entrainementImg1 = document.querySelector(".entrainement_seul_img_1");
  const entrainementImg2 = document.querySelector(".entrainement_seul_img_2");
  const entrainementImg3 = document.querySelector(".entrainement_seul_img_3");
  const entrainementWrapperTop = entrainementWrapper.getBoundingClientRect().top;

  if (scrollTop > scrollTop + entrainementWrapperTop - clientHeight * 0.8) {
    entrainementWrapper.classList.add("visible");
    entrainementCard1.classList.add("anim-y");
    entrainementCard2.classList.add("anim-y");
    entrainementCard3.classList.add("anim-y");
    entrainementImg1.classList.add("anim-iphone-seul");
    entrainementImg2.classList.add("anim-iphone-seul");
    entrainementImg3.classList.add("anim-iphone-seul");
  }

  // flashcards
  const flashcardsWrapper = document.querySelector(".flashcards_wrapper");
  const flashcards_title = document.querySelector(".flashcards_content_title");
  const flashcards_text = document.querySelector(".flashcards_content_text");
  const flashcards_btn = document.querySelector(".flashcards_content_btn");
  const flashcardsWrapperTop = flashcardsWrapper.getBoundingClientRect().top;

  if (scrollTop > scrollTop + flashcardsWrapperTop - clientHeight * 0.8) {
    flashcardsWrapper.classList.add("anim-y-both");
    flashcards_title.classList.add("anim-y");
    flashcards_text.classList.add("anim-y");
    flashcards_btn.classList.add("anim-y");
  }

  // fonctionnement_wrapper_1
  const fonctionnementWrapper1 = document.querySelector(".fonctionnement_wrapper_1");
  const iphoneA = document.querySelector(".iphone-3-a");
  const iphoneB = document.querySelector(".iphone-3-b");
  const fonctionnementTitle = document.querySelector(".fonctionnement_title_1");
  const fonctionnementText = document.querySelector(".fonctionnement_text");
  const fonctionnementBtn = document.querySelector(".fonctionnement_btn");
  const fonctionnementWrapper1Top = fonctionnementWrapper1.getBoundingClientRect().top;

  if (scrollTop > scrollTop + fonctionnementWrapper1Top - clientHeight * 0.8) {
    iphoneA.classList.add("anim-iphone-3-top");
    iphoneB.classList.add("anim-iphone-3-down");
    fonctionnementWrapper1.classList.add("anim-y-both");
    fonctionnementTitle.classList.add("anim-y");
    fonctionnementText.classList.add("anim-y");
    fonctionnementBtn.classList.add("anim-y");
  }

  // fonctionnement_wrapper_2 & fonctionnement_wrapper_3
  const fonctionnementWrapper2 = document.querySelector(".fonctionnement_wrapper_2");
  const fonctionnementWrapper3 = document.querySelector(".fonctionnement_wrapper_3");
  const fonctionnementTitle2 = document.querySelector(".fonctionnement_title_2");
  const fonctionnementTitle3 = document.querySelector(".fonctionnement_title_3");
  const fonctionnementIphone1 = document.querySelector(".fonctionnement_iphone_1");
  const fonctionnementIphone2 = document.querySelector(".fonctionnement_iphone_2");
  const fonctionnementIphone3 = document.querySelector(".fonctionnement_iphone_3");
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
    const isNoSubQuestion = accordionCheckboxTitle.classList.contains("no_sub_question");
    const subQuestionCheckboxes = accordionCheckboxTitle.closest('.accordion_checkbox').querySelectorAll('.sub_question_content .checkbox');

    const updateCheckboxPrincipalState = () => {
      if (!isNoSubQuestion) {
        const totalSubCheckboxes = subQuestionCheckboxes.length;
        const checkedSubCheckboxes = Array.from(subQuestionCheckboxes).filter(checkbox => checkbox.checked).length;

        checkboxPrincipal.checked = checkedSubCheckboxes === totalSubCheckboxes;
        checkboxPrincipal.indeterminate = checkedSubCheckboxes > 0 && checkedSubCheckboxes < totalSubCheckboxes;

        label.classList.toggle('indeterminate', checkboxPrincipal.indeterminate);
        label.classList.toggle('checked', checkboxPrincipal.checked && !checkboxPrincipal.indeterminate);
      }
    };

    if (!isNoSubQuestion) {
      subQuestionCheckboxes.forEach(subCheckbox => {
        subCheckbox.addEventListener("change", updateCheckboxPrincipalState);
      });
    }

    label.addEventListener("click", function() {
      if (!isNoSubQuestion) {
        accordionCheckboxTitle.classList.toggle("active");
        if(chevron) {
          chevron.classList.toggle('rotate');
        }
        
        const accordionCheckboxText = accordionCheckboxTitle.nextElementSibling;
        accordionCheckboxText.style.maxHeight = accordionCheckboxTitle.classList.contains("active") ? accordionCheckboxText.scrollHeight + "px" : null;
      }
    });

    checkboxPrincipal.addEventListener("change", () => {
      if (isNoSubQuestion) {
        // Spécifiquement pour les checkbox sans sous-questions
        label.classList.toggle('checked', checkboxPrincipal.checked);
      } else {
        const accordionCheckboxText = accordionCheckboxTitle.nextElementSibling;
        if (!accordionCheckboxTitle.classList.contains("active")) {
          accordionCheckboxTitle.classList.add("active");
          if(chevron) {
            chevron.classList.add('rotate');
          }
          accordionCheckboxText.style.maxHeight = accordionCheckboxText.scrollHeight + "px";
        }
        Array.from(subQuestionCheckboxes).forEach(checkbox => checkbox.checked = checkboxPrincipal.checked);
        updateCheckboxPrincipalState();
      }
    });

    if (!isNoSubQuestion) {
      updateCheckboxPrincipalState();
    }
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
    { title: "Insuffisant", text: "Pose des questions fermées où trop directives ou qui ne répondent pas aux objectifs. Utilise le jargon médical."},
    { title: "Limité", text: "Pose des questions qui s'éloignent des objectifs. Utilise quelques fois un jargon médical sans explication." },
    { title: "Satisfaisant", text: "Utilise différents types de questions couvrant les éléments essentiels. Utilise quelques fois un jargon médical mais toujours avec explications. " },
    { title: "Très satisfaisant", text: "Pose des questions précises couvrant la plupart des éléments avec quelques omissions mineures. Utilise le language approprié." },
    { title: "Remarquable", text: "Pose des questions avec assurance et savoir-faire." }
];

  const textEntrevue = [
    { title: "Insuffisant", text: "Approche désordonnée."},
    { title: "Limité", text: "Entrevues peu structuré, présentent les difficultés à recadrer les discussions qui s'éloignent des objectifs." },
    { title: "Satisfaisant", text: "Entrevue centrée sur le problème et couvre les éléments essentiels." },
    { title: "Très satisfaisant", text: "Entrevue mener de façon logique, structurée, centrée sur le problème, ne cherche pas l'information non pertinente." },
    { title: "Remarquable", text: "Entrevue ayant un but précis, approche intégrée." }
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
const modalDownloadWrapper = document.querySelector(".modal_download_wrapper");
const modal = document.querySelector(".modal_download");
const body =document.querySelector("body");

allBtnDownload.forEach((btnDownload) => {
  btnDownload.addEventListener("click", () => {
    modalDownloadWrapper.style.visibility = "visible";
    modalDownloadWrapper.classList.add("display");
    modal.classList.add("anim_download");
    body.style.overflow = "hidden";

  });
});

///////////////////////////////////////////////////////
///// Écouter les événements sur btn modal_close /////
const closeModal = document.querySelector(".modal_close");

closeModal.addEventListener("click", () => {
  modal.classList.remove("anim_download");
  modalDownloadWrapper.style.visibility = "hidden";
  modalDownloadWrapper.classList.remove("display");
  body.style.overflow = "auto";
});

//////////////////////////////////////////////////////
///// Écouter les événements sur correction_btn /////
const correctionBtn = document.querySelector(".correction_btn");
const popupCorrectionWrapper = document.querySelector(
  ".popup_correction_wrapper"
);
const popupCorrection = document.querySelector(".popup_correction");

if(correctionBtn) {
  correctionBtn.addEventListener("click", () => {
    popupCorrectionWrapper.style.visibility = "visible";
    popupCorrectionWrapper.classList.add("display");
    popupCorrection.classList.add("anim_download");
    body.style.overflow = "hidden";
  });
}

////////////////////////////////////////////////////
///// Écouter les événements sur notation_btn /////
const notationBtn = document.querySelector(".notation_btn");
const popupNotationWrapper = document.querySelector(".popup_notation_wrapper");
const popupNotation = document.querySelector(".popup_notation");

if(notationBtn) {
  notationBtn.addEventListener("click", () => {
    popupNotationWrapper.style.visibility = "visible";
    popupNotationWrapper.classList.add("display");
    popupNotation.classList.add("anim_download");
    body.style.overflow = "hidden";
  });
}
//////////////////////////////////////////////////////////////
///// Écouter les événements sur popup_correction_close /////
const popupCorrectionClose = document.querySelector(".popup_correction_close");

if(popupCorrectionClose) {
  popupCorrectionClose.addEventListener("click", () => {
    popupCorrection.classList.remove("anim_download");
    popupCorrectionWrapper.style.visibility = "hidden";
    popupCorrectionWrapper.classList.remove("display");
    body.style.overflow = "auto";
  });
}
/////////////////////////////////////////////////////////////
///// Écouter les événements sur popup_notation_close //////
const popupNotationClose = document.querySelector(".popup_notation_close");

if(popupNotationClose) {
  popupNotationClose.addEventListener("click", () => {
    popupNotation.classList.remove("anim_download");
    popupNotationWrapper.style.visibility = "hidden";
    popupNotationWrapper.classList.remove("display");
    body.style.overflow = "auto";
  });
}

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
    body.style.overflow = "auto";
  }
  if (
    !event.target.closest(".popup_correction") &&
    event.target.closest(".popup_correction_wrapper")
  ) {
    popupCorrection.classList.remove("anim_download");
    popupCorrectionWrapper.classList.remove("display");
    popupCorrectionWrapper.style.visibility = "hidden";
    body.style.overflow = "auto";
  }
  if (
    !event.target.closest(".popup_notation") &&
    event.target.closest(".popup_notation_wrapper")
  ) {
    popupNotation.classList.remove("anim_download");
    popupNotationWrapper.classList.remove("display");
    popupNotationWrapper.style.visibility = "hidden";
    body.style.overflow = "auto";
  }
});

////////////////////
///// Cookies //////
document.addEventListener("DOMContentLoaded", function() {
    function toggleBannerVisibility(show) {
        document.getElementById("cookie-banner").style.display = show ? "block" : "none";
        document.getElementById("manage-consent-btn").style.display = show ? "none" : "block";
    }

    if (!localStorage.getItem("cookieConsent")) {
        toggleBannerVisibility(true);
    } else {
        toggleBannerVisibility(false);
    }

    document.getElementById("accept-cookies").addEventListener("click", function() {
        let consent = {
            functional: true,
            preferences: true,
            statistics: true,
            marketing: true
        };
        localStorage.setItem("cookieConsent", JSON.stringify(consent));
        toggleBannerVisibility(false);
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({'event': 'cookie_consent', 'consent_status': consent});
    });

    document.getElementById("decline-cookies").addEventListener("click", function() {
        let consent = {
            functional: false,
            preferences: false,
            statistics: false,
            marketing: false
        };
        localStorage.setItem("cookieConsent", JSON.stringify(consent));
        toggleBannerVisibility(false);
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({'event': 'cookie_consent', 'consent_status': consent});
    });

    document.getElementById("save-preferences").addEventListener("click", function() {
        let consent = {
            functional: document.getElementById("functional-cookies").checked,
            preferences: document.getElementById("preferences-cookies").checked,
            statistics: document.getElementById("statistics-cookies").checked,
            marketing: document.getElementById("marketing-cookies").checked
        };
        localStorage.setItem("cookieConsent", JSON.stringify(consent));
        toggleBannerVisibility(false);
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({'event': 'cookie_consent', 'consent_status': consent});
    });

    document.querySelector(".close").addEventListener("click", function() {
        toggleBannerVisibility(false);
    });

    document.getElementById("manage-consent-btn").addEventListener("click", function() {
        toggleBannerVisibility(true);
    });
});

///////////////////// 
///// Flachcard /////
function toggleSize(element) {

  var buttons = document.querySelectorAll('.humeurs');
  buttons.forEach(function(btn) {
      btn.classList.remove('enlarged');
  });

  element.classList.toggle('enlarged');
}

document.getElementById('flashcards_card').addEventListener('mouseleave', function() {
  var flashcard = document.getElementById('flashcards_mask');
  flashcard.style.opacity = 1;
});

function removeBlur() {
  var flashcard = document.getElementById('flashcards_mask');
  flashcard.style.opacity = 0;
}

//////////////////
///// Tarifs /////
function changeCard() {
  const links = document.querySelectorAll('.outil_nav a');
  const navBackground = document.querySelector(".nav-background");
  const lightning_bg = document.getElementById("lightning_bg");
  const lightning_img = document.getElementById("lightning_img");
  const card_title = document.getElementById("card_title");
  const tarif = document.getElementById("tarif");
  const facturation = document.getElementById("facturation");
  const list_title = document.getElementById("list_title");
  const icon_check = document.querySelectorAll(".icon_check");
  const list_1 = document.getElementById("list_1");
  const list_2 = document.getElementById("list_2");
  const list_3 = document.getElementById("list_3");
  const list_4 = document.getElementById("list_4");
  const list_5 = document.getElementById("list_5");
  const outil_btn = document.getElementById("outil_btn");
  const outil_btn_img = document.getElementById("outil_btn_img");

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const linkWidth = this.offsetWidth;
      const linkLeftOffset = this.offsetLeft;
      navBackground.style.width = `${linkWidth}px`;
      navBackground.style.transform = `translateX(${linkLeftOffset}px)`;

      document
        .querySelector(".outil_nav a.active")
        ?.classList.remove("active");
      this.classList.add("active");

      const role = this.getAttribute("data-role");
      switch (role) {
        case "annuel":
          lightning_bg.style.background = "rgba(0, 122, 255, 0.35)";
          lightning_img.src = "img/icons/icon_lightning_blue.svg";
          card_title.textContent = "Perfusion 💉";
          tarif.textContent = "9.5€";
          facturation.textContent = "Facturé pour 12 mois";
          list_title.textContent = "Tout du pack STARTER 🤓, plus :";
          icon_check.forEach((icon) => {
            icon.src = "img/icons/icon_check_blue.svg";
          });
          list_1.textContent = "300+ cas conformes aux modalités officielles";
          list_2.textContent = "Accède à des corrections détaillées";
          list_3.textContent = "Crée des parties en tant que médecin";
          list_4.textContent = "Nouveaux cas ajoutés régulièrement";
          list_5.textContent = "Suis ton évolution";
          outil_btn.style.background = "#007AFF";
          outil_btn.style.color = "#fff"; 
          outil_btn_img.src = "img/icons/icon_arrow_top-right.svg";
          break;
        case "7_mois":
          lightning_bg.style.background = "rgba(151, 71, 255, 0.35)";
          lightning_img.src = "img/icons/icon_lightning_purple.svg";
          card_title.textContent = "Cappuccino ☕";
          tarif.textContent = "15.5€";
          facturation.textContent = "Facturé pour 7 mois";
          list_title.textContent = "Tout du pack PERFUSION 💉, plus :";
          icon_check.forEach((icon) => {
            icon.src = "img/icons/icon_check_purple.svg";
          });
          list_1.textContent = "300+ cas conformes aux modalités officielles";
          list_2.textContent = "Accède à des corrections détaillées";
          list_3.textContent = "Crée des parties en tant que médecin";
          list_4.textContent = "Nouveaux cas ajoutés régulièrement";
          list_5.textContent = "Suis ton évolution";
          outil_btn.style.background = "#9747FF";
          outil_btn.style.color = "#fff"; 
          outil_btn_img.src = "img/icons/icon_arrow_top-right.svg";
          break;
        case "5_mois":
          lightning_bg.style.background = "rgba(255, 203, 61, 0.35)";
          lightning_img.src = "img/icons/icon_lightning_yellow.svg";
          card_title.textContent = "Ristretto ☕️";
          tarif.textContent = "19.5€";
          facturation.textContent = "Facturé pour 5 mois";
          list_title.textContent = "Tout du pack CAPPUCCINO ☕, plus :";
          icon_check.forEach((icon) => {
            icon.src = "img/icons/icon_check_yellow.svg";
          });
          list_1.textContent = "300+ cas conformes aux modalités officielles";
          list_2.textContent = "Accède à des corrections détaillées";
          list_3.textContent = "Crée des parties en tant que médecin";
          list_4.textContent = "Nouveaux cas ajoutés régulièrement";
          list_5.textContent = "Suis ton évolution";
          outil_btn.style.background = "#FFCB3D";
          outil_btn.style.color = "#000"; 
          outil_btn_img.src = "img/icons/icon_top_right_blue.svg";
          break;
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  changeCard();
});

//click sur annuel au chargement
document.addEventListener("DOMContentLoaded", function () {
  const annuelTab = document.querySelector('[data-role="annuel"]');
  if (annuelTab) {
    annuelTab.click();
  }
});