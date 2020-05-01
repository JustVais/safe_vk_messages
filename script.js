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
        }, 5000);
    });
}


let decodeMessages = (elements) => {
    for (let i = 0; i < elements.length; i++) {
        elements[i].innerHTML = "gg";
    }
}

checkingForNewElements();