const secondDiv = document.querySelector('.nav.two > ul')
let data;
let button;
let Item = [];

function assignButtonIds(tag) {
  const lis = document.querySelectorAll(tag);
  for (let i = 0; i < lis.length; i++) {
    const li = lis[i];
    const id = i;
    li.setAttribute('id', id);
  }
}

function addActive(lis, clicked) {
  lis.forEach(li=>{
    li.classList.remove("active")
  })
  clicked.classList.add("active")
}

function addNavListener(tag) {
  const lis = document.querySelectorAll(tag);
  for (let i = 0; i < lis.length; i++) {
    const li = lis[i];
    li.addEventListener('click', function(event) {
      addActive(lis,li)      
      button = event.target.id;
      displayData()
    });
  }
}

function readData() {
  return fetch('file JSON/gruppi.json')
    .then(response => response.json())
    .then(result => {
      data = result; 
    });
}

function displayData() {  
  secondDiv.innerHTML = ''
  Item = []
  for (let key of Object.values(data[button])){
    for (let value of key){
      Item.push(value)
    }
  }
  
  Item.forEach(item => {
    secondDiv.insertAdjacentHTML('beforeend',`<li>${item}</li>`)
  }) 
}

readData().then(() => {
  assignButtonIds('.nav.one > ul > li');
  addNavListener('.nav.one > ul > li');

  assignButtonIds('.nav.one > ul > li > i');
  addNavListener('.nav.one > ul > li > i');
});


