const elementSelect = document.getElementById("element-select");
const appearanceSelect = document.getElementById("appearance-select");

let elements = [];
let selectedElement = null;

/**
 * Refresh the element select menu to reflect the current DOM.
 * Called on DOMContentLoaded and whenever page content is updated.
 */
function refreshElementSelect() {
    elementSelect.innerHTML =
        "<option value=\"\" disabled selected>Choose element</option>";

    elements = document.querySelectorAll("body, article, section");
    elements.forEach((elem, index) => {
        const option = document.createElement("option");
        option.value = index.toString();
        option.textContent = elem.tagName;
        elementSelect.appendChild(option);
    });

    selectedElement = null;
    appearanceSelect.value = "";
}

window.refreshElementSelect = refreshElementSelect;

elementSelect.addEventListener("change", (event) => {
    const index = parseInt(event.target.value);
    selectedElement = elements[index];
});

appearanceSelect.addEventListener("change", (event) => {
    if (!selectedElement) {
        alert("Please select an element first.");
        return;
    }

    const value = event.target.value;
    if (value === "font-size") {
        const newSize = prompt("Enter font size (e.g., 16px):");
        if (newSize) {
            selectedElement.style.fontSize = newSize;
            selectedElement.querySelectorAll("*").forEach((child) => {
                child.style.fontSize = newSize;
            });
        }
    } else if (value === "font-color") {
        const newColor = prompt("Enter font color (e.g., red or #ff0000):");
        if (newColor) {
            selectedElement.style.color = newColor;
            selectedElement.querySelectorAll("*").forEach((child) => {
                child.style.color = newColor;
            });
        }
    }

    elementSelect.value = "";
    appearanceSelect.value = "";
});

document.addEventListener("DOMContentLoaded", refreshElementSelect);
