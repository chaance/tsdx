import { Template } from "./template";

/* TODO: User husky v7
husky: {
      hooks: {
        'pre-commit': 'tsdx lint',
      },
    },
*/

const basicTemplate: Template = {
	name: "basic",
	dependencies: [
		"husky",
		"tsdx",
		"tslib",
		"typescript",
		"size-limit",
		"@size-limit/preset-small-lib",
	],
	packageJson: {
		// name: safeName,
		version: "0.1.0",
		license: "MIT",
		// author: author,
		main: "dist/index.js",
		// module: `dist/${safeName}.esm.js`,
		typings: `dist/index.d.ts`,
		files: ["dist", "src"],
		engines: {
			node: ">=12",
		},
		scripts: {
			start: "tsdx watch",
			build: "tsdx build",
			test: "tsdx test",
			lint: "tsdx lint",
			prepare: "tsdx build",
			size: "size-limit",
			analyze: "size-limit --why",
		},
		peerDependencies: {},
		/*
    'size-limit': [
      {
        path: `dist/${safeName}.cjs.production.min.js`,
        limit: '10 KB',
      },
      {
        path: `dist/${safeName}.esm.js`,
        limit: '10 KB',
      },
    ],
    */
		// @ts-ignore
		prettier: {
			useTabs: true,
			tabWidth: 2,
		},
	},
};

export default basicTemplate;
