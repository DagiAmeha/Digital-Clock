"use strict";

const container = document.querySelector(".container");
const period = document.querySelector(".period");
const toggler = document.querySelector(".toggler");

// getting the timezone
const offsetInMinutes = new Date().getTimezoneOffset();
const timeZone = -Math.floor(offsetInMinutes / 60);

const increaseSec = function (hour, min, sec) {
  if (sec < 59) {
    document.querySelector("[data-second]").innerHTML = `${
      sec < 9 ? "0" + (sec + 1) : sec + 1
    }`;
  } else {
    document.querySelector("[data-second]").innerHTML = "00";

    increaseMinute(min, hour);
  }
};
const increaseMinute = function (min, hour) {
  if (min < 59) {
    document.querySelector("[data-minute]").innerHTML = `${
      min < 9 ? "0" + (min + 1) : min + 1
    }`;
  } else {
    document.querySelector("[data-minute]").innerHTML = "00";
    increaseHour(hour);
  }
};

const increaseHour = function (hour) {
  if (hour < 12) {
    document.querySelector("[data-hour]").innerHTML = `${
      hour < 9 ? "0" + (hour + 1) : hour + 1
    }`;
  } else {
    document.querySelector("[data-hour]").innerHTML = "01";
    togglePeriod();
  }
};

const togglePeriod = function () {
  period.querySelector(".am").classList.toggle("hidden");
  period.querySelector(".pm").classList.toggle("hidden");
};

const generateHTML = function (component, componentText) {
  const html = `
        <span data-${componentText}>${
    component < 10 ? "0" + component : component
  }</span>`;

  container
    .querySelector(`.${componentText}`)
    .insertAdjacentHTML("afterbegin", html);
};

const clockFunctionality = function () {
  setInterval(() => {
    let sec = parseInt(document.querySelector("[data-second]").innerHTML);
    let min = parseInt(document.querySelector("[data-minute]").innerHTML);
    let hour = parseInt(document.querySelector("[data-hour]").innerHTML);

    increaseSec(hour, min, sec);
  }, 1000);
};

const updateTime = function (timeZone) {
  const date = new Date();
  const currentUTCHour = date.getUTCHours();
  const currentHour = (currentUTCHour + timeZone) % 12;
  const currentMinute = date.getUTCMinutes();
  const currentSecond = date.getUTCSeconds();

  generateHTML(currentHour, "hour");

  generateHTML(currentMinute, "minute");

  generateHTML(currentSecond, "second");

  period
    .querySelector(`.${currentUTCHour + timeZone > 12 ? "pm" : "am"}`)
    .classList.toggle("hidden");

  //   functioning the clock
  clockFunctionality();
};

// toggle between light and dark version
toggler.addEventListener("click", function () {
  container.classList.toggle("dark");
  toggler.querySelector(".dark").classList.toggle("hidden");
  toggler.querySelector(".light").classList.toggle("hidden");
});

window.addEventListener("load", () => {
  updateTime(timeZone);
});
