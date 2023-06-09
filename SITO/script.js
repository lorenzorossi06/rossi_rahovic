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
        nav2.style.color = 'white';
        
      } else {
        selezionato = {R: null, categoria: null, oggetto: null, nome: null};
        selezionato["categoria"] = content;
        nav1.style.color = 'white';
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

function saveItem(selezionato){
  let chiavi = localStorage.getItem("chiavi")
  chiavi = parseInt(chiavi);
  
  if (isNaN(chiavi)) {
    console.log(chiavi)
    localStorage.clear()
    localStorage.setItem("chiavi", 0)
    chiavi = localStorage.getItem("chiavi")
    console.log(chiavi)
  }

  else if (typeof chiavi!= 'number'){
    console.log(chiavi)
    localStorage.clear()
    localStorage.setItem("chiavi", 0)
    chiavi = localStorage.getItem("chiavi")
    console.log(chiavi)
  }
  


  chiavi = parseInt(chiavi);
  localStorage.setItem("chiavi", chiavi + 1)
  localStorage.setItem(chiavi, JSON.stringify(selezionato))
  // localStorage.clear(  )
};

const submit = document.querySelector('button');
const input = document.querySelector('input');

submit.addEventListener('click', function() {
  let nome = input.value;
  nome = nome.trim()
  if (nome == "" || nome == null){
    submit.style.backgroundColor = "red"
  }
  
  else if(selezionato["oggetto"] != null && selezionato["R"] != null && selezionato["categoria"] != null){
    selezionato["nome"] = nome
    saveItem(selezionato)
    selezionato = { "R": null, "categoria": null, "oggetto": null, "nome": null };
    input.value = null
    submit.style.backgroundColor = 'rgb(4, 255, 4)'

    const lis1  = document.querySelectorAll(".nav.one > ul > li");
    lis1.forEach((li) => {
      li.classList.remove("active");
    });

    const lis2  = document.querySelectorAll(".nav.two > ul > li");
    lis2.forEach((li) => {
      li.classList.remove("active");
    });
  }

  else if( selezionato["categoria"] == null){
    nav1.style.color = 'red';
  }

  else if (selezionato["oggetto"] == null){
    nav2.style.color = 'red';
  }

  if (nome != "" && nome != null){
    submit.style.backgroundColor = "rgb(4, 255, 4)"
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
