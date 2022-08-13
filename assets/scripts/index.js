import { menuHandler } from "./menu.js";

const sketchElem = document.querySelector(".sketch");
const gridRangeElem = document.querySelector("#grid-range");
const menuItemTabElems = document.querySelectorAll(".menu-item-tab");
let gridCellCount = 10;

gridRangeElem.addEventListener("input", rangeHandler)
gridRangeElem.addEventListener("change", gridHandler)
menuItemTabElems.forEach(menuItemElem => menuItemElem.addEventListener("click", menuHandler))
createGridElems(gridCellCount)

function rangeHandler() {
    gridCellCount = this.value;
    updateRangeText(gridCellCount)
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
    updateGridSize(gridCellCount)
    createGridElems(gridCellCount)
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