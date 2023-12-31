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
let ScoreTable = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
    GuesWord = "TRUCK";
let StoragedObject;
let played = 0;
let parsedvaluefrommLS;
/*======================================*/
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
        menuStatTopStr.innerHTML = parseInt(
            localStorage.getItem("playedValue")
        );
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
    console.log("Restarted");
}

function winGame() {
    played = parseInt(localStorage.getItem("playedValue")) + 1;
    localStorage.setItem("playedValue", played);
    if (played) {
        menuStatTopStr.innerHTML = parseInt(
            localStorage.getItem("playedValue")
        );
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

    console.log("YOU WIN");
    menuContainer.classList.remove("active");
    gameContainer.classList.remove("active");
    clearInterval(winInterval);

    Reloading();
}

function LoseGame() {
    played = parseInt(localStorage.getItem("playedValue")) + 1;
    localStorage.setItem("playedValue", played);
    if (played) {
        menuStatTopStr.innerHTML = parseInt(
            localStorage.getItem("playedValue")
        );
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
            } else if (keyValue === "ent" && inputWordArr.length == 5) {
                enterValue();
                Retrycounter++;
            } else if (
                keyValue != "del" &&
                keyValue != "ent" &&
                inputWordArr.length < 5
            ) {
                index++;
                InputValue(keyValue, index);
            }
            console.log(inputWordArr);
            if (Retrycounter == 6) {
                console.log("restarts from here");
                loseInterval = setInterval(() => {
                    LoseGame();
                }, 1700);
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
    let isAlreadyArr = [];
    const keybindsArray = Array.from(keybinds);
    const BoxArray = Array.from(box);

    for (let i = 0; i < inputWordArr.length; i++) {
        let p = true,
            colorCheck = true;
        let k = 0;
        const uniqArr = new Set();
        for (let j = 0; j < inputWordArr.length; j++) {
            if (inputWordArr[i] == GuesWord[j]) {
                for (let t = 0; t < isAlreadyArr.length; t++) {
                    if (j == isAlreadyArr[t]) {
                        p = false;
                        break;
                    }
                }
                if (p == false) {
                    continue;
                } else {
                    isAlreadyArr.push(j);
                    /*===ADDING GREEN===*/
                    /*===ADDING YELLOW===*/
                    if (i == j) {
                        sumK++;
                        box[PreOrderedNum + i].classList.add(
                            "transition",
                            "green"
                        );
                        if (
                            keybinds instanceof NodeList ||
                            Array.isArray(keybinds)
                        ) {
                            greenKey = keybindsArray.find((Key) => {
                                return Key.value === inputWordArr[i];
                            });
                            greenKey.classList.remove("yellow");
                            greenKey.classList.add("green");
                        }
                    } else {
                        box[PreOrderedNum + i].classList.add(
                            "transition",
                            "yellow"
                        );

                        if (
                            keybinds instanceof NodeList ||
                            Array.isArray(keybinds)
                        ) {
                            yellowKey = keybindsArray.find((Key) => {
                                return Key.value === inputWordArr[i];
                            });
                            if (!yellowKey.classList.contains("green")) {
                                yellowKey.classList.add("yellow");
                            }
                        }
                    }
                    colorCheck = false;
                }
            } else {
                k++;
                continue;
            }
        }
        // if(){
        // }
        if (k == 5) {
            uniqArr.add([inputWordArr[i]]);
            k = 0;
        }
        let checkArr = [...uniqArr];
        /*===ADDING GRAY===*/
        if (colorCheck == true) {
            // console.log("[" + i + "]: " + "add-Gray");
            box[PreOrderedNum + i].classList.add("transition", "gray");
            for (let k = 0; k < checkArr.length; k++) {
                if (checkArr[i] != inputWordArr[i] || i == 0) {
                    if (
                        keybinds instanceof NodeList ||
                        Array.isArray(keybinds)
                    ) {
                        grayKey = keybindsArray.find((Key) => {
                            return Key.value === inputWordArr[i];
                        });
                        grayKey.classList.add("gray");
                    }
                }
            }
        }
    }
    // console.log(box.length);
    let newArr;

    if (box instanceof NodeList || Array.isArray(box)) {
        newArr = BoxArray.filter((item, index) => index >= columns).map(
            (obj) => {
                return obj;
            }
        );
    }
    // console.log(newArr.length);
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
