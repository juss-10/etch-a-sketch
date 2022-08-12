const menuContainerElem = document.querySelector(".menu-container");
const menuItemTabElems = document.querySelectorAll(".menu-item-tab");

menuItemTabElems.forEach(menuItemElem => menuItemElem.addEventListener("click", menuHandler))

function menuHandler() {
    const menuToggleElem = menuItemTabElems[0];
    const currentSubmenuElem = this.parentElement.querySelector(".submenu");
    const submenuElems = document.querySelectorAll(".submenu");
    const hasSubmenuElem = this.parentElement.contains(currentSubmenuElem);
    const isOpened = menuContainerElem.classList.contains("open-menu");

    if (isOpened && this === menuToggleElem) {
        submenuElems.forEach(submenu =>
            submenu.className = "submenu hidden"
        )

        toggleMenu()
    } else if (isOpened && hasSubmenuElem) {
        currentSubmenuElem.classList.toggle("hidden");
    } else if (hasSubmenuElem) {
        this.parentElement.querySelector(".submenu").classList.toggle("hidden");
        toggleMenu()
    } else if (this === menuToggleElem) {
        toggleMenu()
    }
    
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