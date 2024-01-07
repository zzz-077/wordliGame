/*============================*/
/*=============DOM============*/
/*============================*/
const keybinds = document.querySelectorAll(".key");
const box = document.querySelectorAll(".box");
const startBtn = document.querySelector("#start_btn");
const menuContainer = document.querySelector(".menu_container");
const gameContainer = document.querySelector(".game_container");
const displayBoxes = document.querySelector(".display_boxes");
const keyboardContainer = document.querySelector(".keyboard_container");
const scoreBoxes = document.querySelectorAll(".scoreBoxes");
const menuStatTopStr = document.querySelector(".menu_stat_top strong");
const themeSwitchBtn = document.querySelector(".theme_switch_btn");
const infoBtn = document.querySelector(".info_btn");
const infoRemoveBtn = document.querySelector(".info_header button");
const infoContainer = document.querySelector(".info_container");
const infoDesk = document.querySelector(".info_desk");
const alertBox = document.querySelector(".alert_box ");
const alertTitle_Chld1_H1 = document.querySelector(
  ".alert_box div:nth-child(1) h1"
);
const alertTitle_Chld2_H1 = document.querySelector(
  ".alert_box div:nth-child(2) h1"
);

startBtn.addEventListener("click", startFunc);
themeSwitchBtn.addEventListener("click", themeSwitchFunc);
infoBtn.addEventListener("click", infoBoardOpen);
infoRemoveBtn.addEventListener("click", infoBoardClose);
/*==================================*/
/*=============VARIABLES============*/
/*==================================*/
let keyValue,
  index = -1;
let columns = 5;
let Prewcolumn = -1;
let inputWordArr = [];
let PreOrderedNum = 0;
let Retrycounter = 0;
let greenKey;
let yellowKey;
let grayKey;
let loseInterval;
let winInterval;
let sumK = 0;
let score = 0;
let ScoreTable = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
// let GuesWord = "TRUCK";
let GuesWord = "";
let StoragedObject;
let played = 0;
let parsedvaluefrommLS;
let alertTitle;

/*======================================*/
/*=============GUESSWORD============*/
/*======================================*/
function GuessWordFromApi() {
  fetch("/data/words.json")
    .then((res) => res.json())
    .then((word) => {
      let GuesWordIndex = Math.floor(Math.random() * 9079 + 1);
      GuesWord = word[GuesWordIndex].toUpperCase();
      // console.log(GuesWord);
    });
}
/*=============LOCALSTORAGES============*/
/*======================================*/
document.addEventListener("DOMContentLoaded", () => {
  // localStorage.clear();
  if (!localStorage.getItem("scoretable")) {
    StoragedObject = JSON.stringify(ScoreTable);
    localStorage.setItem("scoretable", StoragedObject);
  }
  if (!localStorage.getItem("playedValue")) {
    localStorage.setItem("playedValue", played);
  }
  if (!played) {
    menuStatTopStr.innerHTML = parseInt(localStorage.getItem("playedValue"));
  }

  if (localStorage.getItem("scoretable")) {
    parsedvaluefrommLS = JSON.parse(localStorage.getItem("scoretable"));
    scoreBoxes.forEach((item, index) => {
      index++;
      item.innerHTML = parsedvaluefrommLS[index];
      item.style.height = parsedvaluefrommLS[index] * 10 + "%";
    });
  }
});
/*==================================*/
/*=============FUNCTIONS============*/
/*==================================*/
inputkeys();
function themeSwitchFunc() {
  document.querySelector(".theme_switch_btn").classList.toggle("light");
  document.querySelector(".theme_switch_btn span").classList.toggle("light");
  document.body.classList.toggle("dark_theme");
}
function infoBoardOpen() {
  infoContainer.classList.add("active");
  infoDesk.classList.add("active");
}
function infoBoardClose() {
  infoContainer.classList.remove("active");
  infoDesk.classList.remove("active");
}

function startFunc() {
  menuContainer.classList.add("active");
  gameContainer.classList.add("active");
  displayBoxes.classList.add("active");
  keyboardContainer.classList.add("active");
  GuessWordFromApi();
}

function Reloading() {
  for (let i = 0; i < box.length; i++) {
    box[i].classList.remove("transition", "gray", "yellow", "green");
    box[i].innerHTML = "";
  }
  for (let i = 0; i < keybinds.length; i++) {
    keybinds[i].classList.remove("gray", "yellow", "green");
  }
  inputWordArr = [];
  index = -1;
  columns = 5;
  Prewcolumn = -1;
  PreOrderedNum = 0;
  Retrycounter = 0;
  sumK = 0;
  score = 0;
  played = 0;
  // clearInterval(loseInterval);
}

function winGame() {
  played = parseInt(localStorage.getItem("playedValue")) + 1;
  localStorage.setItem("playedValue", played);
  if (played) {
    menuStatTopStr.innerHTML = parseInt(localStorage.getItem("playedValue"));
  }

  ScoreTable[score]++;
  StoragedObject = JSON.stringify(ScoreTable);
  let parsedScoreTable = JSON.parse(localStorage.getItem("scoretable"));
  parsedScoreTable[score] += 1;
  localStorage.setItem("scoretable", JSON.stringify(parsedScoreTable));

  let savedScore;
  savedScore = score - 1;
  scoreBoxes[savedScore].innerHTML = parsedScoreTable[score];
  scoreBoxes[savedScore].style.height = parsedScoreTable[score] * 10 + "%";

  menuContainer.classList.remove("active");
  gameContainer.classList.remove("active");
  clearInterval(winInterval);

  Reloading();
}

