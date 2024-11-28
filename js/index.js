const game = getNewGameData();

function initialize() {
	// TODO: add saving/loading
	initializeEvents();
	$("#generators").show(0);
	$("#upgrades").hide(0);
	$("#settings").hide(0);
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
	// ...
	$("#generator--money").on("mousedown", () => {
		setMoneyButtonState(true);
	});
	$("#generator--money").on("mouseup", () => {
		setMoneyButtonState(false);
	});
	$("#generator--money").on("touchstart", () => {
		setMoneyButtonState(true);
	});
	$("#generator--money").on("touchend", () => {
		setMoneyButtonState(false);
	});
}

initialize();
