document.addEventListener("DOMContentLoaded", () => {
    // retrieve menu elements
    const elementSelect = document.getElementById("element-select");
    const appearanceSelect = document.getElementById("appearance-select");

    // populate element select menu
    const elements = document.querySelectorAll("body, article, section");
    elements.forEach((el, index) => {
        const option = document.createElement("option");
        option.value = index.toString();
        option.textContent = el.tagName;
        elementSelect.appendChild(option);
    });

    let selectedElement = null;

    // element selection
    elementSelect.addEventListener("change", (event) => {
        const index = parseInt(event.target.value);
        selectedElement = elements[index];
    });

    // appearance modification
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

        // reset menu
        elementSelect.value = "";
        appearanceSelect.value = "";
    });
});
