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
	$("#currency--electricity").text(game.currencies.electricity.toString());
	$("#currency--money").text(game.currencies.money.toString());
	$("#currency--particles").text(game.currencies.particles.toString());
}

function setParticleButtonState(state) {
	game.generators.particle.pressed = state;
}
