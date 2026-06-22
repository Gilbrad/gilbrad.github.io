const arrow = document.querySelector(".arrow");
const main = document.querySelector(".main");
const dialogue = document.getElementById("dialogue");
const myImage = document.getElementById("me");
const bioContainer = document.querySelector(".bio-container");
const mainBodyContainer = document.querySelector(".main-body-container");
const isMobile = window.matchMedia("(max-width: 800px)");

const introDialogue = ["Hello there!", "Here to take a peek?", "Gilean Cyrus Alanza"];
let isTyping = true;
let dialogueIndex = 0;

function typeWriter(text, index) {
    isTyping = true;
    if (index < text.length) {
        dialogue.innerHTML += text.charAt(index);
        setTimeout(function () {
            typeWriter(text, index + 1);
        }, 70);
    } else {
        isTyping = false;
        if (dialogueIndex === introDialogue.length - 1) {
            if (isMobile.matches) {
                setTimeout(() => main.classList.add("show"), 300);
            } else {
                main.classList.add("active");
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", function() {
    arrow.style.visibility = "hidden";
    arrow.innerHTML = " >";
    typeWriter(introDialogue[dialogueIndex], 0);
});

setInterval(() => {
    if (!isTyping) {
        arrow.style.visibility = arrow.style.visibility === "hidden" ? "" : "hidden";
    } else arrow.style.visibility = "hidden";
}, 500);

main.addEventListener("click", () => {
    if (!isTyping && dialogueIndex < introDialogue.length - 1) {
        dialogue.innerHTML = "";
        dialogueIndex++;
        if (dialogueIndex === introDialogue.length - 1) {
            arrow.style.display = "none";
        }
        typeWriter(introDialogue[dialogueIndex], 0);
    }
});

let transitionCount = 0;

function imgTransitionEnd(e) {
    if (e.propertyName === "transform" && transitionCount === 0) {
        setTimeout(() => {
            main.classList.remove("active");
            transitionCount++;
        }, 600);
    } else if (e.propertyName === "transform" && transitionCount === 1) {
        setTimeout(() => {
            main.classList.add("show");
            transitionCount++;
        }, 100);
    }
}

function bioTransitionEnd(e) {
    if (e.propertyName === "height") {
        main.classList.add("intro-done");
    }
}

function mainBodyTransitionEnd(e) {
    if (e.propertyName === "width") {
        main.classList.add("shifted");
    }
}

myImage.addEventListener("transitionend", imgTransitionEnd);
bioContainer.addEventListener("transitionend", bioTransitionEnd);
mainBodyContainer.addEventListener("transitionend", mainBodyTransitionEnd);