function LoseGame() {
  played = parseInt(localStorage.getItem("playedValue")) + 1;
  localStorage.setItem("playedValue", played);
  if (played) {
    menuStatTopStr.innerHTML = parseInt(localStorage.getItem("playedValue"));
  }

  // loseInterval = setInterval(() => {
  menuContainer.classList.remove("active");
  gameContainer.classList.remove("active");

  displayBoxes.classList.remove("active");
  keyboardContainer.classList.remove("active");
  // }, 1700);
  clearInterval(loseInterval);
  Reloading();
}

function inputkeys() {
  check = false;
  keybinds.forEach((key) => {
    key.addEventListener("click", () => {
      keyValue = key.value;
      if (keyValue === "del" && index > -1) {
        deleteValue(index);
        if (index > Prewcolumn) {
          index--;
        }
      } else if (keyValue === "ent") {
        if (inputWordArr.length < 5) {
          for (let j = 0; j < GuesWord.length; j++) {
            box[PreOrderedNum + j].classList.add("shake");
          }
          alertBox.classList.add("active");
          alertTitle_Chld1_H1.classList.add("active");

          setTimeout(() => {
            alertBox.classList.remove("active");
            alertTitle_Chld1_H1.classList.remove("active");
            box.forEach((item) => item.classList.remove("shake"));
          }, 700);
        } else if (inputWordArr.length == 5) {
          check = false;
          fetch("/data/words.json")
            .then((res) => res.json())
            .then((word) => {
              for (let j = 0; j < word.length; j++) {
                if (word[j].toUpperCase() == inputWordArr.join("")) {
                  check = true;
                }
              }
              if (check) {
                Retrycounter++;
                enterValue();
              } else {
                for (let j = 0; j < GuesWord.length; j++) {
                  box[PreOrderedNum + j].classList.add("shake");
                }
                alertBox.classList.add("active");
                alertTitle_Chld2_H1.classList.add("active");

                setTimeout(() => {
                  alertBox.classList.remove("active");
                  alertTitle_Chld2_H1.classList.remove("active");
                  box.forEach((item) => item.classList.remove("shake"));
                }, 700);
              }
              if (Retrycounter == 6) {
                loseInterval = setInterval(() => {
                  LoseGame();
                }, 1700);
              }
            });
        }
      } else if (
        keyValue != "del" &&
        keyValue != "ent" &&
        inputWordArr.length < 5
      ) {
        index++;
        InputValue(keyValue, index);
      }
    });
  });
}

function InputValue(val, index) {
  inputWordArr.push(val);
  box[index].innerHTML = val;
}

function deleteValue(index) {
  if (index > Prewcolumn) {
    inputWordArr.pop(index);
    box[index].innerHTML = "";
  }
}

function enterValue() {
  sumK = 0;
  score++;
  let keyColor;
  const keybindsArray = Array.from(keybinds);
  const BoxArray = Array.from(box);
  for (let i = 0; i < inputWordArr.length; i++) {
    //====ADDING GREEN====
    if (GuesWord[i] == inputWordArr[i]) {
      sumK++;
      BoxArray[PreOrderedNum + i].classList.add("transition", "green");
      if (keybinds instanceof NodeList || Array.isArray(keybinds)) {
        keyColor = keybindsArray.find((Key) => {
          return Key.value === inputWordArr[i];
        });
        keyColor.classList.remove("yellow");
        keyColor.classList.add("green");
      }
      inputWordArr[i] = "0";
    }
    //====ADDING YELLOW====
    else {
      for (let j = 0; j < inputWordArr.length; j++) {
        if (GuesWord[i] == inputWordArr[j]) {
          BoxArray[PreOrderedNum + j].classList.add("transition", "yellow");
          if (keybinds instanceof NodeList || Array.isArray(keybinds)) {
            keyColor = keybindsArray.find((Key) => {
              return Key.value === inputWordArr[j];
            });
            if (!keyColor.classList.contains("green")) {
              keyColor.classList.add("yellow");
            }
          }
          inputWordArr[j] = "0";
          break;
        }
      }
    }
  }
  //====ADDING GRAY====
  for (let j = 0; j < inputWordArr.length; j++) {
    if (!BoxArray[PreOrderedNum + j].classList.contains("transition")) {
      BoxArray[PreOrderedNum + j].classList.add("transition", "gray");
      if (keybinds instanceof NodeList || Array.isArray(keybinds)) {
        keyColor = keybindsArray.find((Key) => {
          return Key.value === inputWordArr[j];
        });
        if (!keyColor.classList.contains("green")) {
          keyColor.classList.add("gray");
        }
      }
    }
  }
  let newArr;

  if (box instanceof NodeList || Array.isArray(box)) {
    newArr = BoxArray.filter((item, index) => index >= columns).map((obj) => {
      return obj;
    });
  }

  columns += 5;
  Prewcolumn += 5;
  inputWordArr = [];
  PreOrderedNum += 5;
  if (sumK == 5) {
    winInterval = setInterval(() => {
      winGame();
    }, 1700);
  }
}
