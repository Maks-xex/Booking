"use strict";

window.renderMapInformation = function(Map) {
    mapCardTemplate.classList.add('hidden');
    let templateElement = mapCardTemplate.cloneNode(true);
    templateElement.querySelectorAll('.popup__features li').forEach(function (e){
        e.remove();
    });
    try {
        for(let i = 0; i < Map.offer.features.length; i++) {
            const newElement  = document.createElement('li');
            templateElement.querySelector('.popup__features').appendChild(newElement).className = "feature "+classToValue[Map.offer.features[i]];
        }
    }
    catch{}
    try {
        for(let i = 0; i < Map.offer.photos.length; i++) {
            templateElement.querySelector('.popup__pictures img:nth-of-type('+(i+1)+')').src = Map.offer.photos[i];
        }
    }
    catch {}
    templateElement.querySelector('.popup__avatar').src = Map.author.avatar;
    templateElement.querySelector('.popup__title').textContent = Map.offer.title;
    templateElement.querySelector('.popup__text--price').textContent = Map.offer.price;
    templateElement.querySelector('.popup__type').textContent = valueTypeMap[Map.offer.type];
    templateElement.querySelector('.popup__text--capacity').textContent = Map.offer.rooms + " комнаты для " + Map.offer.guests + " гостей";
    templateElement.querySelector('.popup__text--time').textContent = "Заезд после " + Map.offer.checkin + ", выезд до " + Map.offer.checkout;
    templateElement.querySelector('.popup__description').textContent = Map.offer.description;
    // newElement.className = "feature "+classToValue[Map.offer.features[0]];[

            templateElement.querySelector('.popup__close').addEventListener("click", function (e) {
            e.preventDefault();
            templateElement.classList.add('hidden');
            document.querySelector('#address').value = null;
        });
        return templateElement;
}

//rendering map icon
window.renderMapIcon = function (Map, i) {
    let mapElement = similarMapPin.cloneNode(true);
    if(mapCard.classList.contains("map--faded")) {
        mapElement.classList.add('hidden');
    }
    mapElement.classList.remove('map__pin--main');
    mapElement.querySelector('svg').remove();
    mapElement.style = "top:"+getRandomArbitrary(150,600)+"px; left:"+getRandomArbitrary(5,95)+"%;";
    mapElement.querySelector('.map__pin img').style = "cursor:pointer";
    mapElement.querySelector('.map__pin img').src = Map.author.avatar;
    mapElement.querySelector('.map__pin img').alt = Map.offer.title;
    mapElement.addEventListener("click", function (e) {
        e.preventDefault();
        for(let i = 0; i < 8; i++) {
            try {
            mapCard.querySelector('.popup:nth-of-type(' + (i + 1) + ')').classList.add('hidden');
            }catch{}
        }
        if (similarMapPin[i] === mapCardTemplate[i]) {
            mapCard.querySelector('.popup:nth-of-type(' + (i + 1) + ')').classList.remove('hidden');
            document.querySelector('#address').value = Map.location.lat + " " + Map.location.lng;
        }
    });
    mapPinMain.addEventListener('mouseup', function (e) {
        e.preventDefault();
        mapCard.classList.remove('map--faded');
        mapElement.classList.remove('hidden');
        document.querySelector('.notice__form').classList.remove('notice__form--disabled');
        activationForm("enabled");
    });
    return mapElement;
}
window.render = function(data) {
    for (let i = 0; i < 8; i++) {
        try {
            mapPins.appendChild(renderMapIcon(data[i], i));
            mapPins.appendChild(renderMapInformation(data[i]));
        }catch{}
    }
}
