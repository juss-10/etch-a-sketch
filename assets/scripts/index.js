const menuContainerElem = document.querySelector(".menu-container");
const menuItemTabElems = document.querySelectorAll(".menu-item-tab");

menuItemTabElems.forEach(menuItemElem => menuItemElem.addEventListener("click", toggleMenu))

function getDocumentWidth() {
    return document.documentElement.clientWidth;
}

function toggleMenu() {
    toggleMobileMenu()
    toggleDesktopMenu()
}

function toggleMobileMenu() {
    menuItemTabElems.forEach(tabElem =>
        tabElem.parentElement.classList.toggle("visible")
    )
}

function toggleDesktopMenu() {
    if (menuContainerElem.classList.contains("open-menu")) {
        closeMenu()
    } else {
        openMenu()
    }
}

function openMenu() {
    menuContainerElem.classList.remove("close-menu")
    menuContainerElem.classList.add("open-menu")
}

function closeMenu() {
    menuContainerElem.classList.remove("open-menu")
    menuContainerElem.classList.add("close-menu")
}