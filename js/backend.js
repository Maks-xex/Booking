"use strict";
(function() {

    window.onLoad = function(onSuccess, onError) {
        const URL = "https://24.javascript.pages.academy/keksobooking/data";
        const xhr = new XMLHttpRequest();

        xhr.responseType = "json";

        xhr.addEventListener("load", function(){
           switch (xhr.status) {
               case 200:
                   onSuccess(xhr.response);
                   break;
               case 400:
                   onError("Неверный запрос");
                   break;
               case 401:
                   onError("Пользователь не авторизован");
                   break;
               case 404:
                   onError("Ничего не найдено");
                   break;
               default:
                   onError("Статус ответов: " + xhr.status + " " + xhr.statusText);
           }
        });

        xhr.open("GET", URL);
        xhr.send();
    }
})();
(function() {
    window.upload = function(data, onSuccess, onError) {
        const URL = "https://24.javascript.pages.academy/keksobooking";
        const xhr = new XMLHttpRequest();

        xhr.responseType = "json";

        xhr.addEventListener("load", function() {
            switch (xhr.status) {
                case 200:
                    onSuccess(xhr.response);
                    break;
                case 400:
                    onError("Неверный запрос");
                    break;
                case 401:
                    onError("Пользователь не авторизован");
                    break;
                case 404:
                    onError("Ничего не найдено");
                    break;
                default:
                    onError("Статус ответов: " + xhr.status + " " + xhr.statusText);
            }
        });
        xhr.open("POST", URL);
        xhr.send(data);
    };
})();
