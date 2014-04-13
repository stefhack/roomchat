// ----------------------------------
// Paint :
// ----------------------------------

$(document).ready(function() {
	// Pour chaque carré de couleur :
	$("#couleurs a").each(function() {
		// Je lui attribut une couleur de fond :
		$(this).css("background", $(this).attr("data-couleur"));
		
		// Et au click :
		$(this).click(function() {
			// Je change la couleur du pinceau :
			color = $(this).attr("data-couleur");
			
			// Et les classes CSS :
			$("#couleurs a").removeAttr("class", "");
			$(this).attr("class", "actif");
			
			return false;
		});
	});
	
	// Largeur du pinceau :
	$("#largeurs_pinceau input").change(function() {
		if (!isNaN($(this).val())) {
			width_brush = $(this).val();
			$("#output").html($(this).val() + " pixels");
		}
	});
});


// -----------------------
// Fonctions de dessin :
// -----------------------

// Fonction qui dessine une ligne :
function drawLine() {
	// Si c'est le début, j'initialise
	if (!started) {
	    // Je place mon curseur pour la première fois :

		context.beginPath();

		context.moveTo(cursorX, cursorY);
		started = true;
	} 
	// Sinon je dessine
	else
	{


		context.lineTo(cursorX, cursorY);
		context.strokeStyle = color;
		context.lineWidth = width_brush;
		context.stroke();
	}
}


// Clear du Canvas :
function clear_canvas() {
	context.clearRect(0,0, canvas.width(), canvas.height());
}

