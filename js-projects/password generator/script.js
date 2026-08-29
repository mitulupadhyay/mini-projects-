const passwordBox = document.getElementById("password");
const lengthInput = document.getElementById("length");
const copiedMsg = document.getElementById("copiedMsg");

const uppercaseCheck = document.getElementById("uppercase");
const lowercaseCheck = document.getElementById("lowercase");
const numbersCheck = document.getElementById("numbers");
const symbolsCheck = document.getElementById("symbols");

const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercase = "abcdefghijklmnopqrstuvwxyz";
const number = "0123456789";
const symbol = "@#$%^&*()_+|}{[]<>/-=";

function createPassword(){
    let length = parseInt(lengthInput.value);

    if(isNaN(length) || length < 4){
        length = 4;
        lengthInput.value = 4;
    }
    if(length > 32){
        length = 32;
        lengthInput.value = 32;
    }

    let allChars = "";
    if(uppercaseCheck.checked) allChars += upperCase;
    if(lowercaseCheck.checked) allChars += lowercase;
    if(numbersCheck.checked) allChars += number;
    if(symbolsCheck.checked) allChars += symbol;

    if(allChars === ""){
        alert("Please select at least one character type.");
        return;
    }

    let password = "";
    for(let i = 0; i < length; i++){
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    passwordBox.value = password;
    copiedMsg.style.display = "none";
}

function copyPassword(){
    if(passwordBox.value === ""){
        return;
    }

    passwordBox.select();
    navigator.clipboard.writeText(passwordBox.value);

    copiedMsg.style.display = "inline-block";
    setTimeout(function(){
        copiedMsg.style.display = "none";
    }, 1500);
}