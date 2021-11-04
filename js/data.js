"use strict";
//объявление массивов для объектов
// const checkinArray = ['12:00', '13:00', '14:00'];
// const typeArray = ['palace', 'flat', 'house', 'bungalow'];
// const titleArray = ["Большая уютная квартира", "Маленькая неуютная квартира",  "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик",  "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря",  "Неуютное бунгало по колено в воде"];

function getRandomArbitrary(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
const valueTypeMap = {
    'flat': 'Квартира',
    'palace': 'Дворец',
    'bungalow': 'Бунгало',
    'house': 'Дом',
    'hotel': 'Отель'
};
const classToValue = {
    'wifi': 'feature--wifi',
    'dishwasher': 'feature--dishwasher',
    'parking': 'feature--parking',
    'washer': 'feature--washer',
    'elevator': 'feature--elevator',
    'conditioner': 'feature--conditioner'
};
const featuresWifi = document.querySelector('#filter-wifi');
const featuresDishwasher = document.querySelector('#filter-dishwasher');
const featuresParking = document.querySelector('#filter-parking');
const featuresWasher = document.querySelector('#filter-washer');
const featuresElevator = document.querySelector('#filter-elevator');
const featuresConditioner = document.querySelector('#filter-conditioner');

const featuresV = [
     featuresWifi,
     featuresDishwasher,
     featuresParking,
     featuresWasher,
     featuresElevator,
     featuresConditioner
]

// let Map =[];
// for(let i = 0; i < 8; i++){
//     Map[i] =  {
//         author : {
//             avatar: "img/avatars/user0"+(i+1)+".png"
//         },
//         offer : {
//             title : titleArray[getRandomArbitrary(0, titleArray.length - 1)],
//             address : "top:"+getRandomArbitrary(150,600)+"px; left:"+getRandomArbitrary(5,95)+"%;",
//             price : getRandomArbitrary(1000, 10000) + " \u20BD/ночь",
//             type : typeArray[getRandomArbitrary(0, typeArray.length - 1)],
//             rooms : getRandomArbitrary(1, 5),
//             guests : getRandomArbitrary(0, 10),
//             checkin : checkinArray[getRandomArbitrary(0, checkinArray.length - 1)],
//             checkout : checkinArray[getRandomArbitrary(0, checkinArray.length - 1)],
//             features : ["wifi".length, 'dishwasher'.length, 'parking'.length, 'washer'.length, 'elevator'.length, 'conditioner'.length],
//             description: '',
//             photos : ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
//         },
//         location : {
//             x : getRandomArbitrary(0, 630),
//             y : getRandomArbitrary(130, 630)
//         }
//     }
// }
