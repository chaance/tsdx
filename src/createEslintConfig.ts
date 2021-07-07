import fs from "fs-extra";
import path from "path";
import { CLIEngine } from "eslint";
import { PackageJson } from "./types";
import { getReactVersion } from "./utils";

interface CreateEslintConfigArgs {
	pkg: PackageJson;
	rootDir: string;
	writeFile: boolean;
}
export async function createEslintConfig({
	pkg,
	rootDir,
	writeFile,
}: CreateEslintConfigArgs): Promise<CLIEngine.Options["baseConfig"] | void> {
	const isReactLibrary = Boolean(getReactVersion(pkg));

	const config = {
		extends: [
			"@chancedigital/eslint-config/typescript",
			isReactLibrary && "@chancedigital/eslint-config/react",
		].filter(Boolean),
	};

	if (!writeFile) {
		return config;
	}

	const file = path.join(rootDir, ".eslintrc.js");
	try {
		await fs.writeFile(
			file,
			`module.exports = ${JSON.stringify(config, null, 2)}`,
			{ flag: "wx" }
		);
	} catch (e) {
		if (e.code === "EEXIST") {
			console.error(
				"Error trying to save the Eslint configuration file:",
				`${file} already exists.`
			);
		} else {
			console.error(e);
		}

		return config;
	}
}
