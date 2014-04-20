// -----------------------
// Init du paint, c'est ici qu'on défini tout :)
// -----------------------


// Variables :
var color = "#000000"; // Couleur du pinceau
var width_brush = 6; // Largeur du pinceau
var painting = false; // Suis-je en train de dessiner ?
var started = false; // Ai-je commencé à dessiner ?
var canvas, context, cursorX, cursorY; // Variables concernant le canvas définies plus tard

$(document).ready(function() {

	// -----------------------
	// Ajout du canvas :
	// -----------------------
	
	var largeur_canvas = $(window).width()-100;
	var hauteur_canvas = $(window).height()-150;

	$("body").prepend('<canvas id="canvas"  width="' + largeur_canvas + '" height="' + hauteur_canvas + '"></canvas>');
//$('#cadre_ardoise').prepend('<canvas width="300" height="300" id="canvas"></canvas>');
    //$('h3').prepend('<canvas id="canvas" width="400" height="400"></canvas> ');
	// -----------------------
	// Définition des variables :
	// -----------------------

	// Canvas :
	canvas = $("#canvas");
	
	context = canvas[0].getContext('2d');
     
	// Trait arrondi :
	context.lineJoin = 'round';
	context.lineCap = 'round';

});