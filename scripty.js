const karty = document.querySelectorAll(".pex-karta");

let uzJeOtoceno = false;
let prvniKarta, druhaKarta;
let uzamkniHru = false;
let clicks = 0;


function otocKartu() {
    //test funkčnosti
    //console.log("Jo tu jsom");
    //console.log(this)
    
    //znefunkčni při 2+
    if (uzamkniHru) return;
    // deaktivuj dvojklik na stejnou kartu - odstraň problém
    if (this === prvniKarta) return;
    //změň třídu
    this.classList.toggle("flip");

    if (!uzJeOtoceno) {
        // první click
    uzJeOtoceno = true;
    prvniKarta = this;
    
    return;
    }   
    uzJeOtoceno = false;
    druhaKarta = this;
    mamePar();
}

function mamePar() {
    click();
  let jePar = prvniKarta.dataset.jmeno === druhaKarta.dataset.jmeno;

  jePar ? deaktivujKarty() : vratitKarty();
}


function deaktivujKarty() {
      // pokud máme schodu jmen - odstraň aktivitu
      prvniKarta.removeEventListener("click", otocKartu);
      druhaKarta.removeEventListener("click", otocKartu);
    }


function vratitKarty() {
        // není pár + dát dost času na vidění, odemkni karty
    uzamkniHru = true;
    
    setTimeout(() => {
    prvniKarta.classList.remove("flip");
    druhaKarta.classList.remove("flip");
    
    uzamkniHru = false;
    }, 1200);
}

(function zamichat() {
    karty.forEach(karta => {
    let nahodnaPos = Math.floor(Math.random() * 16);
    karta.style.order = nahodnaPos;
    });
})();
//obalení - IIFE na začátku hry

//počet tahů - přídáno k rozhodování o páru karet
    function click() {
        clicks += 1;
        document.getElementById("clicks").innerHTML = clicks;
    };


karty.forEach(karta => karta.addEventListener("click", otocKartu)); 