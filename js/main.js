"use strict";

// Карта

ymaps.ready(init);

function init() {
  var myMap = new ymaps.Map(
    "map",
    {
      center: [51.660781, 39.200296],
      zoom: 17,
    },
    {
      searchControlProvider: "yandex#search",
    }
  );

  myMap.geoObjects.add(
    new ymaps.Placemark(
      [51.660781, 39.200296],
      {
        balloonContent: "Воронеж",
      },
      {
        preset: "islands#redIcon",
      }
    )
  );
}

//код для аккордеона

$(document).ready(function () {
  $(".accordion__item-header").click(function () {
    var $content = $(this).next(".accordion__item-content");
    var isActive = $content.hasClass("active");

    $(".accordion__item-content.active")
      .not($content.parents(".accordion__item-content"))
      .removeClass("active")
      .slideUp();
    $(".accordion__item-header span.icon-up")
      .not($(this).find("span"))
      .removeClass("icon-up")
      .addClass("icon-down");

    if (isActive) {
      $content.removeClass("active").slideUp();
      $(this).children("span").removeClass("icon-up").addClass("icon-down");
    } else {
      $content.addClass("active").slideDown();
      $(this).children("span").removeClass("icon-down").addClass("icon-up");
    }
  });
});

//popUp

$(document).ready(function ($) {
  $(".default-btn").click(function (e) {
    var func = $(this).data("function");

    if (func === "popup") {
      e.preventDefault();
      $(".popup").fadeIn(800);
      $("html").addClass("no-scroll");
    } else if (func === "accordion") {
      e.preventDefault();
      if ($("#accordion--hidden").is(":hidden")) {
        $("#accordion--hidden").slideDown("slow");
      } else {
        $("#accordion--hidden").slideUp("slow");
      }
    }
  });

  $(".popup__closeBtn").click(function () {
    $(".popup").fadeOut(800);
    $("html").removeClass("no-scroll");
  });

  $(document).keydown(function (e) {
    if (e.keyCode === 27) {
      e.stopPropagation();
      $(".popup").fadeOut();
      $("html").removeClass("no-scroll");
    }
  });

  $("#popup").click(function (event) {
    if ($(event.target).closest(".popup__content").length === 0) {
      $(this).fadeOut();
      $("html").removeClass("no-scroll");
    }
  });
});

// Форма

$(document).ready(function ($) {
  // Сброс формы при загрузке страницы
  $("form").each(function () {
    this.reset();
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");
  const popupContent = document.getElementById("popupContent");
  const phoneInput = document.getElementById("formTel");

  Inputmask({ mask: "+7 (999) 999-99-99" }).mask(phoneInput);

  form.addEventListener("submit", formSend);

  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);
    const formData = new FormData(form);

    if (error === 0) {
      popupContent.classList.add("_sending");
      let response = await fetch("php/send.php", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        popupContent.classList.remove("_sending");
        showMessage("Заявка успешно отправлена!", true);
        form.reset();
      } else {
        showMessage("Ошибка отправки! Что-то пошло не так...", false);
        popupContent.classList.remove("_sending");
      }
    } else {
      showMessage(
        "Ошибка отправки! Проверьте правильность введённых данных.",
        false
      );
    }
  }

  function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll("._req");

    for (let index = 0; index < formReq.length; index++) {
      const input = formReq[index];
      formRemoveError(input);

      if (input.classList.contains("_email")) {
        if (emailTest(input)) {
          formAddError(input);
          error++;
        }
      } else if (
        input.getAttribute("type") === "checkbox" &&
        input.checked === false
      ) {
        formAddError(input);
        error++;
      } else if (input.classList.contains("_phone")) {
        if (phoneTest(input)) {
          formAddError(input);
          error++;
        }
      } else if (
        input.getAttribute("type") !== "checkbox" &&
        (input.value.length < input.getAttribute("minlength") ||
          input.value.length > input.getAttribute("maxlength"))
      ) {
        formAddError(input);
        error++;
      } else if (input.classList.contains("_name")) {
        if (nameTest(input)) {
          formAddError(input);
          error++;
        }
      } else {
        if (input.value === "") {
          formAddError(input);
          error++;
        }
      }
    }
    return error;
  }

  function formAddError(input) {
    input.parentElement.classList.add("_error");
    input.classList.add("_error");
  }

  function formRemoveError(input) {
    input.parentElement.classList.remove("_error");
    input.classList.remove("_error");
  }

  function showMessage(message, isSuccess) {
    const messageElement = document.getElementById("statusMessage");
    messageElement.textContent = message;

    if (isSuccess) {
      messageElement.classList.add("success-message");
      messageElement.classList.remove("error-message");
    } else {
      messageElement.classList.add("error-message");
      messageElement.classList.remove("success-message");
    }

    messageElement.style.display = "block";

    setTimeout(() => {
      messageElement.style.display = "none";
    }, 3000);
  }

  function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  }

  function nameTest(input) {
    return /\d/.test(input.value);
  }

  function phoneTest(input) {
    return !/^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/.test(input.value);
  }
});

//Бургер меню

$(document).ready(function () {
  $(".header__burger-link").click(function (e) {
    $(".header__burger-link, .header__menu").toggleClass("active");
    $("body").toggleClass("no-scroll");
  });

  $(".header__menu a").click(function (e) {
    $(".header__burger-link, .header__menu").removeClass("active");
    $("body").removeClass("no-scroll");
  });
});
