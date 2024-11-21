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
		game.currencies.particles.add(tickspeed.mul(new Decimal("1")));
		game.currencies.electricity.sub(tickspeed.mul(new Decimal("1")));
	} else {
		game.currencies.electricity.add(tickspeed.mul(new Decimal("1")));
	}
}

function updateHTML() {
	$("#currency--electricity").text(games.currencies.electricity.toString());
	$("#currency--money").text(games.currencies.money.toString());
	$("#currency--particles").text(games.currencies.particles.toString());
}

function setParticleButtonState(state) {
	game.generators.particle.pressed = state;
}
