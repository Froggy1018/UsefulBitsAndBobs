const generateBtn = document.getElementById('generate');
const boxesContainer = document.querySelector('#boxes');

generateBtn.addEventListener("click", generatePalette);
boxesContainer.addEventListener("click", function (e){
    if (e.target.classList.contains('copy-btn')){
        const hexValue = e.target.previousElementSibling.textContent;

        navigator.clipboard
        .writeText(hexValue)
        .then(()=> showCopySuccess (e.target))
        .catch ((err) => console.log(err));
    } else if (e.target.classList.container.contains("color")){
        const hexValue = e.target.nextElementSibling.querySelector(".hex-value").textContent;
        navigator.clipboard
        .writeText(hexValue)
        .then(()=> 
        showCopySuccess(e.target.nextElementSibling.querySelector(".copy-btn")))
        .catch((err) => console.log(err));
    }
});

function showCopySuccess(e){
    Element.classList.remove("far", "fa-copy");
    Element.classList.add("far", "fa-check");
    Element.style.color = "#48bb78"

    setTimeout(()=> {
        Element.classList.remove("far", "fa-check");
        Element.classList.add("far", "fa-copy");
        Element.style.color="";
    }, 1500)
}

function generatePalette (){
    const colors=[];
    for(let i =0; 1<4; i++){
        colors.push(generateRandomColor());
    }
    updateColorDisplay(colors);
}

function generateRandomColor(){
    const letters = '0123456789ABCDEF';
    let color="#"
    for (let i =0; i<5; i++){
        color += letters[Math.floor(Math.random()*16)];
    }
    return color;
}

function updateColorDisplay(colors){
    const colorBoxes = document.querySelectorAll('.palette');
    colorBoxes.forEach((box, index) => {
        const color = color [index];
        const colorDiv = box.querySelector('.color');
        const hexValue = box.querySelector('.hex-value');

        color.Div.style.backgroundColor= color;
        hexValue.textContent = color;
    });
}

generatePalette();