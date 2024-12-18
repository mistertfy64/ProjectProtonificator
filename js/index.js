const UPGRADE_LOCATIONS = {
	"speed": "#upgrades",
	"particles": "#upgrades",
	"overload": "#upgrades--overloaded",
};

function formatCurrency(name) {
	if (name === "money") {
		return "money";
	}
	if (name === "overloadedGeneratorScraps") {
		return "overloaded generator scraps";
	}
}

const game = getNewGameData();

function initialize() {
	// TODO: add saving/loading
	initializeEvents();
	changeScreenTo("generators");
	initializeUpgradeButtons();
}

/**
 * Initializes the events for the HTML elements.
 */
function initializeEvents() {
	$("#generator--particles").on("mousedown", () => {
		setParticleButtonState(true);
	});
	$("#generator--particles").on("mouseup", () => {
		setParticleButtonState(false);
	});
	$("#generator--particles").on("touchstart", () => {
		setParticleButtonState(true);
	});
	$("#generator--particles").on("touchend", () => {
		setParticleButtonState(false);
	});
	// ...
	$("#generator--money").on("mousedown", () => {
		setMoneyButtonState(true);
	});
	$("#generator--money").on("mouseup", () => {
		setMoneyButtonState(false);
	});
	$("#generator--money").on("touchstart", () => {
		setMoneyButtonState(true);
	});
	$("#generator--money").on("touchend", () => {
		setMoneyButtonState(false);
	});
}

/**
 * Initializes the buttons for the upgrades.
 */
function initializeUpgradeButtons() {
	/** Checks if the upgrade actually exist in game. */
	const upgrades = game.upgrades;
	for (const upgradeCategory of Object.keys(upgrades)) {
		for (const upgradeName in game.upgrades[upgradeCategory]) {
			const upgradeData = getUpgradeData(
				`${upgradeCategory}.${upgradeName}`,
				_.get(game.upgrades, `${upgradeCategory}.${upgradeName}`)
			);

			if (upgradeData == null) {
				continue;
			}

			let buttonHTML = "";
			buttonHTML += `Upgrade ${upgradeName}`;
			buttonHTML += `<br>`;
			buttonHTML += upgradeData.description;
			buttonHTML += `<br>`;
			buttonHTML += `Level <span id="upgrade--${upgradeCategory}.${upgradeName}__level">${game.upgrades[upgradeCategory][upgradeName].level}`;
			buttonHTML += `/`;
			buttonHTML += `${upgradeData.maximumLevel.toString()}</span>`;
			buttonHTML += `<br>`;
			buttonHTML += `Currently: x<span id="upgrade--${upgradeCategory}.${upgradeName}__effect">${formatNumber(
				upgradeData.effect
			)}</span>`;
			buttonHTML += `<br>`;
			buttonHTML += `Cost: <span id="upgrade--${upgradeCategory}.${upgradeName}__cost">${formatNumber(
				upgradeData.costs[0].amount
			)}`;
			buttonHTML += ` `;
			buttonHTML += `${formatCurrency(
				upgradeData.costs[0].currency
			)}</span>`;

			/** Creates the button and places it. */
			const button = $("<button></button>", {
				id: `upgrade--${upgradeCategory}.${upgradeName}`,
				html: buttonHTML,
				onclick: `buyUpgrade("${upgradeCategory}.${upgradeName}")`,
			});

			$(UPGRADE_LOCATIONS[upgradeCategory]).append(button);
			$(UPGRADE_LOCATIONS[upgradeCategory]).append(`<br>`);
		}
	}
}

initialize();
