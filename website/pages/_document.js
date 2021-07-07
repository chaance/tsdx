import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { SkipNavLink } from "@reach/skip-nav";

class MyDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head>
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
					<link
						href="https://fonts.googleapis.com/css2?family=Inter&display=swap"
						rel="stylesheet"
					/>
				</Head>
				<SkipNavLink />
				<body>
					<Main />
					<NextScript />
					<script
						src="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js"
						async
						defer
					/>
				</body>
			</Html>
		);
	}
}

export default MyDocument;
