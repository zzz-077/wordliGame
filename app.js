/*==============================*/
/*=============DOM============*/
/*==============================*/
const keybinds = document.querySelectorAll(".key");
const box = document.querySelectorAll(".box");
let keyValue,
  index = -1;
let columns = 5;
let Prewcolumn = -1;
let inputWordArr = [];
let PreOrderedNum = 0;
let Retrycounter = 0;
GuesWord = "TRUCK";

function LoseGame() {
  setInterval(() => {
    alert("YOU LOSE TRY AGAIN!");
  }, 1000);
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
        LoseGame();
      }
    });
  });
}
inputkeys();
function InputValue(val, index) {
  inputWordArr.push(val);
  box[index].innerHTML = val;
}

function deleteValue(index) {
  if (index > Prewcolumn) {
    inputWordArr.pop(index);
    box[index].innerHTML = "";
    // console.log("Index:" + index);
  } else {
    // console.log("Index:" + index);
  }
}
function enterValue() {
  let isAlreadyArr = [];
  const keybindsArray = Array.from(keybinds);
  const BoxArray = Array.from(box);

  for (let i = 0; i < inputWordArr.length; i++) {
    let greenKey;
    let yellowKey;
    let grayKey;
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
          if (i == j) {
            // console.log("[" + i + "]: " + "add-Green");
            box[PreOrderedNum + i].classList.add("transition", "green");
            if (keybinds instanceof NodeList || Array.isArray(keybinds)) {
              greenKey = keybindsArray.find((Key) => {
                return Key.value === inputWordArr[i];
              });
              greenKey.classList.add("green");
            }
          } else {
            // console.log("[" + i + "]: " + "add-Yellow");
            box[PreOrderedNum + i].classList.add("transition", "yellow");

            if (keybinds instanceof NodeList || Array.isArray(keybinds)) {
              yellowKey = keybindsArray.find((Key) => {
                return Key.value === inputWordArr[i];
              });
              yellowKey.classList.add("yellow");
            }
          }
          colorCheck = false;
        }
      } else {
        k++;
        continue;
      }
    }
    if (k == 5) {
      uniqArr.add([inputWordArr[i]]);
      k = 0;
    }
    let checkArr = [...uniqArr];

    if (colorCheck == true) {
      // console.log("[" + i + "]: " + "add-Gray");
      box[PreOrderedNum + i].classList.add("transition", "gray");
      for (let k = 0; k < checkArr.length; k++) {
        if (checkArr[i] != inputWordArr[i] || i == 0) {
          if (keybinds instanceof NodeList || Array.isArray(keybinds)) {
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
    newArr = BoxArray.filter((item, index) => index >= columns).map((obj) => {
      return obj;
    });
  }
  console.log(newArr.length);
  columns += 5;
  Prewcolumn += 5;
  inputWordArr = [];
  PreOrderedNum += 5;
}
