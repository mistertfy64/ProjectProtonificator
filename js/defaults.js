const ZERO = new Decimal("0");

function getNewGameData() {
	const gameData = {
		currencies: {
			electricity: new Decimal(1000),
			money: new Decimal(100),
			particles: new Decimal(0),
		},
		generators: {
			particle: {
				pressed: false,
			},
			money: {
				pressed: false,
			},
		},
		upgrades: {
			particles: {
				p1: {
					level: new Decimal(0),
				},
				p2: {
					level: new Decimal(0),
				},
				p3: {
					level: new Decimal(0),
				},
				p4: {
					level: new Decimal(0),
				},
				p5: {
					level: new Decimal(0),
				},
				p6: {
					level: new Decimal(0),
				},
			},
		},
	};
	return gameData;
}
