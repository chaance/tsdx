import basicTemplate from "./basic";
import type { Template } from "./template";
import type { PackageJson } from "type-fest";

const reactTemplate: Template = {
	name: "react",
	dependencies: [
		...basicTemplate.dependencies,
		"@types/react",
		"@types/react-dom",
		"react",
		"react-dom",
	],
	packageJson: {
		...basicTemplate.packageJson,
		peerDependencies: {
			react: ">=17",
		},
		scripts: {
			...basicTemplate.packageJson.scripts,
			test: "tsdx test --passWithNoTests",
		} as PackageJson["scripts"],
	},
};

export default reactTemplate;
