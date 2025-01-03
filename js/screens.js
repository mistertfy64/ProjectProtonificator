function changeScreenTo(newScreen) {
	$("#generators").hide(0);
	$("#upgrades").hide(0);
	$("#settings").hide(0);
	$("#overload").hide(0);
	$("#levelling").hide(0);
	$(`#${newScreen}`).show(0);
}
