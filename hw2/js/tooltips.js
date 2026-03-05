function showTooltip(id) {
  var tooltip = document.getElementById(id).querySelector(".tooltiptext");
  tooltip.style.visibility = "visible";
}

function hideTooltip(id) {
  var tooltip = document.getElementById(id).querySelector(".tooltiptext");
  tooltip.style.visibility = "hidden";
}

function registerEvents() {
  [
    "cs2",
    "ea",
    "fn",
    "halo",
    "pubg",
    "pubg__mobile",
    "r6s",
    "apex",
    "smash__bros",
  ].forEach((id) => {
    const game = document.getElementById(id);
    game.addEventListener("mouseover", function () {
      showTooltip(id);
    });
    game.addEventListener("mouseout", function () {
      hideTooltip(id);
    });
  });
}

window.addEventListener("load", registerEvents);
