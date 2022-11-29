const TODOBox = document.getElementById("todo-box");
const DONEBox = document.getElementById("done-box");
const filterBox = document.getElementById('filter-box');

let TODOData = [];
let DONEData = [];
let filterData = [];

GET("todo.php", (data) => {
    TODOData = data;

    showTODOData();
});

GET("done.php", (data) => {
    DONEData = data;

    showDONEData();
});

GET("filter.php", (data) => {
    filterData = data;
});


function createListBoxItem(data, isDone) {
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("item-btn");

    deleteButton.addEventListener("click", () => {
        if (isDone) {
            const index = DONEData.indexOf(data);

            DONEData.splice(index, 1);
            POST("done.php", DONEData);
            showDONEData();
        } else {
            const index = TODOData.indexOf(data);

            TODOData.splice(index, 1);
            POST("todo.php", TODOData);
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

            POST("todo.php", TODOData);
            POST("done.php", DONEData);
        } else {
            const index = TODOData.indexOf(data);

            TODOData.splice(index, 1);
            DONEData.push(data);

            POST("done.php", DONEData);
            POST("todo.php", TODOData);
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

function createFilterList(data) {
    const filterUl = document.createElement("ul");

    data.forEach(element => {
        const filterLi = document.createElement("li");
        filterLi.appendChild(document.createTextNode(element));

        filterLi.addEventListener("click", () => {
            searchBox.value = element;

            clearDOM(filterBox);
        });

        filterUl.appendChild(filterLi);
    });

    return filterUl;
}



searchBox.addEventListener("search", () => {
    clearDOM(filterBox);

    const result = searchBox.value;
    
    if (result !== "") {
        TODOData.push(result);

        POST("todo.php", TODOData);
        showTODOData();

        if (!filterData.includes(result.toLowerCase())) {
            filterData.push(result.toLowerCase());

            POST("filter.php", filterData);
        }

        searchBox.value = "";
    }
});

searchBox.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        return;
    }

    const result = searchBox.value.toLowerCase();
    let filterResult = [];  

    filterData.forEach(element => {
        if (element.startsWith(result)) {
            filterResult.push(element);
        }
    });

    clearDOM(filterBox);

    const filterElement = createFilterList(filterResult);

    filterBox.appendChild(filterElement);
});



showTODOData();
showDONEData();