function getNewGameData() {
	const gameData = {
		currencies: {
			electricity: new Decimal(1000),
			money: new Decimal(0),
			particles: new Decimal(0),
		},
		generators: {
			particle: {
				pressed: false,
				remaining: new Decimal(100),
			},
		},
	};
	return gameData;
}
