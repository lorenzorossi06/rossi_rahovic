let data;
let button;
let Item = [];
let selezionato = { R: null, oggetto: null, nome: null };

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

function addNavListener(tag, funzione) {
  const lis = document.querySelectorAll(tag);
  for (let i = 0; i < lis.length; i++) {
    const li = lis[i];
    li.addEventListener("click", function (event) {

      addActive(lis, li);
      button = event.target.id;
      let content = event.target.textContent.trim();

      if (funzione == 1) {
        selezionato["oggetto"] = content;
        console.log(selezionato);
      } else {
        selezionato = { R: null, oggetto: null, nome: null };
        selezionato["R"] = content;
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

=======
  addNavListener(".nav.one > ul > li", 0);

  assignButtonIds(".nav.one > ul > li > i");
  addNavListener(".nav.one > ul > li > i", 0);
});
