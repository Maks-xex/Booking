"use strict";
function activationForm (SET_ATTRIBUTE){
    const select = document.getElementsByTagName('select');
    const INPUT = document.getElementsByTagName('input');
    switch (SET_ATTRIBUTE) {
        case "disabled":
            SET_ATTRIBUTE = "disabled"
            break;
        case "enabled":
            for( let i = 0; i < INPUT.length; i++ ){
                INPUT[i].removeAttribute("disabled","disabled");
            }
            for( let i = 0; i < select.length; i++ ){
                select[i].removeAttribute("disabled","disabled");
            }
            document.querySelector('textarea').removeAttribute("disabled","disabled");
            document.querySelector('.form__submit').removeAttribute("disabled","disabled");
            document.querySelector('.form__reset').removeAttribute("disabled","disabled");
            break;
        default :
            SET_ATTRIBUTE = "disabled";
            break;
    }
    for( let i = 0; i < INPUT.length; i++ ){
        INPUT[i].setAttribute(""+SET_ATTRIBUTE+"",""+SET_ATTRIBUTE+"");
    }
    for( let i = 0; i < select.length; i++ ){
        select[i].setAttribute(""+SET_ATTRIBUTE+"",""+SET_ATTRIBUTE+"");
    }
    document.querySelector('textarea').setAttribute(""+SET_ATTRIBUTE+"",""+SET_ATTRIBUTE+"");
    document.querySelector('.form__submit').setAttribute(""+SET_ATTRIBUTE+"",""+SET_ATTRIBUTE+"");
    document.querySelector('.form__reset').setAttribute(""+SET_ATTRIBUTE+"",""+SET_ATTRIBUTE+"");
}
activationForm("disabled");

const form = document.querySelector(".notice__form");
form.addEventListener("submit", function(e) {
    window.upload(new FormData(form), function (response){
        mapCard.classList.add('map--faded');
        for(let i = 1; i < 9; i++){
            mapCard.querySelector('.map__pin:nth-of-type(' + (i + 1) + ')').classList.add('hidden');
        }
        form.classList.add("notice__form--disabled");
        activationForm("disabled");
    }, errorHandler);
    e.preventDefault();
});