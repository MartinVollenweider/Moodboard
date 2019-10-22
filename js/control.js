// Wenn das Dokument geladen wurde, führe showFunc() aus
document.addEventListener('DOMContentLoaded', showFunc);

/* ********************** showFunc() **** */
function showFunc() {
  var request = new Request('showObject.php', {
      method: 'POST'
  })

  // AJAX, Objekte vom Server, Ergebnis in data
  fetch(request)
    .then(function(response) {
        return response.text();
    })
    .then(function(data) {
        document.querySelector('#show').innerHTML = data;
        makeDraggableFunc();	// Draggable-Funktion aufrufen
    })
    .catch(function(error) {
        console.log('Request failed', error);
    });// Ende fetch

  // Wenn das Formular abgesendet wird, führe insertFunc() aus
  document.querySelector('#formFooter').addEventListener('submit',insertFunc);
} // Ende showFunc
/* ********************** /showFunc() **** */

/* ********************** insertFunc() **** */
function insertFunc(ereignis) {
  ereignis.preventDefault(); // Standardaktion verhindern
  var form = new FormData(document.querySelector('#formFooter'));
  var request = new Request('insertObject.php', {
    method: 'POST',
    body: form
  })

  // Fetch: Sende das neue Objekt per AJAX an den Server
  fetch(request)
    .then(function(response) {
        return response.text();
    })
    .then(function(data) {
        var el = document.createElement('div');
        el.innerHTML = data;
        document.querySelector('#show').appendChild(el.firstChild);
        makeDraggableFunc();	// Draggable-Funktion aufrufen
    })
    .catch(function(error) {
        console.log('Request failed', error);
    });// Ende fetch
}  // Ende insertFunc
/* ********************** /insertFunc() **** */

/* ********************** makeDraggableFunc() **** */
function makeDraggableFunc() {
  //alle Draggables deaktiveren wegen «Geister»-Elementen
  try {
    Draggables.forEach(item => {
      item.disable();
    })
  } catch(err) {
    // nichts tun
  }

  // Mache alle Objekte draggable
  subjx('.draggable').drag(DragMethods);
} // Ende makeDraggableFunc
/* ********************** makeDraggableFunc **** */

//  Funktionen, wenn etwas mit den draggable Objekten gemacht wird.
var DragMethods = {
  // loslassen, sende die Daten an die Datenbank
  onDrop(ereignis, element) {
    // Funktion updateFunc aufgerufen
    updateFunc(element);
  } // Ende onDrop
} // Ende methods

/* ********************** updateFunc() **** */
function updateFunc(element) {
  // Alle Eigenschaften herausfinden:
  var id = element.id; // eg "id_166", only needed "166"
  id = id.replace("id_", "");
  var h = element.clientHeight; // Elementhöhe
  var w = element.clientWidth; // Elementbreite
  var x = element.offsetLeft; // Element: X-Position
  var y = element.offsetTop; // Element: Y-Position
  //var cont = element.innerHTML;
  // Den Rotationswinkel berechnen:
  // https://css-tricks.com/get-value-of-css-rotation-through-javascript/
  var values = element.style.transform.split('(')[1];
    values = values.split(')')[0];
    values = values.split(',');
    var rot = Math.round(Math.asin(values[1]) * (180/Math.PI));
  // URL zusammensetzen
  var currentObject = "?id=";
  currentObject += id;
  currentObject += "&x=";
  currentObject += x;
  currentObject += "&y=";
  currentObject += y;
  currentObject += "&w=";
  currentObject += w;
  currentObject += "&h=";
  currentObject += h;
  currentObject += "&rot=";
  currentObject += rot;

  // In DB speichern: nur Daten schicken, keine Daten empfangen
  var request = new Request('updateObject.php' + currentObject, {
      method: 'GET'
  });

  /* Fetch: URL per AJAX aufrufen, um Daten in DB zu speichern */
  fetch(request)
    .catch(function(error) {
        console.log('Request failed', error);
    });// Ende fetch
} // Ende updateFunc
/* ********************** /updateFunc() **** */
