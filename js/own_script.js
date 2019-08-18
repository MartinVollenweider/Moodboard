$( document ).ready(function() {

	// Neues Bild via Form einfügen
	$('#formFooter').submit( function(e) {
		// https://stackoverflow.com/questions/5392344/sending-multipart-formdata-with-jquery-ajax
		// Antwort von Devin Venable
		e.preventDefault();
		var data = new FormData(this);

		$.ajax({
			url: 'insertImage.php',
			data: data,
			contentType: false,
			processData: false,
			type: 'POST',
			success: function(data){
				// An bestehende Bilder anhängen
				$('#show').append(data);
				//console.log(data);
				// Funktion aufrufen um draggable zu machen
				makeDraggable()
			}
		});
	});

	// zeige alle Bilder
	$.ajax({
		url: 'showImage.php',
		type: 'POST',
		success: function(data){
			// Alles von DB neu einfügen
			$("#show").html(data);
				// Funktion aufrufen um draggable zu machen
			makeDraggable()
		}
	});

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
		Draggables = Subjx('.draggable').drag(methods);
	};


	methods = {
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
			var data = "id=";
			data += id;
			data += "&x=";
			data += x;
			data += "&y=";
			data += y;
			data += "&w=";
			data += w;
			data += "&h=";
			data += h;
			data += "&rot=";
			data += rot;
			//console.log(data);

			// In DB speichern
			$.ajax({
				url: 'updateImage.php',
				data: data,
				cache: false,
				contentType: false,
				processData: false,
				type: 'GET',
				success: function(data){
					// Do nothing
				}
			});
		}
	};
});
