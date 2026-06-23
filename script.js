const arrow = document.querySelector(".arrow");
const main = document.querySelector(".main");
const dialogue = document.getElementById("dialogue");
const myImage = document.getElementById("me");
const bioContainer = document.querySelector(".bio-container");
const mainBodyContainer = document.querySelector(".main-body-container");
const isMobile = window.matchMedia("(max-width: 800px)");

// Intro dialogue array.
const introDialogue = ["Hello there!", "Here to take a peek?", "Gilean Cyrus Alanza"];

let isTyping = true; // Flag to indicate if the typewriter effect is currently typing.
let dialogueIndex = 0; // Index to keep track of the current dialogue being typed.
let firstTransitionDone = false;; // Flag to indicate if the first transition of the hidden image of me is complete.

// Typewriter effect for the intro dialogue.
// After the last dialogue is typed, the class "active" is added to the main element, which triggers the transition of the hidden image of me.
function typeWriter(text, index) {
    isTyping = true;
    if (index < text.length) {
        dialogue.innerHTML += text.charAt(index);
        setTimeout(function () {
            typeWriter(text, index + 1);
        }, 40);
    } else {
        isTyping = false;
        if (dialogueIndex === introDialogue.length - 1) {
            if (isMobile.matches) {
                main.classList.add("show");
            } else {
                main.classList.add("active");
            }
        }
    }
}

// Handles the transition end event for the image element.
// Class "active" is used to show the hidden image of me. Removing it hides the image again.
// Class "show" is used to show the biography under my name.
function imgTransitionEnd(e) {
    if (e.propertyName === "transform" && !firstTransitionDone) {
        setTimeout(() => {
            main.classList.remove("active");
            firstTransitionDone = true;
        }, 400);
    } else if (e.propertyName === "transform" && firstTransitionDone) {
        main.classList.add("show");
    }
}

// Adds the intro-done class to the main element.
// Class "intro-done" is used to shift the layout of the website to its final state after the intro animation is complete.
// If the user is on a mobile device, the body is made scrollable after the intro animation is complete.
function bioTransitionEnd(e) {
    if (e.propertyName === "height") {
        main.classList.add("intro-done");
        if (isMobile.matches) {
            document.body.classList.add("scrollable");
        }
    }
}

// Adds the shifted class to the main element after the final layout transition is complete.
// Class "shifted" is used to turn the main body container's opacity from 0 to 1.
function mainBodyTransitionEnd(e) {
    if (e.propertyName === "width") {
        main.classList.add("shifted");
    }
}

// Handles dialogue progression on click, keydown, or wheel events.
function handleDialogue(){
    if (!isTyping && dialogueIndex < introDialogue.length - 1) {
        dialogue.innerHTML = "";
        dialogueIndex++;
        if (dialogueIndex === introDialogue.length - 1) {
            arrow.style.display = "none";
        }
        typeWriter(introDialogue[dialogueIndex], 0);
    }
}

// Blinks the arrow every 500ms if typewriter is done, otherwise hidden.
setInterval(() => {
    if (!isTyping) {
        arrow.style.visibility = arrow.style.visibility === "hidden" ? "" : "hidden";
    } else arrow.style.visibility = "hidden";
}, 500);

// Starts typewriter on page load.
document.addEventListener("DOMContentLoaded", function() {
    arrow.style.visibility = "hidden";
    arrow.innerHTML = " >";
    typeWriter(introDialogue[dialogueIndex], 0);
});

// Event Listeners
myImage.addEventListener("transitionend", imgTransitionEnd);
bioContainer.addEventListener("transitionend", bioTransitionEnd);
mainBodyContainer.addEventListener("transitionend", mainBodyTransitionEnd);
main.addEventListener("click", handleDialogue);
window.addEventListener("keydown", handleDialogue);
main.addEventListener("wheel", handleDialogue);
