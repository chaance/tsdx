import type { PackageJson } from "type-fest";

interface Template {
	dependencies: string[];
	name: string;
	packageJson: PackageJson;
}
