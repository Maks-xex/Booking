//объявление массивов для объектов
let checkinArray = ['12:00', '13:00', '14:00'];
let typeArray = ['palace', 'flat', 'house', 'bungalo'];
let titleArray = ["Большая уютная квартира", "Маленькая неуютная квартира",  "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик",  "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря",  "Неуютное бунгало по колено в воде"];

function getRandomArbitrary(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
function valueType(Type) {
    switch (Type) {
        case "flat":
            return "Квартира";
        case "palace":
            return "Дворец";
        case "bungalo":
            return"Бунгало";
        case "house":
            return"Дом";
    }
}
function activationForm (SET_ATTRIBUTE){
    let Select = document.getElementsByTagName('select');
    let INPUT = document.getElementsByTagName('input');
    switch (SET_ATTRIBUTE) {
        case "disabled":
            SET_ATTRIBUTE = "disabled"
            break;
        case "enabled":
            for( let i = 0; i < INPUT.length; i++ ){
                INPUT[i].removeAttribute("disabled","disabled");
            }
            for( let i = 0; i < Select.length; i++ ){
                Select[i].removeAttribute("disabled","disabled");
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
    for( let i = 0; i < Select.length; i++ ){
        Select[i].setAttribute(""+SET_ATTRIBUTE+"",""+SET_ATTRIBUTE+"");
    }
    document.querySelector('textarea').setAttribute(""+SET_ATTRIBUTE+"",""+SET_ATTRIBUTE+"");
    document.querySelector('.form__submit').setAttribute(""+SET_ATTRIBUTE+"",""+SET_ATTRIBUTE+"");
    document.querySelector('.form__reset').setAttribute(""+SET_ATTRIBUTE+"",""+SET_ATTRIBUTE+"");
}
activationForm("disabled");
//создание массива и генерация объектов
let Map =[];
for(let i = 0; i < 8 ; i++){
    Map[i] =  {
        author : {
            avatar: "img/avatars/user0"+(i+1)+".png"
        },
        offer : {
            title : titleArray[getRandomArbitrary(0, titleArray.length - 1)],
            address : "top:"+getRandomArbitrary(150,600)+"px; left:"+getRandomArbitrary(5,95)+"%;",
            price : getRandomArbitrary(1000, 10000) + " \u20BD/ночь",
            type : typeArray[getRandomArbitrary(0, typeArray.length - 1)],
            rooms : getRandomArbitrary(1, 5),
            guests : getRandomArbitrary(0, 10),
            checkin : checkinArray[getRandomArbitrary(0, checkinArray.length - 1)],
            checkout : checkinArray[getRandomArbitrary(0, checkinArray.length - 1)],
            features : ["wifi".length, 'dishwasher'.length, 'parking'.length, 'washer'.length, 'elevator'.length, 'conditioner'.length],
            description: '',
            photos : ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
        },
        location : {
            x : getRandomArbitrary(0, 630),
            y : getRandomArbitrary(130, 630)
        }
}
}

let mapCard = document.querySelector('.map');
// mapCard.classList.remove('map--faded');
let mapPinMain = document.querySelector('.map__pin--main');
let mapCardTemplate = document.querySelector('#map__card-template').content.querySelector('.map__card');
let similarMapPin = document.querySelector(".map__pin");

// document.querySelector('input').setAttribute("disabled", "disabled");
let renderMapInformation = function(Map) {
    mapCardTemplate.classList.add('hidden');
    let templateElement = mapCardTemplate.cloneNode(true);

    templateElement.querySelector('.popup__avatar').src = Map.author.avatar;
    templateElement.querySelector('.popup__title').textContent = Map.offer.title;
    templateElement.querySelector('.popup__text--price').textContent = Map.offer.price;
    // templateElement.querySelector('.').style = Map.offer.address;
    templateElement.querySelector('.popup__type').textContent = valueType(Map.offer.type);
    templateElement.querySelector('.popup__text--capacity').textContent = Map.offer.rooms + " комнаты для " + Map.offer.guests + " гостей";
    templateElement.querySelector('.popup__text--time').textContent = "Заезд после " + Map.offer.checkin + ", выезд до " + Map.offer.checkout;
    templateElement.querySelector('.popup__description').textContent = Map.offer.description;
    // templateElement.querySelector('.popup__pictures').createElement('li').appendChild(templateElement);
    for(let i = 0; i <= 2; i++) {
        templateElement.querySelector('.popup__pictures img:nth-of-type('+(i+1)+')').src = Map.offer.photos[i];
    }
    templateElement.querySelector('.popup__close').addEventListener("click", function (e) {
            e.preventDefault();
            templateElement.classList.add('hidden');
            document.querySelector('#address').value =null;
    });

    return templateElement;
}
let renderMapIcon = function (Map, i) {
    let mapElement = similarMapPin.cloneNode(true);

    mapElement.classList.add('hidden');
    mapElement.classList.remove('map__pin--main');

    mapElement.querySelector('svg').remove();
    mapElement.style = Map.offer.address ;
    mapElement.querySelector('.map__pin img').style = "cursor:pointer";
    mapElement.querySelector('.map__pin img').src = Map.author.avatar;
    mapElement.querySelector('.map__pin img').alt = Map.offer.title;
    mapElement.addEventListener("click", function (e){
        e.preventDefault();
        if (similarMapPin[i] === mapCardTemplate[i]) {
            mapCard.querySelector('.popup:nth-of-type('+(i+1)+')').classList.remove('hidden');
            document.querySelector('#address').value = Map.location.x +" "+ Map.location.y ;
            }
    });
    mapPinMain.addEventListener('mouseup', function(e){
        e.preventDefault();
        mapCard.classList.remove('map--faded');
        mapElement.classList.remove('hidden');
        document.querySelector('.notice__form').classList.remove('notice__form--disabled');
        activationForm("enabled");
    });
    return mapElement;
}

let fragment = document.createDocumentFragment();
for(let i = 0; i <= Map.length - 1; i++) {
    fragment.appendChild(renderMapIcon(Map[i], i));
    fragment.appendChild(renderMapInformation(Map[i]));
}
let mapPins = document.querySelector('.map__pins');
mapPins.appendChild(fragment);
mapCard.appendChild(fragment);


