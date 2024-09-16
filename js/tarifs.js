const { scrollTop, clientHeight } = document.documentElement;
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

/* avis */
window.addEventListener("load", () => {
    const avis = document.getElementById("avis");  
    avis.style.opacity = 1;
    avis.style.marginBottom = "200px";
});

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
    const icon_check = document.querySelectorAll(".icon_check");
    const outil_btn = document.getElementById("outil_btn");
    const outil_btn_img = document.getElementById("outil_btn_img");
  
    links.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
  
        const linkWidth = this.offsetWidth;
        const linkLeftOffset = this.offsetLeft;
        navBackground.style.width = `${linkWidth}px`;
        navBackground.style.transform = `translateX(${linkLeftOffset}px)`;
  
        document.querySelector(".outil_nav a.active")
          ?.classList.remove("active");
        this.classList.add("active");
  
        const role = this.getAttribute("data-role");
        switch (role) {
          case "annuel":
            lightning_bg.style.background = "rgba(0, 122, 255, 0.35)";
            lightning_img.src = "../img/icons/icon_lightning_blue.svg";
            card_title.textContent = "Perfusion 💉";
            tarif.textContent = "9.5€";
            facturation.textContent = "Facturé pour 12 mois";
            icon_check.forEach((icon) => {
              icon.src = "../img/icons/icon_check_blue.svg";
            });
            outil_btn.style.background = "#007AFF";
            outil_btn.style.color = "#fff"; 
            outil_btn_img.src = "../img/icons/icon_arrow_top-right.svg";
            break;
          case "5_mois":
            lightning_bg.style.background = "rgba(255, 203, 61, 0.35)";
            lightning_img.src = "../img/icons/icon_lightning_yellow.svg";
            card_title.textContent = "Urgence 💉";
            tarif.textContent = "19.58€";
            facturation.textContent = "Sans engagement";
            icon_check.forEach((icon) => {
              icon.src = "../img/icons/icon_check_yellow.svg";
            });
            outil_btn.style.background = "#FFCB3D";
            outil_btn.style.color = "#000"; 
            outil_btn_img.src = "../img/icons/icon_top_right_blue.svg";
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