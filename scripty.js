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
  } 
  else {
    // druhý clik
    uzJeOtoceno = false;
    druhaKarta = this;

   //mam dvě karty a teď jenom porovnat - příprava - beru karty do paměti pomocí data-jmena (dataset)
  // console.log(prvniKarta.dataset.jmeno);
  // console.log(druhaKarta.dataset.jmeno);
   //porovnávám karty
    if (prvniKarta.dataset.jmeno === druhaKarta.dataset.jmeno) {
      // pokud máme schodu jmen - odstraň aktivitu
      prvniKarta.removeEventListener("click", otocKartu);
      druhaKarta.removeEventListener("click", otocKartu);
    } 
    // kontrola
    // console.log("provedeno")
    else {
       // není pár + dát dost času na vidění
       setTimeout(() => {
        prvniKarta.classList.remove("flip");
        druhaKarta.classList.remove("flip");
      }, 1200);
    }
  }
}

karty.forEach(karta => karta.addEventListener("click", otocKartu)); 