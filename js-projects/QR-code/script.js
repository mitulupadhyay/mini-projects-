let imgBox = document.getElementById("imgBox");
let qrImage = document.getElementById("qrImage");
let qrText = document.getElementById("qrText");
let generateBtn = document.getElementById("generateBtn");

generateBtn.addEventListener("click", generateQR);

qrText.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        generateQR();
    }
});

function generateQR(){
    let text = qrText.value.trim();

    // dont create QR for empty space
    if (text === "") {
        alert("Please enter some text or a URL first.");
        return;
    }

    let encodedText = encodeURIComponent(text);

    qrImage.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + encodedText;
    imgBox.classList.add("show-img");
}

// if any error it will show up
qrImage.addEventListener("error", function () {
    alert("Something went wrong while generating the QR code. Please try again.");
    imgBox.classList.remove("show-img");
});
