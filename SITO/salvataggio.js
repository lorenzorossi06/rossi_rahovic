const secondDiv = document.querySelector(".table");

let chiavi = localStorage.getItem("chiavi")
chiavi = parseInt(chiavi);


a =localStorage.getItem(chiavi-1)
a = JSON.parse(a)
console.log(a["R"])

for (let i = 0; i<chiavi; i++){
    dict =localStorage.getItem(i)
    dict = JSON.parse(dict)
    
    let nome = dict["nome"]
    let categoria = dict["categoria"]
    let oggeto = dict["oggetto"]
    let r = dict["R"]
    let selezionatoDiv = document.querySelector(".table");
    selezionatoDiv.insertAdjacentHTML("beforeend", `<tr class="${i}">
    <td>${nome}</td>
    <td>${categoria}</td>
    <td>${oggeto}</td>
    <td>${r}</td>
    </tr>`);
}


