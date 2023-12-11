/*==============================*/
/*=============DOM============*/
/*==============================*/
const keybinds = document.querySelectorAll(".key");
const box = document.querySelectorAll(".box");
let inputWordArr = [];
function inputkeys() {
    keybinds.forEach((key) => {
        key.addEventListener("click", (e) => {
            console.log(e.target.value);
            inputWordArr.push(e.target.value);
        });
    });
    return console.log(inputWordArr);
}
function inputWordBoxFunc() {
    let i = 0;
    while (i < 5 && i < box.length) {
        box[i].innerHTML += 1;
        console.log(box[i]);
        console.log(item[i]);
        i++;
    }
}
inputkeys();
console.log(inputWordArr);
// inputWordBoxFunc();
