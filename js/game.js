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
	if (game.generators.particle.pressed) {
		game.currencies.particles = game.currencies.particles.add(
			tickspeed.mul(new Decimal("1")).mul(deltaTimeMultiplier)
		);
		game.currencies.electricity = game.currencies.electricity.sub(
			tickspeed.mul(new Decimal("1")).mul(deltaTimeMultiplier)
		);
	} else {
		game.currencies.electricity = game.currencies.electricity.add(
			tickspeed.mul(new Decimal("1")).mul(deltaTimeMultiplier)
		);
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
