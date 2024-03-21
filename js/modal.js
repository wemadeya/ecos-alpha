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
      btnDownload.href = "hello"
    }
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
