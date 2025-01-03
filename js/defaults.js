const ZERO = new Decimal("0");

function getNewGameData() {
	const gameData = {
		currencies: {
			electricity: new Decimal(1000),
			money: new Decimal(0),
			particles: new Decimal(0),
			overloadedGeneratorScraps: new Decimal(0),
		},
		generators: {
			particle: {
				pressed: false,
			},
			money: {
				pressed: false,
			},
		},
		milestones: {
			overloaded: false,
		},
		upgrades: {
			speed: {
				s1: {
					level: new Decimal(0),
				},
			},
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
				po: {
					level: new Decimal(0),
				},
				p5: {
					level: new Decimal(0),
				},
			},
			overload: {
				o1: {
					level: new Decimal(0),
				},
				o2: {
					level: new Decimal(0),
				},
				o3: {
					level: new Decimal(0),
				},
			},
		},
	};
	return gameData;
}
