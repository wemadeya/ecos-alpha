///////////////////////////
///// menu hamburger /////
const menuHamburger = document.querySelector(".menu_hamburger");
const headerNav = document.querySelector(".header_nav");
const headerNavWrapper = document.querySelector(".header_nav_wrapper");
const menuHamburgerLign1 = document.querySelector(".menu_hamburger_lign1");
const menuHamburgerLign2 = document.querySelector(".menu_hamburger_lign2");
const menuHamburgerLign3 = document.querySelector(".menu_hamburger_lign3");
const plusieurs = document.querySelectorAll(".plusieurs");

plusieurs.forEach((plusieurs) => {
  plusieurs.addEventListener('click', () => {
    headerNav.classList.remove("show");
    headerNavWrapper.classList.remove("show");

    menuHamburgerLign1.classList.remove("anim");
    menuHamburgerLign2.classList.remove("anim");
    menuHamburgerLign3.classList.remove("anim");
  })
})

menuHamburger.addEventListener('click', () => {
  headerNav.classList.toggle("show");
  headerNavWrapper.classList.toggle("show");

  menuHamburgerLign1.classList.toggle("anim");
  menuHamburgerLign2.classList.toggle("anim");
  menuHamburgerLign3.classList.toggle("anim");
});
