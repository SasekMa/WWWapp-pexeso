const karty = document.querySelectorAll(".pex-karta");

    if(typeof(Storage) !== "undefined") {
    let osloveni = localStorage.getItem("osloveni");
    const ulozHrac = document.getElementById("ulozHrac");
    console.log(osloveni);
    if(osloveni) {
        document.getElementById("uvitani").innerHTML = osloveni;
        document.getElementById("hrac1").innerHTML = osloveni;
    }else {
        document.getElementById("ulozHrac").addEventListener("click", (ev) => {
            let jmeno = document.getElementById("novyHrac").value;

            localStorage.setItem("osloveni", jmeno);
            document.getElementById("uvitani").innerHTML = localStorage.getItem("osloveni");
        });
    }
    ulozHrac.onclick = function () {

    let jmeno = document.getElementById("novyHrac").value;
    document.getElementById("uvitani").innerHTML = jmeno;
    //console.log(jmeno);
    document.getElementById("hrac1").innerHTML = jmeno;
  };
}


let uzJeOtoceno = false;
let prvniKarta, druhaKarta;
let uzamkniHru = false;
let clicks = 0;
let merimeCas = false;
let pocetParu = 0;
let hodnoceni = 0;

function otocKartu() {
    //test funkčnosti
    //console.log("Jo tu jsom");
    //console.log(this)
    
    //spustit časomíru
    if (merimeCas === false) {
        stopky();
        merimeCas = true;
    };
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
      pocetParu++;
      konecHry();
      //console.log(pocetParu);
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
function click() {
        clicks += 1;
        document.getElementById("clicks").innerHTML = clicks;
}
function restart() {
	//reset tahů
    	clicks = 0;
	document.getElementById("clicks").innerHTML = clicks;
        pocetParu = 0;

        karty.forEach(karta => karta.classList.remove("flip"));
        karty.forEach(karta => karta.addEventListener("click", otocKartu));
        setTimeout(zamichej, 1500);
        
        //reset stopky
        merimeCas = false;
        clearInterval(interval);
        minuta = 0;
        sekunda = 0;
        hodina = 0;
    	document.getElementById("minuta").innerHTML = minuta;
        document.getElementById("sekunda").innerHTML = sekunda;
        
        //zavri modal
        modal.style.display = "none";
}
function zamichej() {
   	karty.forEach(karta => {
    let nahodnaPos = Math.floor(Math.random() * 16);
    karta.style.order = nahodnaPos; }); 
}

// stopky
let sekunda = 0, minuta = 0, hodina = 0;
let timer = document.querySelector(".timer");
let interval;

function stopky() {
  interval = setInterval(function() {
    //stopky.innerHTML = minuta+"minut "+sekunda+"sekund";
    sekunda++;
    
    if (sekunda == 60) {
      minuta++;
      sekunda = 0;
    }
    
    if (minuta == 60) {
      hodina++;
      minuta = 0;
    }
    	document.getElementById("minuta").innerHTML = minuta;
        document.getElementById("sekunda").innerHTML = sekunda;
  }, 1000);
}

function konecHry() {
    if (pocetParu == 8) {
      clearInterval(interval);

      document.getElementById("minuta1").innerHTML = minuta;
      document.getElementById("sekunda1").innerHTML = sekunda;
      document.getElementById("clicks1").innerHTML = clicks;
      modal.style.display = "block";
    
    if (clicks <= 12) {
        hodnoceni = "Dokonalé";
    } else if (clicks <= 16) {
        hodnoceni = "Výborné";
    } else if (clicks <= 22) {
        hodnoceni = "Chvalitebné";
    } else if (clicks <= 28) {
        hodnoceni = "Dobré";
    } else {
        hodnoceni = "Nic moc";
    } 
    document.getElementById("hodnoceni").innerHTML = hodnoceni;
  }
}

var modal = document.getElementById("gratulace");
var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
  modal.style.display = "none";
};

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

karty.forEach(karta => karta.addEventListener("click", otocKartu)); 

// ke kontrole
var btn = document.getElementById("myBtn");
btn.onclick = function() {
  modal.style.display = "block";
};


