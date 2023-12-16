let textContainer = document.querySelector(".textContainer");
let enterKey = document.querySelector(".enter");
let spaceKey = document.querySelector(".space");
let deleteKey = document.querySelector(".delete");
let capsLock = document.querySelector(".capslock");
let allKeys = document.querySelectorAll(".key");
let isCaps = false;

enterKey.addEventListener('click', () => {
    let content = textContainer.innerText;
    let newContent = content + '\n';
    textContainer.innerText = newContent;
})
let d = ` `;
spaceKey.addEventListener("click", () => {
    let content = textContainer.innerText;
    let newContent = content+'\u00A0';
    textContainer.innerText = newContent;
})

deleteKey.addEventListener("click", () => {
    let content = textContainer.innerText;
    let newContent = content.slice(0, content.length - 1);
    textContainer.innerText = newContent;
})

capsLock.addEventListener("click", function () {
    // let content = textContainer.innerText;
    // let newContent = content.touif()

    if (isCaps) {
        capsLock.classList.remove("active");
        for(let i of allKeys){
            if(i.classList.length>1){

            }
            else{
                i.innerText = i.innerText.toLowerCase();
            }
        }
    }
    else {
        capsLock.classList.add("active");
        for(let i of allKeys){
            if(i.classList.length>1){

            }
            else{
                i.innerText = i.innerText.toUpperCase();
            }
        }
    }
    isCaps =! isCaps;
})


for(let all of allKeys){
    if(all.classList.length===1){
        all.addEventListener("click",()=>{
            textContainer.innerText += all.innerText;
        })
    }
}
// capsLock.addEventListener("click", function () {
//     if (isCaps) {
//         capsLock.classList.remove("active");
       
//     } else {
//         capsLock.classList.add("active");
       
//     }
//     isCaps = !isCaps
// })