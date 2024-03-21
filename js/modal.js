///////////////////////////////////////
///// Evénements sur btnDownload /////
const allBtnDownload = document.querySelectorAll(".btn_blue");
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
    if (window.innerWidth < 768) {
      body.style.overflow = "auto";
    }
  });
});
/*
//document.addEventListener("DOMContentLoaded", function() {
  allBtnDownload.forEach((btnDownload) => {
  const userAgent = navigator.userAgent || window.opera;

  // Sélectionnez l'élément lien
  //const downloadLink = document.getElementById('downloadApp');

/*
  // Vérifiez si l'utilisateur est sur iOS
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    btnDownload.href = 'https://apps.apple.com/fr/app/ecos-alpha/id6477926660?l=en-GB';
  }
  // Vérifiez si l'utilisateur est sur Android
  else if (/android/i.test(userAgent)) {
    btnDownload.href = 'https://play.google.com/store/apps/details?id=com.ecosalpha.app&pcampaignid=web_share';
  }
  // Si ni iOS ni Android, vous pouvez définir un lien par défaut ou le laisser inchangé
  else {
    btnDownload.href = '#'; // Ou un lien par défaut
  }
});
*/

document.addEventListener("DOMContentLoaded", function() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // Sélectionnez l'élément lien
  var downloadLink = document.getElementById('btn-blue');

  // Vérifiez si l'utilisateur est sur iOS
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    downloadLink.href = 'https://lien-vers-appstore';
  }
  // Vérifiez si l'utilisateur est sur Android
  else if (/android/i.test(userAgent)) {
    downloadLink.href = 'https://lien-vers-playstore';
  }
  // Si ni iOS ni Android, vous pouvez définir un lien par défaut ou le laisser inchangé
  else {
    downloadLink.href = '#'; // Ou un lien par défaut
  }
});
//});
///////////////////////////////////////////////////////
///// Écouter les événements sur btn modal_close /////
const closeModal = document.querySelector(".modal_close");

closeModal.addEventListener("click", () => {
  modal.classList.remove("anim_download");
  modalDownloadWrapper.style.visibility = "hidden";
  modalDownloadWrapper.classList.remove("display");
  body.style.overflow = "auto";
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
