const TODOBox = document.getElementById("todo-box");
const DONEBox = document.getElementById("done-box");

let TODOData = ["Design page", "Add PHP"];
let DONEData = ["Page styling", "Add JavaScript", "Finish project"];



function createListBoxItem(data, isDone) {
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("item-btn");

    deleteButton.addEventListener("click", () => {
        if (isDone) {
            const index = DONEData.indexOf(data);

            DONEData.splice(index, 1);

            showDONEData();
        } else {
            const index = TODOData.indexOf(data);

            TODOData.splice(index, 1);

            showTODOData();
        }
    });
    
    let buttonText = document.createTextNode("x");
    deleteButton.appendChild(buttonText);

    const moveButton = document.createElement("button");
    moveButton.classList.add("item-btn");

    moveButton.addEventListener("click", () => {
        if (isDone) {
            const index = DONEData.indexOf(data);

            DONEData.splice(index, 1);
            TODOData.push(data);
        } else {
            const index = TODOData.indexOf(data);

            TODOData.splice(index, 1);
            DONEData.push(data);
        }

        showDONEData();
        showTODOData();
    });

    buttonText = document.createTextNode(isDone ? "<-" : "->");
    moveButton.appendChild(buttonText);

    const buttonBox = document.createElement("div");
    buttonBox.classList.add("button-box");
    
    if (isDone) {
        buttonBox.appendChild(moveButton);
        buttonBox.appendChild(deleteButton);
    } else {
        buttonBox.appendChild(deleteButton);
        buttonBox.appendChild(moveButton);
    }

    const p = document.createElement('p');
    const pText = document.createTextNode(data);
    p.appendChild(pText);

    const listBoxItem = document.createElement("div");
    listBoxItem.classList.add("list-box-item");
    listBoxItem.appendChild(p);
    listBoxItem.appendChild(buttonBox);

    return listBoxItem;
}

function clearDOM(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function showTODOData() {
    clearDOM(TODOBox);

    TODOData.forEach(element => {
        TODOBox.appendChild(createListBoxItem(element, false));
    });
}

function showDONEData() {
    clearDOM(DONEBox);

    DONEData.forEach(element => {
        DONEBox.appendChild(createListBoxItem(element, true));
    });
}



searchBox.addEventListener("search", () => {
    const result = searchBox.value;
    
    if (result !== "") {
        TODOData.push(result);
        showTODOData();

        searchBox.value = "";
    }
});



showTODOData();
showDONEData();