const searchBox = document.querySelector("input");
const plusButton = document.getElementById("plus-btn");



plusButton.addEventListener("click", () => {
    searchBox.classList.remove("end-animation");
    searchBox.classList.add("start-animation");
    searchBox.style.top = 0;
});

searchBox.addEventListener("search", () => {
    searchBox.classList.remove("start-animation");
    searchBox.classList.add("end-animation");
    searchBox.style.top = "-100px";
});