import * as React from "react";

function Link(props: any) {
	// eslint-disable-next-line jsx-a11y/anchor-has-content
	return <a {...props} className="text-blue-800 focus-visible:ring-blue-500" />
}

function ForkNotice() {
	return (
		<section
			className="p-4 border-l-4 border-blue-500 bg-blue-200 rounded-lg mb-4 mt-4"
			aria-label="Fork Notice"
		>
			<p className="mt-0">
				<strong>Note:</strong> This documentation covers the TSDX fork
				maintained by{" "}
				<Link href="https://github.com/chaance/tsdx">Chance Strickland</Link>. It is
				based on the original package by{" "}
				<Link href="https://github.com/formium/tsdx">Jared Palmer</Link>.
			</p>
			<p>
				The documentation for the original project can be found{" "}
				<Link
					href="https://tsdx.io/"
					aria-label="Documentation for the original project by Jared Palmer"
				>
					here
				</Link>
				. As this project evolves I may decide to change the name and update the
				website to avoid confusion.
			</p>
		</section>
	);
}

export { ForkNotice };
export default ForkNotice;
