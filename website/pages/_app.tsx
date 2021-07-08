import React from "react";
import type { AppProps } from "next/app";
import Layout from "components/layout";
import "focus-visible";
import "../styles.css";

function App({ Component, pageProps }: AppProps) {
	return (
		<Layout filename={pageProps.filename} full={pageProps.full}>
			<Component {...pageProps} />
		</Layout>
	);
}

export default App;
