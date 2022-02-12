const karty = document.querySelectorAll(".pex-karta");

function otocKartu() {
//test funkčnosti
//console.log("Jo tu jsom");
//console.log(this)

//změň třídu
  this.classList.toggle("flip");
}

karty.forEach(karta => karta.addEventListener("click", otocKartu));