function exportSaveData() {
	const data = btoa(JSON.stringify(game));
	const message =
		"This is your save data. Make sure to save this text in somewhere safe!";
	prompt(message, data);
}

function importSaveData() {
	const importedData = JSON.parse(atob(prompt("Enter your save data here.")));
	const importedDataKeys = keyify(importedData);
	const initialData = getNewGameData();
	const initialDataKeys = new Set(keyify(initialData));
	for (const key of importedDataKeys) {
		if (_.get(initialData, key) instanceof Decimal) {
			_.set(game, key, new Decimal(_.get(importedData, key)));
			continue;
		}
		if (!initialDataKeys.has(key)) {
			continue;
		}
		_.set(game, key, _.get(importedData, key));
	}
}

// Taken from https://stackoverflow.com/a/47063174/
const keyify = (obj, prefix = "") =>
	Object.keys(obj).reduce((res, el) => {
		if (Array.isArray(obj[el])) {
			return res;
		} else if (typeof obj[el] === "object" && obj[el] !== null) {
			return [...res, ...keyify(obj[el], prefix + el + ".")];
		}
		return [...res, prefix + el];
	}, []);
