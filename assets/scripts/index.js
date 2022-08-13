import { menuHandler } from "./menu.js";

const sketchElem = document.querySelector(".sketch");
const gridRangeElem = document.querySelector("#grid-range");
const menuItemTabElems = document.querySelectorAll(".menu-item-tab");

gridRangeElem.addEventListener("input", rangeHandler)
gridRangeElem.addEventListener("change", gridHandler)
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

function gridHandler() {
    createGridElems()
}

function createGridElems(gridCellCount = 10) {
    let cells = gridCellCount;
    cells **= 2;
    clearGrid()
    const grid = document.createDocumentFragment();

    while (cells) {
        const cell = document.createElement("div");
        cell.classList.add("cell")
        grid.append(cell)
        --cells
    }

    sketchElem.append(grid)
}

function clearGrid() {
    while (sketchElem.firstChild) {
        sketchElem.firstChild.remove()
    }
}