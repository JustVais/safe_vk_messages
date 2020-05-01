console.clear();

function checkingForNewElements() {
    new Promise(() => {
        let oldMesCount = 0;

        setInterval(() => {
            let elements = document.getElementsByClassName("im-mess--text");

            if (elements.length > oldMesCount) {
                oldMesCount = elements.length;
                decodeMessages(elements);
            }
        }, 2000);
    });
}


let decodeMessages = (elements) => {
    for (let i = 0; i < elements.length; i++) {
        if (!elements[i].classList.contains('decoded')) {
            elements[i].innerHTML = "true";
        }

        elements[i].classList.add("decoded");
    }
}

checkingForNewElements();