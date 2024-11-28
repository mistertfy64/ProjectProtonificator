function buyUpgrade(key) {
	if (!checkUpgradeEligibility(key)) {
		return false;
	}
	/** Reaching this part means upgrade purchased. */
	/** Change variables */
	const playerUpgradeData = _.get(game.upgrades, key);
	_.set(
		game.upgrades,
		`${key}.level`,
		playerUpgradeData.level.add(new Decimal("1"))
	);
	const upgradeData = getUpgradeData(key, _.get(game.upgrades, key));
	/** Change HTML */
	const jQueryKey = key.replace(".", "\\.");
	// cost
	$(`#upgrade--${jQueryKey}__level`).text(playerUpgradeData.level.toString());
	$(`#upgrade--${jQueryKey}__cost`).text(
		`${formatNumber(upgradeData.costs[0].amount)}` +
			" " +
			`${upgradeData.costs[0].currency}`
	);
	$(`#upgrade--${jQueryKey}__effect`).text(
		`${formatNumber(upgradeData.effect)}`
	);
	return true;
}

function getUpgradeData(key, data) {
	const UPGRADES = {
		particles: {
			p1: {
				maximumLevel: new Decimal("1000"),
				costs: [
					{
						amount: new Decimal("10").mul(
							new Decimal("2").pow(data.level)
						),
						currency: "money",
					},
				],
				effect: new Decimal("2").pow(data.level),
			},
			p2: {
				maximumLevel: new Decimal("1"),
				costs: [{ amount: new Decimal("10000"), currency: "money" }],
				effect: new Decimal("300").pow(data.level),
			},
		},
	};

	return _.get(UPGRADES, key);
}

function checkUpgradeEligibility(key) {
	const playerUpgradeData = _.get(game.upgrades, key);
	const upgradeData = getUpgradeData(key, playerUpgradeData);
	/** This part checks whether player already maxed out upgrade. */
	if (playerUpgradeData.level.gte(upgradeData.maximumLevel)) {
		return false;
	}
	/** This part checks whether player has enough currencies to buy the upgrade. */
	if (!checkCurrencyForUpgrade(key)) {
		return false;
	}
	/** If both are ok, deduct the currencies and return true. */
	const costs = upgradeData.costs;
	for (const condition of costs) {
		game.currencies[condition.currency] = game.currencies[
			condition.currency
		].sub(condition.amount);
	}
	return true;
}

function checkCurrencyForUpgrade(key) {
	const playerUpgradeData = _.get(game.upgrades, key);
	const upgradeData = getUpgradeData(key, playerUpgradeData);
	const costs = upgradeData.costs;
	for (const condition of costs) {
		if (game.currencies[condition.currency].lt(condition.amount)) {
			return false;
		}
	}
	return true;
}
