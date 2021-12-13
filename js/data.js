"use strict";

function getRandomArbitrary(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
const valueTypeMap = {
  flat: "Квартира",
  palace: "Дворец",
  bungalow: "Бунгало",
  house: "Дом",
  hotel: "Отель",
};
const classToValue = {
  wifi: "feature--wifi",
  dishwasher: "feature--dishwasher",
  parking: "feature--parking",
  washer: "feature--washer",
  elevator: "feature--elevator",
  conditioner: "feature--conditioner",
};
const featuresWifi = document.querySelector("#filter-wifi");
const featuresDishwasher = document.querySelector("#filter-dishwasher");
const featuresParking = document.querySelector("#filter-parking");
const featuresWasher = document.querySelector("#filter-washer");
const featuresElevator = document.querySelector("#filter-elevator");
const featuresConditioner = document.querySelector("#filter-conditioner");

const featuresValue = [
  featuresWifi,
  featuresDishwasher,
  featuresParking,
  featuresWasher,
  featuresElevator,
  featuresConditioner,
];
