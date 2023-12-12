/*==============================*/
/*=============DOM============*/
/*==============================*/
const keybinds = document.querySelectorAll(".key");
const box = document.querySelectorAll(".box");
let inputWordArr = [];
GuesWord = "TRUCK";
function inputkeys() {
    let keyValue,
        index = -1;
    check = false;
    keybinds.forEach((key) => {
        key.addEventListener("click", () => {
            keyValue = key.value;
            if (keyValue === "del" && index > -1) {
                deleteValue(index);
                index--;
            } else if (keyValue === "ent" && inputWordArr.length == 5) {
                console.log("keyValue: " + keyValue);
            } else if (
                keyValue != "del" &&
                keyValue != "ent" &&
                inputWordArr.length < 5
            ) {
                index++;
                InputValue(keyValue, index);
            }

            console.log(inputWordArr);
        });
    });
}
inputkeys();
function InputValue(val, index) {
    inputWordArr.push(val);
    box[index].innerHTML = val;
}

function deleteValue(index) {
    inputWordArr.pop(index);

    box[index].innerHTML = "";
    console.log("Index:" + index);
}
function enterValue() {
    let isAlreadyArr = [];
    let p = true;
    let colorCheck = true;

    for (let i = 0; i < inputWordArr.length; i++) {
        for (let j = 0; j < inputWordArr.length; j++) {
            if (inputWordArr[i] == GuesWord[i]) {
                for (let t = 0; t < isAlreadyArr.length; t++) {
                    if (j == arr[t]) {
                        p = false;
                        break;
                    }
                }
                if (p == false) {
                    continue;
                } else {
                    isAlreadyArr.push(j);
                    if (i == j) {
                        console.log("add-Green");
                    } else {
                        console.log("add-Orange");
                    }
                    colorCheck = false;
                }
            } else {
                continue;
            }
        }
        if (colorCheck == true) {
            console.log("add-Gray");
        }
    }
}
