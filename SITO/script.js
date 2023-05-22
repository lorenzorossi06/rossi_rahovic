const secondDiv = document.querySelector('.two')
let data;
let button;
let Item = [];

function assignButtonIds() {
  const lis = document.querySelectorAll('.nav.one ul li');
  for (let i = 0; i < lis.length; i++) {
    const li = lis[i];
    const id = i;
    li.setAttribute('id', id);
  }
}

function addNavListener() {
  const lis = document.querySelectorAll('.nav.one ul li');
  for (let i = 0; i < lis.length; i++) {
    const li = lis[i];
    li.addEventListener('click', function(event) {
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
  Item = []
  for (let key of Object.values(data[button])){
    for (let value of key){
      Item.push(value)
    }
  }
  
  Item.forEach(item => {
    secondDiv.insertAdjacentHTML('beforeend',`<ul><li>${item}</li></ul>`)
  }) 
}

readData().then(() => {
  assignButtonIds();
  addNavListener();
});


