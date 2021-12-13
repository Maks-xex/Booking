"use strict";
const mapCard = document.querySelector(".map");
const mapCardTemplate = document
  .querySelector("#map__card-template")
  .content.querySelector(".map__card");
const similarMapPin = document.querySelector(".map__pin");
const mapPinMain = document.querySelector(".map__pin--main");
const mapPins = document.querySelector(".map__pins");
const filterForm = document.querySelector(".map__filters");

const housingType = document.querySelector("[name=housing-type]");
const housingPrice = document.querySelector("[name=housing-price]");
const housingGuest = document.querySelector("[name=housing-guests]");
const housingRooms = document.querySelector("[name=housing-rooms]");

(function () {
  window.Maps = [];
  window.filteredMaps = [];
  let first = true;

  window.updateFilter = function () {
    if (first) {
      render(Maps);
      first = false;
    } else {
      mapPinsArray.forEach(() => {
        mapPins.querySelector(".map__card").remove();
        mapPins.querySelector(".map__pin:not(.map__pin--main)").remove();
      });
      render(filteredMaps);
    }
  };
  const successHandler = function (data) {
    window.Maps = data;
    updateFilter();
  };

  const houseFilter = function (type, price, room, guest) {
    window.filteredMaps = Maps.filter(function (guestElem) {
      if (guest === "any") {
        return guestElem;
      } else {
        return guestElem.offer.guests === parseInt(guest);
      }
    })
      .filter(function (roomsElem) {
        if (room === "any") {
          return roomsElem;
        } else {
          return roomsElem.offer.rooms === parseInt(room);
        }
      })
      .filter(function (priceElem) {
        switch (price) {
          case "middle":
            return 10000 >= priceElem.offer.price <= 50000;
          case "low":
            return priceElem.offer.price <= 10000;
          case "high":
            return priceElem.offer.price >= 50000;
          default:
            return priceElem;
        }
      })
      .filter(function (typeElem) {
        if (type === "any") {
          return typeElem;
        } else {
          return typeElem.offer.type === type;
        }
      });
  };
  const featuresFilter = () => {
    let count = 0;
    featuresValue.forEach((it)=>{
      if(!it.checked){
        count++;
      }
    });
    if(count >= featuresValue.length){
      return;
    }
    return (filteredMaps = filteredMaps.filter((it) => {
      if (!it.offer.features || !it.offer.features.length) {
        return;
      }
      for (let elem of it.offer.features) {
        for (let target of featuresValue) {
          if (elem === target.value && target.checked) {
            return it;
          }
        }
      }
    }));
  };
  filterForm.addEventListener("change", function (evt) {
    evt.preventDefault();
    houseFilter(
      housingType.value,
      housingPrice.value,
      housingRooms.value,
      housingGuest.value
    );
    featuresFilter();
    updateFilter();
  });
  const errorHandler = function (errorMessage) {
    const node = document.createElement("div");
    node.style =
      "margin: 0 auto;\n" +
      "    text-align: center;\n" +
      "    background-color: red;\n" +
      "    z-index: 21;";
    node.style.top = "0px";
    node.style.position = "sticky";
    node.style.left = "0";
    node.style.right = "0";
    node.style.fontSize = "30px";

    node.textContent = errorMessage;
    document.body.insertAdjacentElement("afterbegin", node);
    setTimeout(() => {
      node.remove();
    }, 4000);
  };

  window.onLoad(successHandler, errorHandler);
})();
//MapPin dragged function
(function () {
  mapPinMain.addEventListener("mousedown", function (e) {
    if (!mapCard.classList.contains("map--faded")) {
      e.preventDefault();

      let startCoords = {
        x: e.clientX,
        y: e.clientY,
      };

      let dragged = false;

      const onMouseMove = function (moveEvent) {
        moveEvent.preventDefault();
        dragged = true;

        let shift = {
          x: startCoords.x - moveEvent.clientX,
          y: startCoords.y - moveEvent.clientY,
        };
        startCoords = {
          x: moveEvent.clientX,
          y: moveEvent.clientY,
        };
        mapPinMain.style.top = mapPinMain.offsetTop - shift.y + "px";
        if (mapPinMain.offsetTop <= 100) {
          mapPinMain.style.top = 100 + "px";
        } else if (mapPinMain.offsetTop >= 650) {
          mapPinMain.style.top = 650 + "px";
        }
        mapPinMain.style.left = mapPinMain.offsetLeft - shift.x + "px";
        if (mapPinMain.offsetLeft <= 0) {
          mapPinMain.style.left = 0 + "px";
        } else if (mapPinMain.offsetLeft >= 1198) {
          mapPinMain.style.left = 1198 + "px";
        }
        document.querySelector("#address").value =
          mapPinMain.offsetTop + " " + mapPinMain.offsetLeft;
      };

      const onMouseUp = function (upEvent) {
        upEvent.preventDefault();

        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);

        if (dragged) {
          const onClickPreventDefault = function (e) {
            e.preventDefault();
            mapPinMain.removeEventListener("click", onClickPreventDefault);
          };
          mapPinMain.addEventListener("click", onClickPreventDefault);
        }
      };
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    }
  });
})();
///upload images
(function () {
  const FILE_TYPES = ["jpg", "png", "jpeg", "gif"];
  const fileChooser = document.querySelector("#avatar");
  const preview = document.querySelector(".notice__preview > img");

  fileChooser.addEventListener("change", () => {
    let file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => {
      return fileName.endsWith(it);
    });
    if (matches) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        preview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  });
})();
