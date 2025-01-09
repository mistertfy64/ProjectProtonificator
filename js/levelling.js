function addExperiencePoints() {
	const experiencePointsBaseGain = new Decimal("1");
	game.currencies.experiencePoints = game.currencies.experiencePoints.add(
		experiencePointsBaseGain
	);
}
