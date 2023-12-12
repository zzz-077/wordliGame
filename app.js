/*==============================*/
/*=============DOM============*/
/*==============================*/
const keybinds = document.querySelectorAll(".key");
const box = document.querySelectorAll(".box");

let inputWordArr = [];
function inputkeys() {
    let keyValue
    let i=0;
    keybinds.forEach((key) => {
        key.addEventListener("click", (e) => {
            keyValue = e.target.value;
            inputWordArr.push(keyValue);
            box[i].innerHTML=keyValue;
            i++;
            // return keyValue;
        });
        console.log("after");
    });
}
inputkeys();
// function displayValues() {
//     let k=0,n=6;
//     for(let i=k;i<5;i++){
//         box[i].innerHTML=1;
//     }
    
// }
// displayValues();

// console.log(inputWordArr.length);
