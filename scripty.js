const karty = document.querySelectorAll(".pex-karta");

let uzJeOtoceno = false;
let prvniKarta, druhaKarta;



function otocKartu() {
//test funkčnosti
//console.log("Jo tu jsom");
//console.log(this)

//změň třídu
  this.classList.toggle("flip");

  if (!uzJeOtoceno) {
    // první click
    uzJeOtoceno = true;
    prvniKarta = this;
  } else {
    // druhý clik
    uzJeOtoceno = false;
    druhaKarta = this;

   //mam dvě karty a teď jenom porovnat - příprava
   console.log(prvniKarta.dataset.jmeno);
   console.log(druhaKarta.dataset.jmeno);
  }
}

karty.forEach(karta => karta.addEventListener("click", otocKartu)); 