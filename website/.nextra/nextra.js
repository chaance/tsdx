const path = require("path");

module.exports =
	(
		pluginOptions = {
			extension: /\.mdx?$/,
		}
	) =>
	(
		nextConfig = {
			pageExtensions: ["js", "jsx", "md", "mdx"],
		}
	) => {
		const extension = pluginOptions.extension || /\.mdx$/;
		const remarkPlugins = [
			...(pluginOptions.remarkPlugins || []),
			require("remark-gfm"),
			// require("remark-images"),
			require("@ngsctt/remark-smartypants"),
		];

		return Object.assign({}, nextConfig, {
			webpack(config, options) {
				config.module.rules.push({
					test: extension,
					use: [
						options.defaultLoaders.babel,
						{
							loader: "@mdx-js/loader",
							options: {
								...pluginOptions.options,
								remarkPlugins,
							},
						},
						{
							loader: path.resolve(".nextra", "nextra-loader.js"),
						},
					],
				});

				if (typeof nextConfig.webpack === "function") {
					return nextConfig.webpack(config, options);
				}

				return config;
			},
		});
	};
