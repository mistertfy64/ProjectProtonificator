const BUTTON_DELAY = 3000;
// TODO: Move this variable somewhere more organized.
let buttonPressed = false;

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
		buttonPressed = true;
		$("#beam").animate({ opacity: 1 }, BUTTON_DELAY);
		$("#dark-overlay").animate({ opacity: 0 }, BUTTON_DELAY);

		setTimeout(() => setParticleButtonState(true), BUTTON_DELAY);
	});
	$("#generator--particles").on("mouseup", () => {
		buttonPressed = false;
		setParticleButtonState(false);
	});
	$("#generator--particles").on("touchstart", () => {
		buttonPressed = true;
		$("#beam").animate({ opacity: 1 }, BUTTON_DELAY);
		$("#dark-overlay").animate({ opacity: 0 }, BUTTON_DELAY);

		setTimeout(() => setParticleButtonState(true), BUTTON_DELAY);
	});
	$("#generator--particles").on("touchend", () => {
		buttonPressed = false;
		setParticleButtonState(false);
	});
	// ...
	$("#generator--money").on("click", () => {
		sellParticles();
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

			const level = game.upgrades[upgradeCategory][upgradeName].level;

			let buttonHTML = "";
			buttonHTML += `Upgrade ${upgradeName}`;
			buttonHTML += `<br>`;
			buttonHTML += upgradeData.description;
			buttonHTML += `<br>`;
			buttonHTML += `Level <span id="upgrade--${upgradeCategory}.${upgradeName}__level">${level}`;
			buttonHTML += `/`;
			buttonHTML += `${upgradeData.maximumLevel.toString()}</span>`;
			buttonHTML += `<br>`;

			if (upgradeData.modifiers?.display?.indexOf("boolean") > -1) {
				buttonHTML += `Currently: <span id="upgrade--${upgradeCategory}.${upgradeName}__effect">${
					level.gte(new Decimal("1")) ? "Unlocked" : "Not unlocked"
				}</span>`;
			} else {
				buttonHTML += `Currently: x<span id="upgrade--${upgradeCategory}.${upgradeName}__effect">${formatNumber(
					upgradeData.effect
				)}</span>`;
			}

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
				class: `button--upgrade`,
			});

			$(UPGRADE_LOCATIONS[upgradeCategory]).append(button);
			$(UPGRADE_LOCATIONS[upgradeCategory]).append(`<br>`);
		}
	}
}

initialize();
