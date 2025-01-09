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

function getParticleGeneration(tickspeed, deltaTimeMultiplier) {
	return new Decimal("1")
		.mul(tickspeed)
		.mul(deltaTimeMultiplier)
		.mul(getUpgradeData("particles.p1").effect)
		.mul(getUpgradeData("particles.p4").effect)
		.mul(getUpgradeData("overload.o1").effect);
}

function getElectricityGeneration(tickspeed, deltaTimeMultiplier) {
	return new Decimal("1")
		.mul(tickspeed)
		.mul(deltaTimeMultiplier)
		.mul(getUpgradeData("particles.p2").effect)
		.mul(getUpgradeData("particles.p3").effect)
		.mul(getUpgradeData("overload.o1").effect);
}

function getTickspeed() {
	return new Decimal(1)
		.mul(getUpgradeData("speed.s1").effect)
		.div(TICK_INTERVAL);
}

function updateVariables(deltaTime) {
	const deltaTimeMultiplier = new Decimal(deltaTime).div(new Decimal(1000));
	const tickspeed = getTickspeed();
	/* Takes care of the particle generator */
	if (game.generators.particle.pressed) {
		if (game.currencies.electricity.gt(ZERO)) {
			game.currencies.particles = game.currencies.particles.add(
				getParticleGeneration(tickspeed, deltaTimeMultiplier)
			);
			game.currencies.electricity = game.currencies.electricity.sub(
				new Decimal("1").mul(tickspeed).mul(deltaTimeMultiplier)
			);
		}
	} else {
		game.currencies.electricity = game.currencies.electricity.add(
			getElectricityGeneration(tickspeed, deltaTimeMultiplier)
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
	$("#currency-overloaded-generator-scraps").text(
		formatNumber(game.currencies.overloadedGeneratorScraps)
	);

	// per second
	$("#currency--electricity--generation").text(
		`+${formatNumber(getElectricityGeneration(getTickspeed(), 1))}/s`
	);

	$("#currency--particles--generation").text(
		`+${formatNumber(
			getParticleGeneration(getTickspeed(), 1)
		)}/s when activated`
	);

	for (const upgradeCategory of Object.keys(game.upgrades)) {
		for (const upgradeName in game.upgrades[upgradeCategory]) {
			updateUpgradeButton(`${upgradeCategory}.${upgradeName}`);
		}
	}
	// upgrade po (overload reset layer)
	if (
		getUpgradeData("particles.po").effect.gt(ZERO) ||
		game.milestones.overloaded
	) {
		$("#switch-to-overload").show(0);
	} else {
		$("#switch-to-overload").hide(0);
	}

	// overload
	$("#gain-on-overload").text(
		formatNumber(game.currencies.money.div(1e7).pow(0.5))
	);
	if (game.milestones.overloaded) {
		$(".overload-related").show(0);
	} else {
		$(".overload-related").hide(0);
	}

	// overload upgrade o2
	if (_.get(game.upgrades, "overload.o2").level.gte(new Decimal("1"))) {
		$("#upgrade--particles\\.p5").show(0);
	} else {
		$("#upgrade--particles\\.p5").hide(0);
	}

	// overload upgrade o3, levelling
	if (
		_.get(game.upgrades, "overload.o3").level.gte(new Decimal("1")) ||
		game.milestones.unlockedLevelling
	) {
		// TODO: move the variable assignment operation somewhere else.
		game.milestones.unlockedLevelling = true;
		$("#switch-to-levelling").show(0);
	} else {
		$("#switch-to-levelling").hide(0);
	}

	// levelling
}

/** Upgrades the upgrade button's stats. */
function updateUpgradeButton(key) {
	// get data
	const playerUpgradeData = _.get(game.upgrades, key);
	const upgradeData = getUpgradeData(key);
	// change html
	const jQueryKey = key.replace(".", "\\.");
	// cost
	$(`#upgrade--${jQueryKey}__level`).text(
		playerUpgradeData.level.toString() +
			"/" +
			upgradeData?.maximumLevel.toString() ?? "inf"
	);
	$(`#upgrade--${jQueryKey}__cost`).text(
		`${formatNumber(upgradeData.costs[0].amount)}` +
			" " +
			`${formatCurrency(upgradeData.costs[0].currency)}`
	);

	if (upgradeData.modifiers?.display?.indexOf("boolean") > -1) {
		$(`#upgrade--${jQueryKey}__effect`).text(
			`${
				playerUpgradeData.level.gte(new Decimal("1"))
					? "Unlocked"
					: "Not unlocked"
			}`
		);
	} else {
		$(`#upgrade--${jQueryKey}__effect`).text(
			`${formatNumber(upgradeData.effect)}`
		);
	}
}

function setParticleButtonState(state) {
	game.generators.particle.pressed = state;
}

function setMoneyButtonState(state) {
	game.generators.money.pressed = state;
}
