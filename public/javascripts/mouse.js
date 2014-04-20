// -----------------------
// Evenements Souris
// -----------------------
	
$(document).ready(function() {
	
	// Click souris enfoncé sur le canvas, je dessine :
	canvas.mousedown(function(e) {
		moveStart(e, false);

	});
	
	// Relachement du Click sur tout le document, j'arrête de dessiner :
	$(this).mouseup(function() {
		moveEnd();
	});
	
	// Mouvement de la souris sur le canvas :
	canvas.mousemove(function(e) {
		move(e, false, this);
	});
});