const karty = document.querySelectorAll(".pex-karta");

function otocKartu() {
console.log("Jo tu jsom");
console.log(this)

//  this.classList.toggle("flip");
}

karty.forEach(karta => karta.addEventListener("click", otocKartu));