// -----------------------
// Evenements Mobile
// -----------------------

$(document).ready(function() {

	// Doigt enfoncé sur le canvas, je dessine :
	canvas.bind('touchstart', function(e) {
		moveStart(e, true);
	});
	
	// Relachement du doigt sur tout le document, j'arrête de dessiner :
	$(this).bind('touchend', function() {
		moveEnd();
	});
	
	// Mouvement du doigt sur le canvas :
	canvas.bind('touchmove', function(e) {
		move(e, true, this);
	});

/*
    // Doigt enfoncé sur le canvas, je dessine :
	canvas.bind('pointerdown', function (e)
	{
	    moveStart(e, true);
	});

    // Relachement du doigt sur tout le document, j'arrête de dessiner :
	$(this).bind('pointerup', function ()
	{
	    moveEnd();
	});

    // Mouvement du doigt sur le canvas :
	canvas.bind('pointermove', function (e)
	{
	    move(e, true, this);
	});
       */
});