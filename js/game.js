const UPDATE_INTERVAL = 100;
const TICK_INTERVAL = new Decimal(1);
let lastUpdate = Date.now();

setInterval(() => {
	const now = Date.now();
	const deltaTime = now - lastUpdate;
	lastUpdate = now;
	doLoopStep(deltaTime);
}, UPDATE_INTERVAL);

function doLoopStep(deltaTime) {
	// update variables
	updateVariables(deltaTime);
	// update html
	updateHTML();
}

function updateVariables(deltaTime) {
	const deltaTimeMultiplier = new Decimal(deltaTime).div(new Decimal(1000));
	const tickspeed = new Decimal(1).div(TICK_INTERVAL);
	/* Takes care of the particle generator */
	if (game.generators.particle.pressed) {
		if (game.currencies.electricity.gt(ZERO)) {
			game.currencies.particles = game.currencies.particles.add(
				new Decimal("1").mul(tickspeed).mul(deltaTimeMultiplier)
			);
			game.currencies.electricity = game.currencies.electricity.sub(
				new Decimal("1").mul(tickspeed).mul(deltaTimeMultiplier)
			);
		}
	} else {
		game.currencies.electricity = game.currencies.electricity.add(
			new Decimal("1").mul(tickspeed).mul(deltaTimeMultiplier)
		);
	}
	/* Takes care of the money generator */
	if (game.generators.money.pressed) {
		if (game.currencies.particles.gt(ZERO)) {
			game.currencies.money = game.currencies.money.add(
				game.currencies.particles
			);
			game.currencies.particles = ZERO;
		}
	}
}

function updateHTML() {
	$("#currency--electricity").text(formatNumber(game.currencies.electricity));
	$("#currency--money").text(formatNumber(game.currencies.money));
	$("#currency--particles").text(formatNumber(game.currencies.particles));
}

function setParticleButtonState(state) {
	game.generators.particle.pressed = state;
}

function setMoneyButtonState(state) {
	game.generators.money.pressed = state;
}
