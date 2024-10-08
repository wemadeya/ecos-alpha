const { scrollTop, clientHeight } = document.documentElement;
////////////////////
///// Tuto ////////
document.addEventListener('DOMContentLoaded', function() { 
  const allTitle = document.querySelectorAll(".title");
  const allDescription = document.querySelectorAll(".description");
  let interval = null; // Stocke l'intervalle pour le cycle automatique
  let currentIndex = 0; // Index global de l'élément actif


  // Fonction pour activer un titre et sa description correspondante
  function activateTitle(index) {
    allTitle.forEach((title, i) => {
      title.classList.remove("active");
      const timerBar = title.querySelector(".timer_bar");
      if (timerBar) {
        timerBar.classList.remove("active");
      }
    });
    allDescription.forEach(description => description.classList.remove("active"));

    allTitle[index].classList.add("active");
    const timerBar = allTitle[index].querySelector(".timer_bar");
    if (timerBar) {
      timerBar.classList.add("active");
    }
    allDescription[index].classList.add("active");
  }

  // Fonction pour passer à l'élément suivant
  function nextTitle() {
    currentIndex = (currentIndex + 1) % allTitle.length;
    activateTitle(currentIndex);
  }

  // Fonction pour démarrer ou redémarrer le cycle automatique
  function startAutoCycle() {
    clearInterval(interval); // Assurez-vous qu'aucun intervalle précédent ne soit actif
    interval = setInterval(nextTitle, 5000); // Démarrer un intervalle de 5 secondes
  }

  // Fonction pour gérer le clic manuel
  function handleTitleClick(index) {
    clearInterval(interval); // Arrêter le cycle automatique en cas de clic manuel
    currentIndex = index; // Mettre à jour l'index courant
    activateTitle(currentIndex); // Activer l'élément cliqué

    // Redémarrer un nouvel intervalle de 5 secondes après le clic
    startAutoCycle();
  }

  // Ajouter l'événement de clic à chaque titre
  allTitle.forEach((title, index) => {
    title.addEventListener('click', () => handleTitleClick(index));
  });

  // Initialiser la première activation et démarrer le cycle automatique
  activateTitle(currentIndex);
  startAutoCycle();
});

/////////////////////////////////////
///////// accordion mobile /////////

const accordionItems = document.querySelectorAll(".accordion-item");
const accordionItemTitles = document.querySelectorAll(".accordion_item_title");
let currentAccordionIndex = 0;
//let interval; // Pour stocker l'intervalle global

// Fonction pour activer un élément d'accordéon et son texte
function activateAccordionItem(index) {

  // Supprimer la classe 'active' de tous les items, timer_bars et fermer les textes
  accordionItems.forEach(item => {
    const title = item.querySelector(".accordion_item_title");
    const text = item.querySelector(".accordion-item-text");
    const timerBar = item.querySelector(".timer_bar");
    const TimerBarGrey = item.querySelector(".timer_bar_grey");

    title.classList.remove("active");
    text.style.maxHeight = 0; // Fermer le texte
    if (timerBar) {
      timerBar.classList.remove("active"); // Désactiver le timer_bar
      TimerBarGrey.classList.remove("active");
      item.classList.remove("active");
    }
  });

  // Ajouter la classe 'active' au nouvel item, ouvrir le texte et activer le timer_bar
  const currentItem = accordionItems[index];
  const currentTitle = currentItem.querySelector(".accordion_item_title");
  const currentText = currentItem.querySelector(".accordion-item-text");
  const currentTimerBar = currentItem.querySelector(".timer_bar");
  const currentTimerBarGrey = currentItem.querySelector(".timer_bar_grey");

  currentTitle.classList.add("active");
  currentText.style.maxHeight = currentText.scrollHeight + "px"; // Ouvrir le texte
  if (currentTimerBar) {
    currentTimerBar.classList.add("active"); // Activer le timer_bar
    currentTimerBarGrey.classList.add("active");
    currentItem.classList.add("active");
  }
}

// Fonction pour passer à l'élément suivant avec le timer
function nextAccordionItem() {
  currentAccordionIndex = (currentAccordionIndex + 1) % accordionItems.length; // Boucle au début
  activateAccordionItem(currentAccordionIndex);
}

// Ajouter l'événement de clic à chaque titre pour ouvrir/fermer manuellement
accordionItemTitles.forEach((accordionItemTitle, index) => {
  accordionItemTitle.addEventListener("click", () => {
    clearInterval(interval); // Arrêter le cycle automatique en cas de clic manuel
    currentAccordionIndex = index; // Mettre à jour l'index courant
    activateAccordionItem(currentAccordionIndex); // Activer l'élément cliqué
    interval = setInterval(nextAccordionItem, 5000); // Redémarrer le cycle automatique après clic

  });
});

