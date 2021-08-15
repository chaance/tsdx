import chalk from "chalk";
import getInstallCmd from "./getInstallCmd";
import * as Output from "./output";

export function help() {
	return `
    Only ${chalk.green("<project-directory>")} is required.
    If you have any problems, do not hesitate to file an issue:
    ${chalk.cyan("https://github.com/chaance/tsdx/issues/new")}
  `;
}

export function installing(packages: string[]) {
	const pkgText = packages
		.map(function (pkg) {
			return `    ${chalk.cyan(chalk.bold(pkg))}`;
		})
		.join("\n");

	return `Installing npm modules:
${pkgText}
`;
}

export function installError(packages: string[]) {
	const pkgText = packages
		.map(function (pkg) {
			return `${chalk.cyan(chalk.bold(pkg))}`;
		})
		.join(", ");

	Output.error(`Failed to install ${pkgText}, try again.`);
}

export function copying(projectName: string) {
	return `
Creating ${chalk.bold(chalk.green(projectName))}...
`;
}

export async function start(projectName: string) {
	const cmd = await getInstallCmd();

	const commands = {
		install: cmd === "npm" ? "npm install" : "yarn install",
		build: cmd === "npm" ? "npm run build" : "yarn build",
		start: cmd === "npm" ? "npm run start" : "yarn start",
		test: cmd === "npm" ? "npm run test" : "yarn test",
	};

	return `
  ${chalk.green("Awesome!")} You're now ready to start coding.

  I already ran ${Output.cmd(commands.install)} for you, so your next steps are:
    ${Output.cmd(`cd ${projectName}`)}

  To start developing (rebuilds on changes):
    ${Output.cmd(commands.start)}

  To build for production:
    ${Output.cmd(commands.build)}

  To test your library with Jest:
    ${Output.cmd(commands.test)}

  Questions? Feedback? Please let me know!
  ${chalk.green("https://github.com/chaance/tsdx/issues")}
`;
}

export function incorrectNodeVersion(requiredVersion: string) {
	return `Unsupported Node version! Your current Node version (${chalk.red(
		process.version
	)}) does not satisfy the requirement of Node ${chalk.cyan(requiredVersion)}.`;
}
