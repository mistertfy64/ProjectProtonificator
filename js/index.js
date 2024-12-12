const game = getNewGameData();

function initialize() {
	// TODO: add saving/loading
	initializeEvents();
	$("#generators").show(0);
	$("#upgrades").hide(0);
	$("#settings").hide(0);
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
 * TODO: Handle different types of upgrades (when they get added).
 */
function initializeUpgradeButtons() {
	/** Checks if the upgrade actually exist in game. */
	const upgrades = game.upgrades.particles;
	for (const upgradeName in upgrades) {
		const upgradeData = getUpgradeData(
			`particles.${upgradeName}`,
			_.get(game.upgrades, `particles.${upgradeName}`)
		);
		if (upgradeData == null) {
			continue;
		}

		let buttonHTML = "";
		buttonHTML += `Upgrade ${upgradeName}`;
		buttonHTML += `<br>`;
		buttonHTML += upgradeData.description;
		buttonHTML += `<br>`;
		buttonHTML += `Level <span id="upgrade--particles.${upgradeName}__level">${game.upgrades.particles[upgradeName].level}`;
		buttonHTML += `/`;
		buttonHTML += `${upgradeData.maximumLevel.toString()}</span>`;
		buttonHTML += `<br>`;
		buttonHTML += `Currently x<span id="upgrade--particles.${upgradeName}__effect">${formatNumber(
			upgradeData.effect
		)}</span>`;
		buttonHTML += `<br>`;
		buttonHTML += `Cost: <span id="upgrade--particles.${upgradeName}__cost">${formatNumber(
			upgradeData.costs[0].amount
		)}`;
		buttonHTML += ` `;
		buttonHTML += `${upgradeData.costs[0].currency}</span>`;

		/** Creates the button and places it. */
		const button = $("<button></button>", {
			id: `upgrade--particles.${upgradeName}`,
			html: buttonHTML,
			onclick: `buyUpgrade("particles.${upgradeName}")`,
		});

		$("#upgrades").append(button);
		$("#upgrades").append(button);
	}
}

initialize();
