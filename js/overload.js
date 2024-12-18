function performOverload() {
	const gain = game.currencies.money.div(1e7).pow(0.5);
	if (gain.lt(new Decimal("1"))) {
		// Unable to do overload
		return;
	}
	const choice = confirm("Are you sure you want to perform an overload?");
	if (!choice) {
		// Player chose not to overload;
		return;
	}
	// add data
	game.currencies.overloadedGeneratorScraps =
		game.currencies.overloadedGeneratorScraps.add(gain);
	game.milestones.overloaded = true;
	// reset data...
	game.currencies.electricity = new Decimal(1000);
	game.currencies.money = new Decimal(0);
	game.currencies.particles = new Decimal(0);
	game.upgrades.speed.s1.level = new Decimal(0);
	game.upgrades.particles.p1.level = new Decimal(0);
	game.upgrades.particles.p2.level = new Decimal(0);
	game.upgrades.particles.p3.level = new Decimal(0);
	game.upgrades.particles.p4.level = new Decimal(0);
	game.upgrades.particles.p5.level = new Decimal(0);
}