// Initialiser la première activation avec timer_bar
activateAccordionItem(currentAccordionIndex);

// Démarrer le cycle automatique avec un intervalle
interval = setInterval(nextAccordionItem, 5000);



////////////////////
///// carousel /////
document.addEventListener('DOMContentLoaded', function () {
  new Splide('#avis_carousel', {
      type: 'loop',
      perPage: 2,
      perMove: 1,
      autoplay: true,
      interval: 3000, 
      gap    : '20px', 
      trimSpace: false,
      pagination: false,
      breakpoints: {
          1280: {
              perPage: 1,
              focus  : 'center',
              

          }
      }
  }).mount();
});

////////////////////////
///// scroll event /////
window.addEventListener("scroll", () => {
  /* conception */
  const conceptionContentMobile1 = document.querySelector(".conception_mobile_content_1");
  const conceptionContentMobile2 = document.querySelector(".conception_mobile_content_2");
  const conceptionContentMobile3 = document.querySelector(".conception_mobile_content_3");
  const allConceptionContent = [
    conceptionContentMobile1,
    conceptionContentMobile2,
    conceptionContentMobile3
  ];

  allConceptionContent.forEach((conceptionContent) => {
    if (conceptionContent) {
      const conceptionContentTop = conceptionContent.getBoundingClientRect().top;
      if (scrollTop > conceptionContentTop - clientHeight * 0.8) {
        conceptionContent.classList.add("anim-x");
      }
    }
  });

  /* avis */
  const avis = document.getElementById("avis");
  const avisTop = avis.getBoundingClientRect().top;
  if (scrollTop > scrollTop + avisTop - clientHeight * 0.8) {
    avis.classList.add("anim-y-both");
  }


  /* tuto */
  const tuto = document.querySelector(".tuto");
  const tutoTop = tuto.getBoundingClientRect().top;
  if (scrollTop > scrollTop + tutoTop - clientHeight * 0.8) {
    tuto.classList.add("anim-y-both");
  }

  const allAccordionItem = document.querySelectorAll(".accordion-item");
  allAccordionItem.forEach((accordionItem) => {
    if (accordionItem) {
      const accordionItemTop = accordionItem.getBoundingClientRect().top;
      if (scrollTop > accordionItemTop - clientHeight * 1) {
        accordionItem.classList.add("anim-y-both");
      }
    }
  });

  /* parcours_card */
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
  /* simulateur */
  const simulateurTextWrapper = document.querySelector(".simulateur_text_wrapper");
  const simulateurContent1 = document.querySelector(".simulateur_content_1");
  const simulateurContent2 = document.querySelector(".simulateur_content_2");

  const simulateurTextWrapperTop = simulateurTextWrapper.getBoundingClientRect().top;
  if (scrollTop > scrollTop + simulateurTextWrapperTop - clientHeight * 0.8) {
    simulateurContent1.classList.add("anim-y");
    simulateurContent2.classList.add("anim-y");
  }


});


///////////////////////////////////////////////////////////////
///// Animation: Il vous reste des questions - accordeon /////

///////////////////////////////
///// conception_content /////
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
const allOutilBtn = document.querySelectorAll(".outil_btn");
const parcoursBtnDownload = document.querySelectorAll(".parcours_phase_btn");
const modalDownloadWrapper = document.querySelector(".modal_download_wrapper");
const modal = document.querySelector(".modal_download");
const body = document.querySelector("body");

allBtnDownload.forEach((btnDownload) => {
  btnDownload.addEventListener("click", () => {
    modalDownloadWrapper.style.visibility = "visible";
    modalDownloadWrapper.classList.add("display");
    modal.classList.add("anim_download");
    body.style.overflow = "hidden";
  });
});

allOutilBtn.forEach((outilBtn) => {
  outilBtn.addEventListener("click", () => {
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
      removeBlur();
  });
  element.classList.toggle('enlarged');
}

document.getElementById('flashcards_card').addEventListener('mouseleave', function() {
  var flashcard = document.getElementById('flashcards_mask');
  var text = document.getElementById('flashcards_btn_text');
  flashcard.classList.remove('opacity');
  text.innerHTML = 'Afficher la réponse';
});

function toggleBlur() {
  var flashcard = document.getElementById('flashcards_mask');
  var text = document.getElementById('flashcards_btn_text');

  if (flashcard.classList.contains('opacity')) {
      flashcard.classList.remove('opacity');
      text.innerHTML = 'Afficher la réponse';
  } else {
      flashcard.classList.add('opacity');
      text.innerHTML = 'Masquer la réponse';
  }
}

function removeBlur() {
  var flashcard = document.getElementById('flashcards_mask');
  var text = document.getElementById('flashcards_btn_text');
  flashcard.classList.add('opacity');
  text.innerHTML = 'Masquer la réponse';
}