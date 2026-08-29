const passwordBox = document.getElementById("password");
const lengthInput = document.getElementById("length");
const copiedMsg = document.getElementById("copiedMsg");
const strengthText = document.getElementById("strengthText");

const uppercaseCheck = document.getElementById("uppercase");
const lowercaseCheck = document.getElementById("lowercase");
const numbersCheck = document.getElementById("numbers");
const symbolsCheck = document.getElementById("symbols");

const allChecks = [uppercaseCheck, lowercaseCheck, numbersCheck, symbolsCheck];

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
    let categoriesUsed = 0;
    if(uppercaseCheck.checked){ allChars += upperCase; categoriesUsed++; }
    if(lowercaseCheck.checked){ allChars += lowercase; categoriesUsed++; }
    if(numbersCheck.checked){ allChars += number; categoriesUsed++; }
    if(symbolsCheck.checked){ allChars += symbol; categoriesUsed++; }

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
    showStrength(length, categoriesUsed);
}

function showStrength(length, categoriesUsed){
    let label = "Weak";
    let strengthClass = "weak";

    if(length >= 12 && categoriesUsed >= 3){
        label = "Strong";
        strengthClass = "strong";
    } else if(length >= 8 && categoriesUsed >= 2){
        label = "Medium";
        strengthClass = "medium";
    }

    strengthText.textContent = "Strength: " + label;
    strengthText.className = "strength-text " + strengthClass;
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

for(let i = 0; i < allChecks.length; i++){
    allChecks[i].addEventListener("change", function(){
        let checkedCount = 0;
        for(let j = 0; j < allChecks.length; j++){
            if(allChecks[j].checked) checkedCount++;
        }
        if(checkedCount === 0){
            this.checked = true;
        }
    });
}

createPassword();
