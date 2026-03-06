export function initToolTips(){
  const display = document.getElementById('members-display');

  display.addEventListener("mouseover", function (e){
    const target = e.target.closest(".tooltip");
    if (target) {
      const tooltipText = target.querySelector(".tooltiptext");
      if(tooltipText)
        tooltipText.style.visibility = "visible";
    }
  });
  
  display.addEventListener("mouseout", function (e) {
    const target = e.target.closest(".tooltip");
    if(target){
      const tooltipText = target.querySelector(".tooltiptext");
      if(tooltipText)
        tooltipText.style.visibility = "hidden";
    }
  });
}
