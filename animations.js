const searchBox = document.querySelector("input");
const plusButton = document.getElementById("plus-btn");



function showSearchBox() {
    searchBox.classList.remove("end-animation");
    searchBox.classList.add("start-animation");
    searchBox.style.top = 0;
}

function hideSearchBox() {
    searchBox.classList.remove("start-animation");
    searchBox.classList.add("end-animation");
    searchBox.style.top = "-100px";
}



plusButton.addEventListener("click", showSearchBox);

searchBox.addEventListener("search", hideSearchBox);