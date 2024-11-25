const game = getNewGameData();

function initialize() {
	// TODO: add saving/loading
	initializeEvents();
}

/**
 * Initializes the events for the HTML elements.
 */
function initializeEvents() {
	$("#generator--particles").on("mousedown", () => {
		setParticleButtonState(true);
	});
	$("#generator--particles").on("mouseup", () => {
		setParticleButtonState(false);
	});
	$("#generator--particles").on("touchstart", () => {
		setParticleButtonState(true);
	});
	$("#generator--particles").on("touchend", () => {
		setParticleButtonState(false);
	});
}

initialize();
