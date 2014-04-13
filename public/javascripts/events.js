// -----------------------
// Fonctions Event :
// -----------------------

// Fonction de mouvement :
function move(e, mobile, obj) {
	// Si je suis en train de dessiner (click souris enfoncé) :
	if (painting) {
		if (mobile) {
			// Event mobile :
			var ev = e.originalEvent;
			e.preventDefault();
			
			// Set Coordonnées du doigt :
			// cursorX = (ev.pageX - obj.offsetLeft); // 10 = décalage du curseur
			// cursorY = (ev.pageY - obj.offsetTop);
			cursorX = (ev.targetTouches[0].pageX - obj.offsetLeft); // 10 = décalage du curseur
			cursorY = (ev.targetTouches[0].pageY - obj.offsetTop);
            socket.emit('ardoise_move',{painting:true,X:cursorX,Y:cursorY});
		}
		else {
			// Set Coordonnées de la souris :
			cursorX = (e.pageX - obj.offsetLeft); // 10 = décalage du curseur
			cursorY = (e.pageY - obj.offsetTop);
            socket.emit('ardoise_move',{painting:true,X:cursorX,Y:cursorY});
		}
		
		// Dessine une ligne :
		drawLine();
	}
}

// Fonction fin de mouvement :
function moveEnd() {
	painting = false;
	started = false;
    socket.emit('ardoise_end',{painting:false,started:false});
}

//  Fonction début de mouvement :
function moveStart(e, mobile) {
	painting = true;

	// Coordonnées de la souris :
	if (mobile) {
		// Event mobile :
		var ev = e.originalEvent;
		e.preventDefault();
		
		// Set Coordonnées du doigt :
		cursorX = (ev.pageX - obj.offsetLeft); // 10 = décalage du curseur
		cursorY = (ev.pageY - obj.offsetTop);
        socket.emit('ardoise_start',{painting:true,X:cursorX,Y:cursorY});
	}
	else {
		// Set Coordonnées de la souris :
		cursorX = (e.pageX /*- this.offsetLeft*/);
		cursorY = (e.pageY /*- this.offsetTop*/);
        socket.emit('ardoise_start',{painting:true,X:cursorX,Y:cursorY});
	}
}
