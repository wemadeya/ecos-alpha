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