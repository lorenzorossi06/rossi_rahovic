function assignButtonIds() {
    const lis = document.querySelectorAll('.nav.one ul li');
    for(let i = 0; i < lis.length; i++) {
      const li = lis[i];
      const id = `button-${i + 1}`;
      li.setAttribute('id', id);
    }
  }
  
function addNavListener() {
  const lis = document.querySelectorAll('.nav.one ul li');
  for(let i = 0; i < lis.length; i++) {
    const li = lis[i];
    li.addEventListener('click', function(event) {
      console.log(event.target.id);
    });
  }
}

fetch('file JSON/gruppi.json')
  .then(response => response.json())
  .then(data => {
    // Utilizza l'oggetto JavaScript convertito da JSON
    console.log(data);
  });

assignButtonIds();
addNavListener();