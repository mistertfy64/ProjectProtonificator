const UPDATE_INTERVAL = 100;
const TICK_INTERVAL = new Decimal(1);

setInterval(() => {
	doLoopStep();
}, UPDATE_INTERVAL);

function doLoopStep() {
	// update variables
	updateVariables();
	// update html
	updateHTML();
}

function updateVariables() {
	const tickspeed = new Decimal(1).div(TICK_INTERVAL);
	if (game.generators.particle.pressed) {
		game.currencies.particles = game.currencies.particles.add(
			tickspeed.mul(new Decimal("1"))
		);
		game.currencies.electricity = game.currencies.electricity.sub(
			tickspeed.mul(new Decimal("1"))
		);
	} else {
		game.currencies.electricity = game.currencies.electricity.add(
			tickspeed.mul(new Decimal("1"))
		);
	}
}

function updateHTML() {
	$("#currency--electricity").text(game.currencies.electricity.toString());
	$("#currency--money").text(game.currencies.money.toString());
	$("#currency--particles").text(game.currencies.particles.toString());
}

function setParticleButtonState(state) {
	game.generators.particle.pressed = state;
}
