// Wenn das Dokument geladen wurde, führe initFunc() aus
document.addEventListener('DOMContentLoaded', initFunc);

/**
 * Lade und zeige alle Bilder
 */
function initFunc() {
  var url = 'showObject.php';
  var request = new Request(url);

  /* Fetch: Per AJAX alle Objekte vom Server laden */
  /* Ergnis von Server ist in data */
  fetch(request)
  .then(response => response.text())
  .then(data => {
    console.log(data);
    document.querySelector('#show').innerHTML = data;
    makeDraggable();
  })
  .catch(error => {
    console.log('Request failed', error);
  });/*- Ende fetch */

  // Neues Bild via Form einfügen:
  // Wenn das Formular abgesendet wird, führe insertFunc() aus
  document.querySelector('#formFooter').addEventListener('submit',insertFunc);
}; /* Ende initFunc */

/**
 * Ein neues Bild einfügen
 */
function insertFunc(ereignis) {
// https://stackoverflow.com/questions/5392344/sending-multipart-formdata-with-jquery-ajax
// Antwort von Devin Venable
// Verhindere, dass die Standardaktion ausgeführt wird: Formular an den PHP Server senden
ereignis.preventDefault();
// https://time2hack.com/2018/08/upload-files-to-php-backend-using-fetch-formdata/

var form = new FormData(document.querySelector('#formFooter'));
var url = 'insertObject.php'
var request = new Request(url, {
  method: 'POST',
  body: form
});

  /* Fetch: Sende das neue Bild per AJAX an den Server */
fetch(request)
  .then(response => response.text())
  .then(data => {
    // Erhalte als Antwort alle Objekte
    // und ersetze das aktuelle HTML mit dem neuen vom Server
    console.log(data);
    var el = document.createElement('div');
    el.innerHTML = data;
    document.querySelector('#show').appendChild(el.firstChild);
    makeDraggable();
  })
  .catch(error => {
    console.log('Request failed', error);
  });/* Ende fetch */
};  /* Ende insertFunc */

/**
 * Objekte draggable machen
 */
function makeDraggable() {
  // Probiere alle Draggables zu deaktiveren…
  // weil sonst «Geister»-Elemnte ohne Inhalt, nur mit Anfassern zurückbleiben
  try {
    Draggables.forEach(item => {
      item.disable();
    })
  } catch(err) {
    // … und gebe eine Meldung aus, wenn es keine gibt
    console.log("no Draggable objects");
  }

  // Mache alle Objekte draggable
  Draggables = Subjx('.draggable').drag(DragMethods);
};

/**
 * Eine Sammlung von Funktionen, die aufgerufen wird, wenn etwas mit den draggable Objekten gemacht wird.
 */
var DragMethods = {
  /**
   * Wenn ein Objekt losgelassen wird:
   * Sende die Daten an die Datenbank
   */
  onDrop(ereignis, element) {
    // Alle Eigenschaften herausfinden:
    var id = element.id;   // eg "id_166", but only needed "166"
    id = id.substring(3, id.length);
    var h = element.clientHeight; // Elementhöhe
    var w = element.clientWidth; // Elementbreite
    var x = element.offsetLeft; // Element: X-Position
    var y = element.offsetTop; // Element: Y-Position
    var cont = element.innerHTML;
    // Den Rotationswinkel berechnen:
    // https://css-tricks.com/get-value-of-css-rotation-through-javascript/
    var values = element.style.transform.split('(')[1],
    values = values.split(')')[0],
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
    var url = 'updateObject.php' + currentObject;
    console.log(url);
    var request = new Request(url, {
        method: 'GET'
    });

    /* Fetch: URL per AJAX aufrufen, um Daten in DB zu speichern */
    fetch(request)
      .catch(error => {
          console.log('Request failed', error);
      });/*- Ende fetch */
  } /* Ende onDrop */
}; /* Ende methods */
