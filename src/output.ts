import chalk from "chalk";

// This was copied from Razzle. Some unused stuff.
export function info(msg: string) {
	console.log(`${chalk.gray(">")} ${msg}`);
}

export function error(msg: string | Error) {
	if (msg instanceof Error) {
		msg = msg.message;
	}
	console.error(`${chalk.red("> Error!")} ${msg}`);
}

export function success(msg: string) {
	console.log(`${chalk.green("> Success!")} ${msg}`);
}

export function cmd(cmd: string) {
	return chalk.bold(chalk.cyan(cmd));
}

export function code(cmd: string) {
	return `${chalk.gray("`")}${chalk.bold(cmd)}${chalk.gray("`")}`;
}

export function param(param: string) {
	return chalk.bold(`${chalk.gray("{")}${chalk.bold(param)}${chalk.gray("}")}`);
}
