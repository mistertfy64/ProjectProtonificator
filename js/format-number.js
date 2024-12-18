const SUFFIXES = ["", "k", "M", "B", "T", "q", "Q", "s", "S", "O", "N"]; // and so on...

/** This is when to stop using suffixes and start using scientific notation instead. */
const LIMIT = new Decimal("1e33");
/** Here for brevity. */

/**
 * Formats the number into something more human-readable.
 * @param x The number to format (should be of `Decimal` instance)
 * TODO: Fix for -1<x<0.
 */
function formatNumber(x) {
	let negative = false;
	// handle edge cases
	if (x.lt(ZERO)) {
		x = x.mul(new Decimal("-1"));
		negative = true;
	}
	const logarithm = x.log10().floor();
	if (logarithm.lt(new Decimal("0"))) {
		return x.toPrecision(3);
	}
	if (x.eq(ZERO)) {
		return ZERO.toPrecision(3);
	}
	if (x.gte(LIMIT)) {
		// TODO: Make this better.
		return x.toPrecision(4);
	}

	const powerToDivideBy = new Decimal(10).pow(
		logarithm.div(3).floor().mul(3)
	);
	const index = logarithm.div(3).floor();
	const digits = x.div(powerToDivideBy).toFixed(3);
	return `${negative ? "-" : ""}${digits}${SUFFIXES[index]}`;
}
