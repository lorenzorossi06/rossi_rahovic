let data;
let button;

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
      console.log(button); 
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

function displayButton() {
  console.log(button); 
}

readData().then(() => {
  assignButtonIds();
  addNavListener();
  displayButton(); 
  console.log(data)
});


