"use strict";

const form = document.querySelector(".notice__form");

function activationForm (disabled) {
    const result = [...form.elements];
    if(!disabled){
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

form.addEventListener("submit", function(e) {
    window.upload(new FormData(form), function (response){
        mapCard.classList.add('map--faded');
        for(let i = 1; i < 9; i++){
            mapCard.querySelector('.map__pin:nth-of-type(' + (i + 1) + ')').classList.add('hidden');
        }
        form.classList.add("notice__form--disabled");
        activationForm();
    }, errorHandler);
    e.preventDefault();
});