console.clear();

checkingForNewElements = () => {
    new Promise(() => {
        setInterval(() => {
            let elements = document.getElementsByClassName("im-mess--text");

            if (elements.length > oldMesCount) {
                oldMesCount = elements.length;
                decodeMessages(elements);
            }
        }, 2000);
    });
}

const decodeMessages = (elements) => {
    for (let i = 0; i < elements.length; i++) {
        if (!elements[i].classList.contains('decoded')) {
            elements[i].innerHTML = "true";
            elements[i].classList.add("decoded");
        }
    }
}

const getOriginalInput = () => {
    return document.getElementsByClassName("_im_text")[0];
}

const removeClassFromOriginalInput = () => {
    originalInput.classList.remove("_im_text");
}

const createHiddenInput = () => {
    let newInput = document.createElement("div");

    newInput.classList.add("_im_text");
    newInput.innerHTML = "hey";
    newInput.style.display = "none";
    document.getElementsByClassName("_im_text_wrap")[0].appendChild(newInput);

    return newInput;
}

const putTextToHiddenInput = (text) => {
    hiddenInput.innerHTML = text;
}

const clickOnOtherDialog = () => oldMesCount = 0;

const observerСallback = () => {
    let currentTextInOrigInput = originalInput.innerHTML;

    putTextToHiddenInput(currentTextInOrigInput);
};

const addClickHandlers = () => {
    const allDialogs = document.getElementsByClassName("nim-dialog");

    for (let i = 0; i < allDialogs.length; i++) 
        allDialogs[i].addEventListener('click', clickOnOtherDialog);
}

let oldMesCount = 0;

let hiddenInput = createHiddenInput();
let originalInput = getOriginalInput();

removeClassFromOriginalInput();


const observer = new MutationObserver(observerСallback);

const observerConfig = { childList: true, subtree: true, characterData: true };

observer.observe(originalInput, observerConfig);

addClickHandlers();

checkingForNewElements();