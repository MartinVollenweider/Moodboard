document.addEventListener('DOMContentLoaded', initFunc);

function initFunc() {
	// zeige alle Bilder
	var url = 'showImage.php'
	var request = new Request(url, {
		 method: 'POST'
	});
	fetch(request)
		.then(response => response.text())
		.then(data => {
			console.log(data);
			document.querySelector('#show').innerHTML=data;
			makeDraggable();
		})
		.catch(function (error) {
		    console.log('Request failed', error);
		});/*- Ende fetch */

	// Neues Bild via Form einfügen
	document.querySelector('#formFooter').addEventListener('submit',insertFunc);
}; /* Ende initFunc */

function insertFunc(ereignis) {
	// https://stackoverflow.com/questions/5392344/sending-multipart-formdata-with-jquery-ajax
	// Antwort von Devin Venable
	ereignis.preventDefault();
	// https://time2hack.com/2018/08/upload-files-to-php-backend-using-fetch-formdata/

	var form = new FormData(document.querySelector('#formFooter'));
	var url = 'insertImage.php'
	var request = new Request(url, {
	   method: 'POST',
	   body: form
	});

	fetch(request)
	  .then(response => response.text())
	  .then(data => {
			console.log(data);
			var el = document.createElement('div');
			el.innerHTML =  data;
			document.querySelector('#show').appendChild(el.firstChild);
			makeDraggable();
		})
		.catch(function (error) {
				console.log('Request failed', error);
		});/*- Ende fetch */
	};  /* Ende insertFunc */

	// Objekte draggable machen
	function makeDraggable() {
		try {
		  Draggables.forEach(item => {
		    //console.log(item);
		    item.disable();
		  })
		} catch(err) {
		  console.log("no Draggable objects");
		}
		Draggables = Subjx('.draggable').drag(DragMethods);
	};


	DragMethods = {
		onDrop(e, el) {
			// Alle Eigenschaften herausfinden:
			var id = el.id;   // eg id_166, but only needed id_166
			id = id.substring(3, id.length);
			var h = el.clientHeight;
			var w = el.clientWidth;
			var x = el.offsetLeft;
			var y = el.offsetTop;
			var cont = el.innerHTML;
			// https://css-tricks.com/get-value-of-css-rotation-through-javascript/
			var values = el.style.transform.split('(')[1],
			values = values.split(')')[0],
			values = values.split(',');
			var rot = Math.round(Math.asin(values[1]) * (180/Math.PI));
			// URL zusammensetzen
			var currentImage = "?id=";
			currentImage += id;
			currentImage += "&x=";
			currentImage += x;
			currentImage += "&y=";
			currentImage += y;
			currentImage += "&w=";
			currentImage += w;
			currentImage += "&h=";
			currentImage += h;
			currentImage += "&rot=";
			currentImage += rot;

			// In DB speichern
			var url = 'updateImage.php'+currentImage;
			console.log(url);
			var request = new Request(url, {
				 method: 'GET'
			});
			fetch(request)
				.catch(function (error) {
						console.log('Request failed', error);
				});/*- Ende fetch */
		} /* Ende onDrop */
	}; /* Ende methods */
