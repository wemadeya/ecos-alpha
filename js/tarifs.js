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
            list_title.textContent = "Tout du pack STARTER 🤓, plus :";
            icon_check.forEach((icon) => {
              icon.src = "../img/icons/icon_check_blue.svg";
            });
            list_1.textContent = "300+ cas conformes aux modalités officielles";
            list_2.textContent = "Accède à des corrections détaillées";
            list_3.textContent = "Crée des parties en tant que médecin";
            list_4.textContent = "Nouveaux cas ajoutés régulièrement";
            list_5.textContent = "Suis ton évolution";
            outil_btn.style.background = "#007AFF";
            outil_btn.style.color = "#fff"; 
            outil_btn_img.src = "../img/icons/icon_arrow_top-right.svg";
            break;
          case "7_mois":
            lightning_bg.style.background = "rgba(151, 71, 255, 0.35)";
            lightning_img.src = "../img/icons/icon_lightning_purple.svg";
            card_title.textContent = "Cappuccino ☕";
            tarif.textContent = "15.5€";
            facturation.textContent = "Facturé pour 7 mois";
            list_title.textContent = "Tout du pack PERFUSION 💉, plus :";
            icon_check.forEach((icon) => {
              icon.src = "../img/icons/icon_check_purple.svg";
            });
            list_1.textContent = "300+ cas conformes aux modalités officielles";
            list_2.textContent = "Accède à des corrections détaillées";
            list_3.textContent = "Crée des parties en tant que médecin";
            list_4.textContent = "Nouveaux cas ajoutés régulièrement";
            list_5.textContent = "Suis ton évolution";
            outil_btn.style.background = "#9747FF";
            outil_btn.style.color = "#fff"; 
            outil_btn_img.src = "../img/icons/icon_arrow_top-right.svg";
            break;
          case "5_mois":
            lightning_bg.style.background = "rgba(255, 203, 61, 0.35)";
            lightning_img.src = "../img/icons/icon_lightning_yellow.svg";
            card_title.textContent = "Ristretto ☕️";
            tarif.textContent = "19.5€";
            facturation.textContent = "Facturé pour 5 mois";
            list_title.textContent = "Tout du pack CAPPUCCINO ☕, plus :";
            icon_check.forEach((icon) => {
              icon.src = "../img/icons/icon_check_yellow.svg";
            });
            list_1.textContent = "300+ cas conformes aux modalités officielles";
            list_2.textContent = "Accède à des corrections détaillées";
            list_3.textContent = "Crée des parties en tant que médecin";
            list_4.textContent = "Nouveaux cas ajoutés régulièrement";
            list_5.textContent = "Suis ton évolution";
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