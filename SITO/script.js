const secondDiv = document.querySelector(".nav.two > ul");
let data;
let button;
let Item = [];
let selezionato = { R: null, categoria: null, oggetto: null, nome: null };

const GRUPPI_APPARTENENZA = {
  R1: ["frigoriferi", "congelatori", "condizionatori"],

  R2: ["lavatrici", "lavastoviglie"],

  R3: ["TV Monitor a tubo catodico"],

  R4: [
    "Elettronica di consumo",
    "Telecomunicazioni",
    "Informatica",
    "piccoli elettrodomestici",
    "elettroutensili",
    "giocattoli",
    "apparecchi di illuminazione",
    "dispositivi medici",
  ],

  R5: ["lampade fluorescenti", "sorgenti luminose compatte"],
};

function assignButtonIds(tag) {
  const lis = document.querySelectorAll(tag);
  for (let i = 0; i < lis.length; i++) {
    const li = lis[i];
    const id = i;
    li.setAttribute("id", id);
  }
}

function addActive(lis, clicked) {
  lis.forEach((li) => {
    li.classList.remove("active");
  });
  clicked.classList.add("active");
}

function getR(object){
  for (let r of Object.keys(GRUPPI_APPARTENENZA)){
    for (let o of GRUPPI_APPARTENENZA[r]){
      if (object == o){
        return r
      }
    }
  }
}

function addNavListener(tag, funzione) {
  const lis = document.querySelectorAll(tag);
  for (let i = 0; i < lis.length; i++) {
    const li = lis[i];
    li.addEventListener("click", function (event) {

      addActive(lis, li);
      button = event.target.id;
      let content = event.target.textContent.trim();

      if (funzione == 1) {
        let r = getR(content)
        selezionato["oggetto"] = content;
        selezionato["R"] = r
        // console.log(selezionato);

      } else {
        selezionato = {R: null, categoria: null, oggetto: null, nome: null};
        selezionato["categoria"] = content;
        displayData();
      }
    });
  }
}

function readData() {
  return fetch("file JSON/gruppi.json")
    .then((response) => response.json())
    .then((result) => {
      data = result;
    });
}

function displayData() {
  secondDiv.innerHTML = "";
  Item = [];

  for (let value of Object.values(data[button])) {
    Item.push(value);
  }

  Item.forEach((item) => {
    secondDiv.insertAdjacentHTML("beforeend", `<li>${item}</li>`);
  });

  addNavListener(".nav.two > ul > li", 1);
}

readData().then(() => {
  assignButtonIds(".nav.one > ul > li");
  addNavListener(".nav.one > ul > li", 0);

  assignButtonIds(".nav.one > ul > li > i");
  addNavListener(".nav.one > ul > li > i", 0);
});

// gestione pulsanti

const lista= document.querySelectorAll("li")
const pulsante = document.querySelector("button")
const nomeProd = document.querySelector(".desc").value

let elementiAttivi = []

function attivi(elems, attivi) {
  attivi = []
  console.log(attivi)
  elems.forEach(elem => {
    if (elem.classList.contains("active")) {
      attivi.push(elem)
    }
  })
  console.log(attivi)
  if (attivi.length != 2) {
    return false
  } else {
    return true
  }
}
  document.addEventListener("click", () => {
    let esito=attivi(lista, elementiAttivi)
    console.log(esito)
  })

if (nomeProd != "") {
  pulsante.style.backgroundColor = "green"
}
