module.exports = {
	target: "serverless",
	pageExtensions: ["js", "jsx", "tsx", "mdx"],
	webpack(config, options) {
		config.module.rules.push({
			test: /\.mdx$/,
			use: [
				options.defaultLoaders.babel,
				{
					loader: require.resolve("@mdx-js/loader"),
					options: {
						remarkPlugins: [
							// require("remark-images"),
							require("remark-gfm"),
							require("@ngsctt/remark-smartypants"),
						],
						rehypePlugins: [],
					},
				},
			],
		});
		return config;
	},
};
