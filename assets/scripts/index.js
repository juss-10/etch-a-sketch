const sketchElem = document.querySelector(".sketch");
const gridRangeElem = document.querySelector("#grid-range");
const menuContainerElem = document.querySelector(".menu-container");
const menuItemTabElems = document.querySelectorAll(".menu-item-tab");

gridRangeElem.addEventListener("input", rangeHandler)
menuItemTabElems.forEach(menuItemElem => menuItemElem.addEventListener("click", menuHandler))

function rangeHandler() {
    updateRangeText(this.value)
    updateGridSize(this.value)
}

function updateRangeText(value) {
    const gridRangeTextElem = document.querySelector("#grid-range-text");
    gridRangeTextElem.textContent = `Grid size: ${value}`;
}

function updateGridSize(gridCellCount) {
    sketchElem.style.cssText = `
        grid-template-columns: repeat(${gridCellCount}, ${100 / gridCellCount}%);
        grid-template-rows: repeat(${gridCellCount}, ${100 / gridCellCount}%)
    `;
}

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