import userConfig from "../nextra.config";

const defaultConfig = {
	nextLinks: true,
	prevLinks: true,
	search: true,
};

const config = () => {
	return { ...defaultConfig, ...userConfig };
};

export default config;
