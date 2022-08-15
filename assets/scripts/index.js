import { menuHandler } from "./menu.js";

const sketchElem = document.querySelector(".sketch");
const gridRangeElem = document.querySelector("#grid-range");
const menuItemTabElems = document.querySelectorAll(".menu-item-tab");
const colorOptionsElem = document.querySelector("#color-options");
const colorpickerElem = document.querySelector("#colorpicker");
const clearElem = document.querySelector("#clear-grid");
let gridCellCount = 10;
let colorMode = "default";
let colorpickerColor;

gridRangeElem.addEventListener("input", rangeHandler)
gridRangeElem.addEventListener("change", gridHandler)
clearElem.addEventListener("click", clearHandler)

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

function createGridElems() {
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

    enableDrawing(sketchElem)
}

function clearGrid() {
    while (sketchElem.firstChild) {
        sketchElem.firstChild.remove()
    }
}

function enableDrawing(grid) {
    const cells = grid.querySelectorAll(".cell");
    
    grid.addEventListener("mouseover", function (e) {
        cells.forEach(cell => {
            if (e.target === cell) {
                draw(cell)
            }
        })
    })
}

function draw(cell) {
    const currentBackgroundColor = window.getComputedStyle(cell).getPropertyValue("background-color");
    let newBackgroundColor;
    let colors = currentBackgroundColor.slice(currentBackgroundColor.indexOf("(") + 1, -1).split(",");
    colors = colors.map(color => parseFloat(color.replace(" ", "")));

    // computed style includes 0 as alpha channel if background-color not set
    // and removes value if set to 1

    if (colorMode === "default" && colors.length !== 3) {
        const alpha = colors[3] + 0.1;
        newBackgroundColor = `rgba(${colors[0]}, ${colors[1]}, ${colors[2]}, ${alpha})`;
    } else if (colorMode === "rainbow") {
        newBackgroundColor = `rgb(${getRandomRGBValue()}, ${getRandomRGBValue()}, ${getRandomRGBValue()})`;
    } else {
        newBackgroundColor = colorpickerColor || "black";
        console.log(newBackgroundColor)
    }

    cell.style.backgroundColor = newBackgroundColor;
}

function getRandomRGBValue() {
    return Math.floor(Math.random() * 256)
}

colorOptionsElem.addEventListener("change", updateColorMode)

function updateColorMode() {
    const selectedOption = this.value;
    const colorpickerElem = document.querySelector("#colorpicker");
    
    if (selectedOption !== "colorpicker") {
        colorpickerElem.classList.add("hidden");
    }

    switch (selectedOption) {
        case "colorpicker":
            colorpickerElem.classList.remove("hidden")
            colorMode = "colorpicker";
            break;
        case "default":
            colorMode = "default";
            break;
        case "rainbow":
            colorMode = "rainbow";
            break;
    }

    createGridElems(gridCellCount)
}

colorpickerElem.addEventListener("change", getColorpickerColor)

function getColorpickerColor() {
    colorpickerColor = this.value;
}

function clearHandler() {
    clearGrid()
    createGridElems(gridCellCount)
}