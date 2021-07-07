import fs from "fs-extra";
import path from "path";
import camelCase from "lodash/camelCase";
import type { PackageJson, OneOrMany } from "./types";

// Remove the package name scope if it exists
export function removeScope(name: string) {
	return name.replace(/^@.*\//, "");
}

// UMD-safe package name
export function safeVariableName(name: string) {
	return camelCase(
		removeScope(name)
			.toLowerCase()
			.replace(/((^[^a-zA-Z]+)|[^\w.-])|([^a-zA-Z0-9]+$)/g, "")
	);
}

export function safePackageName(name: string) {
	return name
		.toLowerCase()
		.replace(/(^@.*\/)|((^[^a-zA-Z]+)|[^\w.-])|([^a-zA-Z0-9]+$)/g, "");
}

export function external(id: string) {
	return !id.startsWith(".") && !path.isAbsolute(id);
}

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
export const appDirectory = fs.realpathSync(process.cwd());
export const resolveApp = function resolveApp(relativePath: string): string {
	return path.resolve(appDirectory, relativePath);
};

// Taken from Create React App, react-dev-utils/clearConsole
// @see https://github.com/facebook/create-react-app/blob/master/packages/react-dev-utils/clearConsole.js
export function clearConsole() {
	process.stdout.write(
		process.platform === "win32" ? "\x1B[2J\x1B[0f" : "\x1B[2J\x1B[3J\x1B[H"
	);
}

export function getReactVersion({
	dependencies,
	devDependencies,
}: PackageJson) {
	return (
		(dependencies && dependencies.react) ||
		(devDependencies && devDependencies.react)
	);
}

export function getNodeEngineRequirement({ engines }: PackageJson) {
	return engines && engines.node;
}

/**
 * Concats an array of arrays into a single flat array.
 *
 * @param array
 * @return
 */
export function concatAllArray<T>(array: OneOrMany<T>[]): T[] {
	let push = Array.prototype.push;
	let ret: T[] = [];
	for (let ii = 0; ii < array.length; ii++) {
		let value = array[ii];
		if (Array.isArray(value)) {
			push.apply(ret, value);
		} else if (value != null) {
			throw new TypeError(
				"concatAllArray: All items in the array must be an array or null, " +
					'got "' +
					value +
					'" at index "' +
					ii +
					'" instead'
			);
		}
	}
	return ret;
}
