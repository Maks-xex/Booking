"use strict";

const form = document.querySelector(".notice__form");

function activationForm(disabled) {
  const result = [...form.elements];
  if (!disabled) {
    result.forEach((el) => {
      el.removeAttribute("disabled");
    });
    return;
  }
  result.forEach((el) => {
    el.setAttribute("disabled", disabled);
  });
}
activationForm(true);

form.addEventListener("submit", function () {
  window.upload(
    new FormData(form),
    function (response) {
      mapCard.classList.add("map--faded");
      mapPinsArray.forEach((it, i) => {
        mapCard
          .querySelector(".map__pin:nth-of-type(" + (i + 1) + ")")
          .classList.add("hidden");
      });
      form.classList.add("notice__form--disabled");
      activationForm();
    },
  );
});
