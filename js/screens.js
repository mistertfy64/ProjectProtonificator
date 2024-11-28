function changeScreenTo(newScreen) {
	$("#generators").hide(0);
	$("#upgrades").hide(0);
	$("#settings").hide(0);
	$(`#${newScreen}`).show(0);
}
