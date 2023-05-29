const secondDiv = document.querySelector(".nav.two > ul");
let data;
let button;
let Item = [];
let selezionato = { "R": null, "categoria": null, "oggetto": null, "nome": null };

const nav1 = document.querySelector('.nav.one > header');
const nav2 = document.querySelector('.nav.two > header');

const GRUPPI_APPARTENENZA = {
  R1: ["Frigoriferi", "Congelatori", "Condizionatori"],

  R2: ["Lavatrici", "Lavastoviglie"],

  R3: ["TV Monitor a tubo catodico"],

  R4: [
    "Elettronica di consumo",
    "Telecomunicazioni",
    "Informatica",
    "Piccoli elettrodomestici",
    "Elettroutensili",
    "Giocattoli",
    "Apparecchi di illuminazione",
    "Dispositivi medici",
  ],

  R5: ["Lampade fluorescenti", "Sorgenti luminose compatte"],
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
        console.log(r)
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
        nav2.style.color = 'black';
        
      } else {
        selezionato = {R: null, categoria: null, oggetto: null, nome: null};
        selezionato["categoria"] = content;
        nav1.style.color = 'black';
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

const submit = document.querySelector('button');
const input = document.querySelector('input');

submit.addEventListener('click', function() {
  let nome = input.value;
  nome = nome.trim()
  if (nome == "" || nome == null){
    submit.style.backgroundColor = "red"
  } else{
    submit.style.backgroundColor = "rgb(4, 255, 4)"
  }

  if( selezionato["categoria"] == null){
    nav1.style.color = 'red';
  }

  if (selezionato["oggetto"] == null){
    nav2.style.color = 'red';
  }

  else{
    selezionato["nome"] = nome
    console.log(selezionato)
    selezionato = { "R": null, "categoria": null, "oggetto": null, "nome": null };
  }
});

readData().then(() => {
  assignButtonIds(".nav.one > ul > li");
  addNavListener(".nav.one > ul > li", 0);

  assignButtonIds(".nav.one > ul > li > i");
  addNavListener(".nav.one > ul > li > i", 0);
});

// gestione pulsanti

// const lista= document.querySelectorAll("li")
// const pulsante = document.querySelector("button")
// const nomeProd = document.querySelector(".desc").value

// let elementiAttivi = []

// function attivi(elems, attivi) {
//   attivi = []
//   console.log(attivi)
//   elems.forEach(elem => {
//     if (elem.classList.contains("active")) {
//       attivi.push(elem)
//     }
//   })
//   console.log(attivi)
//   if (attivi.length != 2) {
//     return false
//   } else {
//     return true
//   }
// }
//   document.addEventListener("click", () => {
//     let esito=attivi(lista, elementiAttivi)
//     console.log(esito)
//   })

// if ( != "") {
//   pulsante.style.backgroundColor = "green"
// } else {
//   pulsante.style.backgroundColor = "red"
// }
